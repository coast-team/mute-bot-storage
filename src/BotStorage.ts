import {
  FixDataState,
  MetaDataType,
  MuteCoreFactory,
  MuteCoreTypes,
  RichOperationStrategy,
  RichOperationTypes,
  StateStrategy,
  StateTypes,
  Strategy,
  Streams as MuteCoreStreams,
  TitleState,
} from '@coast-team/mute-core'
import {
  // enableDebug,
  KeyAgreementBD,
  KeyState,
  Streams as MuteCryptoStreams,
  Symmetric,
} from '@coast-team/mute-crypto'
import { Document } from 'mongoose'
import { merge, ReplaySubject, Subject, Subscription } from 'rxjs'
import { auditTime, filter } from 'rxjs/operators'

import { LogState } from '@coast-team/mute-core/dist/types/src/doc'
import { WebGroup, WebGroupState } from 'netflux'
import { isUndefined } from 'util'
import { log } from './log'
import { MongooseAdapter } from './MongooseAdapter'
import { Message } from './proto'

const SAVE_INTERVAL = 120000

// enableDebug(true)
const SYNC_DOC_INTERVAL = 10000

export class BotStorage {
  public static AVATAR = 'https://www.shareicon.net/data/256x256/2016/01/01/228083_bot_256x256.png'
  public static ID = 9137

  private crdtStrategy: Strategy
  private mongooseAdapter: MongooseAdapter
  private wg: WebGroup
  private displayName: string
  private login: string
  private lastReceivedState: StateTypes | undefined
  private lastSavedState: StateTypes | undefined
  private mongoDoc: Document | undefined
  private saveInterval: NodeJS.Timer
  private saveChain: Promise<void>
  private syncDocContentInterval: NodeJS.Timer | undefined

  private message$: ReplaySubject<{ senderId: number; streamId: number; content: Uint8Array }>
  private memberJoin$: ReplaySubject<number>
  private memberLeave$: ReplaySubject<number>
  private state$: ReplaySubject<WebGroupState>
  private myId$: ReplaySubject<number>
  private synchronize: () => void

  private crypto: Symmetric | KeyAgreementBD | undefined
  private subs: Subscription[]

  constructor(
    pseudonym: string,
    login: string,
    wg: WebGroup,
    mongooseAdapter: MongooseAdapter,
    cryptography: string
  ) {
    this.crdtStrategy = Strategy.LOGOOTSPLIT
    this.displayName = pseudonym
    this.login = login
    this.wg = wg
    this.synchronize = () => {}
    this.syncDocContentInterval = undefined
    this.saveChain = Promise.resolve()
    this.mongooseAdapter = mongooseAdapter
    this.message$ = new ReplaySubject()
    this.memberJoin$ = new ReplaySubject()
    this.memberLeave$ = new ReplaySubject()
    this.state$ = new ReplaySubject()
    this.myId$ = new ReplaySubject()
    this.subs = []

    // Configure document content save interval
    this.saveInterval = setInterval(() => {
      if (this.mongoDoc) {
        this.saveContent()
      }
    }, SAVE_INTERVAL)

    // Initialize WebGroup
    this.initWebGroup()

    // Initialize cryptography
    this.initMuteCrypto(cryptography)

    // Get the document from database or create a new one, then initialize CRDTs
    this.retreiveDocument(wg.key)
      .then((doc) => {
        this.mongoDoc = doc
        const operations = doc
          .get('operations')
          .map((op: RichOperationTypes) => RichOperationStrategy.fromPlain(this.crdtStrategy, op))
        const state = StateStrategy.emptyState(this.crdtStrategy)
        if (state) {
          state.remoteOperations = operations || []
          this.initMuteCore(doc, state)
        }
      })
      .catch((err) => log.error(`Failed to initialize document ${wg.key}`, err))
  }

  get signalingKey(): string {
    return this.wg.key
  }

  private initWebGroup() {
    this.wg.onStateChange = (state) => {
      if (state === WebGroupState.LEFT) {
        this.saveContent()
        global.clearInterval(this.saveInterval)
      }
      this.state$.next(state)
    }
    this.wg.onMemberJoin = (id) => this.memberJoin$.next(id)
    this.wg.onMemberLeave = (id) => {
      if (this.wg.members.length < 2) {
        this.saveContent()
      }
      this.memberLeave$.next(id)
    }
    this.wg.onMyId = (id) => this.myId$.next(id)
  }

  private async retreiveDocument(key: string): Promise<Document> {
    const doc = await this.mongooseAdapter.find(key)
    if (!doc) {
      return await this.mongooseAdapter.create(key)
    }
    return doc
  }

  private initMuteCore(mongoDoc: Document, docContent: StateTypes): MuteCoreTypes {
    // TODO: MuteCore should consume doc Object

    const muteCore = MuteCoreFactory.createMuteCore({
      strategy: Strategy.LOGOOTSPLIT,
      profile: {
        displayName: this.displayName,
        login: this.login,
        avatar: BotStorage.AVATAR,
      },
      docContent,
      metaTitle: {
        title: mongoDoc.get('title'),
        titleModified: mongoDoc.get('titleModified'),
      },
      metaFixData: {
        docCreated: mongoDoc.get('created'),
        cryptoKey: mongoDoc.get('cryptoKey'),
      },
      metaLogs: {
        share: mongoDoc.get('shareLogs'),
        vector: this.mongooseAdapter.getShareVector(mongoDoc),
      },
    })

    // Metadata
    this.subs[this.subs.length] = muteCore.remoteMetadataUpdate$.subscribe(({ type, data }) => {
      switch (type) {
        case MetaDataType.Title:
          const { title, titleModified } = data as TitleState
          this.saveTitle(title, titleModified)
          break
        case MetaDataType.FixData:
          const { docCreated, cryptoKey } = data as FixDataState
          this.saveFixData(docCreated, cryptoKey)
          if (this.crypto instanceof Symmetric) {
            this.crypto.importKey(cryptoKey)
          }
          break
        case MetaDataType.Logs:
          const { share, vector } = data as LogState
          this.saveLogs(share, isUndefined(vector) ? new Map() : vector)
          break
      }
    })

    // Message IN/OUT
    muteCore.messageIn$ = this.message$.asObservable()
    this.subs[this.subs.length] = muteCore.messageOut$.subscribe(
      ({ streamId, content, recipientId }) => {
        if (
          streamId === MuteCoreStreams.DOCUMENT_CONTENT &&
          this.crypto &&
          this.crypto.state === KeyState.READY
        ) {
          this.crypto
            .encrypt(content)
            .then((encryptedContent) => this.send(streamId, encryptedContent, recipientId))
            .catch((err) => log.error('Failed to encrypt a message: ', err))
        } else {
          this.send(streamId, content, recipientId)
        }
      }
    )
    this.subs[this.subs.length] = muteCore.remoteTextOperations$.subscribe(() => {
      this.lastReceivedState = muteCore.state
    })

    // Collaborators
    muteCore.memberJoin$ = this.memberJoin$
    muteCore.memberLeave$ = this.memberLeave$
    this.subs[this.subs.length] = muteCore.collabJoin$.subscribe(({ login }) => {
      this.saveLogins(login)
    })
    this.subs[this.subs.length] = muteCore.remoteCollabUpdate$.subscribe(({ login }) =>
      this.saveLogins(login)
    )

    // Synchronization mechanism
    this.synchronize = () => {
      if (this.wg.members.length > 1) {
        if (this.crypto) {
          if (this.crypto.state === KeyState.READY) {
            muteCore.synchronize()
          }
        } else {
          muteCore.synchronize()
        }
      }
    }
    muteCore.collabJoin$.subscribe(() => muteCore.synchronize())

    return muteCore
  }

  private initMuteCrypto(cryptography: string) {
    log.debug('CRYPTOGRAPHY type = ', cryptography)
    switch (cryptography) {
      case 'none':
        this.crypto = undefined
        this.wg.onMessage = (senderId, bytes) => {
          try {
            this.message$.next({ senderId, ...Message.decode(bytes as Uint8Array) })
          } catch (err) {
            log.error('Failed to decode a message: ', err)
          }
        }
        break
      case 'metadata':
        this.crypto = new Symmetric()
        const symmetric = this.crypto as Symmetric

        this.wg.onMessage = (senderId, bytes) => {
          try {
            const { streamId, content } = Message.decode(bytes as Uint8Array)

            if (streamId === MuteCoreStreams.DOCUMENT_CONTENT) {
              symmetric
                .decrypt(content)
                .then((decryptedContent) => {
                  this.message$.next({ senderId, streamId, content: decryptedContent })
                })
                .catch((err) =>
                  log.warn('Failed to decrypt document content: ', JSON.stringify(err))
                )
            } else {
              this.message$.next({ senderId, streamId, content })
            }
          } catch (err) {
            log.warn('Message from network decode error: ', err.message)
          }
        }
        break
      case 'keyagreement':
        this.crypto = new KeyAgreementBD()
        this.crypto.onSend = (msg, streamId) => this.send(streamId, msg)
        const bd = this.crypto as KeyAgreementBD

        this.memberJoin$.subscribe((id) => bd.addMember(id))
        this.memberLeave$.subscribe((id) => bd.removeMember(id))
        this.state$.subscribe((state) => {
          if (state === WebGroupState.JOINED) {
            bd.setReady()
          }
        })
        this.myId$.subscribe((id) => bd.setMyId(id))
        this.wg.onMessage = (senderId, bytes) => {
          const { streamId, content } = Message.decode(bytes as Uint8Array)

          if (streamId === MuteCryptoStreams.KEY_AGREEMENT_BD) {
            bd.onMessage(senderId, content)
          } else if (streamId === MuteCoreStreams.DOCUMENT_CONTENT) {
            bd.decrypt(content)
              .then((decryptedContent) =>
                this.message$.next({ senderId, streamId, content: decryptedContent })
              )
              .catch((err) => log.warn('Failed to decrypt document content: ', JSON.stringify(err)))
          } else {
            this.message$.next({ senderId, streamId, content })
          }
        }
        const cryptoState = new Subject()
        this.crypto.onStateChange = (state) => cryptoState.next(state)
        this.subs[this.subs.length] = merge(
          cryptoState.pipe(filter((state) => state === KeyState.READY)),
          this.state$.pipe(filter((state) => state === WebGroupState.JOINED))
        )
          .pipe(auditTime(1000))
          .subscribe(() => this.restartSyncInterval())
        break
    }
  }

  private send(streamId: number, content: Uint8Array, id?: number): void {
    const msg = Message.create({ streamId, content })
    if (id === undefined) {
      this.wg.send(Message.encode(msg).finish())
    } else {
      id = id === 0 ? this.randomMember() : id
      this.wg.sendTo(id, Message.encode(msg).finish())
    }
  }

  private randomMember(): number {
    const otherMembers = this.wg.members.filter((i) => i !== this.wg.myId)
    return otherMembers[Math.ceil(Math.random() * otherMembers.length) - 1]
  }

  private saveContent() {
    try {
      if (
        this.mongoDoc &&
        this.lastReceivedState &&
        this.lastReceivedState !== this.lastSavedState
      ) {
        this.mongoDoc.set({
          operations: this.lastReceivedState.remoteOperations.map((ope) => {
            return {
              id: ope.id,
              clock: ope.clock,
              operation: ope.operation,
              dependencies: Array.from(ope.dependencies),
            }
          }),
        })
        this.saveDoc()
        this.lastSavedState = this.lastReceivedState
      }
    } catch (err) {
      log.error('Failed save the document content:', err)
    }
  }

  private saveLogins(login: string | undefined) {
    if (this.mongoDoc && login && login !== 'anonymous') {
      const logins: string[] = this.mongoDoc.get('logins')
      if (!logins.includes(login)) {
        logins.push(login)
        this.mongoDoc.set({ logins })
        this.saveDoc()
      }
    }
  }

  private saveTitle(title: string, titleModified: number) {
    if (this.mongoDoc) {
      this.mongoDoc.set({ title, titleModified })
      this.saveDoc()
    }
  }

  private saveFixData(created: number, cryptoKey: string) {
    if (this.mongoDoc) {
      this.mongoDoc.set({ created, cryptoKey })
      this.saveDoc()
    }
  }

  private saveLogs(shareLogs: boolean, vector: Map<number, number>) {
    if (this.mongoDoc) {
      const shareLogsVector = new Map<string, number>()
      vector.forEach((value, key) => {
        shareLogsVector.set(key.toString(), value)
      })
      this.mongoDoc.set({ shareLogs, shareLogsVector })
      this.saveDoc()
    }
  }

  private async saveDoc() {
    this.saveChain = this.saveChain
      .then(async () => {
        if (this.mongoDoc) {
          await this.mongoDoc.save()
        }
      })
      .catch((err: Error) => log.warn('Could not save the document: ', err))
  }

  private restartSyncInterval() {
    if (this.syncDocContentInterval) {
      clearInterval(this.syncDocContentInterval)
    }
    this.synchronize()
    this.syncDocContentInterval = setInterval(() => this.synchronize(), SYNC_DOC_INTERVAL)
  }
}
