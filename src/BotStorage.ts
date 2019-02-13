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
  asymmetricCrypto,
  KeyAgreementBD,
  KeyState,
  Streams as MuteCryptoStreams,
  Symmetric,
} from '@coast-team/mute-crypto'
import { Document } from 'mongoose'
import { merge, ReplaySubject, Subject, Subscription } from 'rxjs'
import { auditTime, filter } from 'rxjs/operators'

import { LogState } from '@coast-team/mute-core/dist/types/src/doc'
import { BN } from '@coast-team/mute-crypto-helper'
import { WebGroup, WebGroupState } from 'netflux'
import { isUndefined } from 'util'
import { log } from './log'
import { MongooseAdapter } from './MongooseAdapter'
import { IKeyPair, PKRequest } from './PKRequest'
import { Message } from './proto'

const SAVE_INTERVAL = 120000

const SYNC_DOC_INTERVAL = 10000

export class BotStorage {
  public static AVATAR = 'https://www.shareicon.net/data/256x256/2016/01/01/228083_bot_256x256.png'
  public static ID = 9137

  private crdtStrategy: Strategy
  private mongooseAdapter: MongooseAdapter
  private wg: WebGroup
  private displayName: string
  private login: string
  private deviceID: string
  // private loginDeviceID: string
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
  private cryptoState: Subject<KeyState>
  private myId$: ReplaySubject<number>
  private synchronize: () => void

  private crypto: Symmetric | KeyAgreementBD | undefined
  private signingKeyPair: any
  private exportedSigningKeyPair: IKeyPair | undefined
  private members: Map<number, { key?: any; buffer: Uint8Array[] }>
  private subs: Subscription[]
  private signatureErrorHandler: (id: number) => void

  private pkRequest: PKRequest

  constructor(
    pseudonym: string,
    login: string,
    deviceID: string,
    wg: WebGroup,
    mongooseAdapter: MongooseAdapter,
    cryptography: string,
    exportedSigningKeyPair: IKeyPair | undefined,
    keyServerURLPrefix: string,
    jwt: string
  ) {
    this.crdtStrategy = Strategy.LOGOOTSPLIT
    this.displayName = pseudonym
    this.login = login
    this.deviceID = deviceID
    // this.loginDeviceID = `${this.login}@${this.deviceID}`
    this.wg = wg
    this.synchronize = () => {}
    this.syncDocContentInterval = undefined
    this.saveChain = Promise.resolve()
    this.mongooseAdapter = mongooseAdapter
    this.message$ = new ReplaySubject()
    this.memberJoin$ = new ReplaySubject()
    this.memberLeave$ = new ReplaySubject()
    this.state$ = new ReplaySubject()
    this.cryptoState = new Subject()
    this.myId$ = new ReplaySubject()
    this.subs = []
    this.members = new Map()
    // this.collabs = new Map()
    this.signatureErrorHandler = () => {}
    this.pkRequest = new PKRequest(keyServerURLPrefix, jwt)
    this.exportedSigningKeyPair = exportedSigningKeyPair
    this.signingKeyPair = this.importSigningKeyPair(this.exportedSigningKeyPair)

    log.info(this.login, this.deviceID)

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
          this.initMuteCore(doc, state, cryptography)
        }
      })
      .catch((err) => log.error(`Failed to initialize document ${wg.key}`, err))
  }

  get signalingKey(): string {
    return this.wg.key
  }

  async checkMySigningKeyPair() {
    if (this.exportedSigningKeyPair === undefined || this.signingKeyPair === undefined) {
      log.error(
        'Signing KeyPair',
        "Check my PK, something went wrong here : exportedSigningKeyPair shouldn't be undefined"
      )
    } else {
      const pk = await this.pkRequest.lookup(this.login, this.deviceID)
      log.info('Signing KeyPair', `Check my PK, ${this.login}:${this.deviceID} : ${pk}`)
      if (pk === '') {
        await this.pkRequest.register(
          this.login,
          this.deviceID,
          this.exportedSigningKeyPair.publicKey
        )
      } else if (pk !== undefined && pk !== this.exportedSigningKeyPair.publicKey) {
        await this.pkRequest.update(
          this.login,
          this.deviceID,
          this.exportedSigningKeyPair.publicKey
        )
      }
    }
  }

  set onSignatureError(handler: (id: number) => void) {
    this.signatureErrorHandler = handler
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

  private initMuteCore(
    mongoDoc: Document,
    docContent: StateTypes,
    cryptography: string
  ): MuteCoreTypes {
    // TODO: MuteCore should consume doc Object

    const muteCore = MuteCoreFactory.createMuteCore({
      strategy: Strategy.LOGOOTSPLIT,
      profile: {
        displayName: this.displayName,
        login: this.login,
        deviceID: this.deviceID,
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
    this.subs[this.subs.length] = muteCore.collabJoin$.subscribe(({ id, login, deviceID }) => {
      this.saveLogins(login)
      if (login !== undefined && deviceID !== undefined && cryptography === 'keyagreement') {
        return this.verifyLoginPK(id, login, deviceID).catch((err: any) => {
          log.info('COLLAB JOINED', 'Failed to retrieve Public Key of ' + login, ', err: ', err)
        })
      }
      return
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
    muteCore.collabJoin$.subscribe(() => this.synchronize())

    return muteCore
  }

  private async initMuteCrypto(cryptography: string) {
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
        const bd = this.crypto as KeyAgreementBD

        if (this.pkRequest.baseUrl && this.pkRequest.jwt) {
          log.info('KEYAGREEMENT', 'keyserver OK !')
          await this.checkMySigningKeyPair()
          bd.signingKey = this.signingKeyPair.privateKey
          this.onSignatureError = (id) => log.error('Signature verification error for ', id)
        }
        bd.onSend = (msg, streamId) => this.send(streamId, msg)
        this.myId$.subscribe((id) => bd.setMyId(id))

        this.memberJoin$.subscribe((id) => bd.addMember(id))
        this.memberLeave$.subscribe((id) => bd.removeMember(id))
        this.state$.subscribe((state) => {
          if (state === WebGroupState.JOINED) {
            bd.setReady()
          }
        })
        this.wg.onMessage = (senderId, bytes) => {
          const { streamId, content } = Message.decode(bytes as Uint8Array)

          if (streamId === MuteCryptoStreams.KEY_AGREEMENT_BD) {
            this.onBDMessage(senderId, content)
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
        this.crypto.onStateChange = (state) => this.cryptoState.next(state)
        this.subs[this.subs.length] = merge(
          this.cryptoState.pipe(filter((state) => state === KeyState.READY)),
          this.state$.pipe(filter((state) => state === WebGroupState.JOINED))
        )
          .pipe(auditTime(1000))
          .subscribe(() => this.restartSyncInterval())
        break
    }
  }

  private async verifyLoginPK(id: number, login: string, deviceID: string) {
    const publicKey = JSON.parse(await this.pkRequest.lookup(login, deviceID))
    const cryptoKey = await asymmetricCrypto.importKey(publicKey)
    const member = this.members.get(id)
    if (member) {
      member.key = cryptoKey
      for (const m of member.buffer) {
        ;(this.crypto as KeyAgreementBD).onMessage(id, m, member.key).catch(() => {
          this.signatureErrorHandler(id)
        })
      }
      member.buffer = []
    } else {
      this.members.set(id, { key: cryptoKey, buffer: [] })
    }
  }

  private onBDMessage(id: number, content: Uint8Array) {
    const content2 = content.slice()
    const bd = this.crypto as KeyAgreementBD
    if (this.pkRequest.baseUrl && this.pkRequest.jwt) {
      const member = this.members.get(id)
      if (member) {
        if (member.key) {
          // Content is copied here to avoid mutation. Somehow a mutation happend just after verifying the signature.
          // protobuf maybe ?
          bd.onMessage(id, content.slice(), member.key)
            .then(() => {
              if (new BN(content2, 16).toString() !== new BN(content, 16).toString()) {
                log.error(
                  "CONTENT IS NOT THE SAME BEFORE AND AFTER VERIFYING THE SIGNATURE. SHOULDN'T HAPPEN."
                )
              }
            })
            .catch(() => {
              this.signatureErrorHandler(id)
            })
        } else {
          member.buffer.push(content)
        }
      } else {
        this.members.set(id, { buffer: [content] })
      }
    } else {
      bd.onMessage(id, content)
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

  private async importSigningKeyPair(keypair: IKeyPair | undefined) {
    if (keypair) {
      this.signingKeyPair = {
        publicKey: await asymmetricCrypto.importKey(JSON.parse(keypair.publicKey)),
        privateKey: await asymmetricCrypto.importKey(JSON.parse(keypair.privateKey)),
      }
    }
  }
}
