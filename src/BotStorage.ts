import { Document } from 'mongoose'
import {
  AbstractMessage,
  BroadcastMessage,
  ICollaborator,
  JoinEvent,
  MetaDataType,
  MuteCore,
  NetworkMessage,
  RichLogootSOperation,
  SendRandomlyMessage,
  SendToMessage,
  State,
} from 'mute-core'
import { FixDataState, TitleState } from 'mute-core'
import { from, merge, ReplaySubject, Subject } from 'rxjs'
import { filter, flatMap } from 'rxjs/operators'

import { LogLevel, setLogLevel, WebGroup, WebGroupState } from 'netflux'
import { log } from './log'
import { MongooseAdapter } from './MongooseAdapter'
import { Message } from './proto'
import { SymmetricCrypto } from './SymmetricCrypto'

const SAVE_INTERVAL = 120000

setLogLevel(LogLevel.DEBUG, LogLevel.TOPOLOGY)

export class BotStorage {
  public static AVATAR = 'https://www.shareicon.net/data/256x256/2016/01/01/228083_bot_256x256.png'
  public static ID = 9137

  public signalingKey: string

  private mongooseAdapter: MongooseAdapter
  private wg: WebGroup
  private muteCore: MuteCore | undefined
  private displayName: string
  private login: string
  private lastReceivedState: State | undefined
  private lastSaveState: State | undefined
  private mongoDoc: Document | undefined
  private operations: RichLogootSOperation[] | undefined
  private saveInterval: NodeJS.Timer
  private saveChain: Promise<void>

  private joinSubject: Subject<JoinEvent>
  private messageSubject: ReplaySubject<NetworkMessage>
  private collabJoinSubject: ReplaySubject<number>
  private collabLeaveSubject: ReplaySubject<number>
  private cryptoReady: Subject<void>
  private cryptoInitialized: boolean

  private crypto: SymmetricCrypto

  constructor(pseudonym: string, login: string, wg: WebGroup, mongooseAdapter: MongooseAdapter) {
    this.displayName = pseudonym
    this.login = login
    this.wg = wg
    this.cryptoInitialized = false
    this.saveChain = Promise.resolve()
    this.signalingKey = wg.key
    this.crypto = new SymmetricCrypto()
    this.mongooseAdapter = mongooseAdapter
    this.joinSubject = new Subject<JoinEvent>()
    this.messageSubject = new ReplaySubject()
    this.collabJoinSubject = new ReplaySubject()
    this.collabLeaveSubject = new ReplaySubject()
    this.cryptoReady = new Subject()

    this.saveInterval = setInterval(() => {
      if (this.mongoDoc) {
        this.saveContent()
      }
    }, SAVE_INTERVAL)

    // Look for the document in the database
    this.mongooseAdapter
      .find(this.signalingKey)
      .then((doc) => (doc ? doc : this.mongooseAdapter.create(this.signalingKey)))
      .then((doc) => {
        this.mongoDoc = doc
        // trasform serialized data into structured object
        this.operations = doc.get('operations').map((op: any) => RichLogootSOperation.fromPlain(op))
        // initialize mute-core with provided key and the document content
        this.muteCore = this.createMuteCore(doc, this.signalingKey, this
          .operations as RichLogootSOperation[])

        this.muteCore.metaDataService.onChange.subscribe(({ type, data }) => {
          switch (type) {
            case MetaDataType.Title:
              const { title, titleModified } = data as TitleState
              this.saveTitle(title, titleModified)
              break
            case MetaDataType.FixData:
              const { docCreated, cryptoKey } = data as FixDataState
              this.saveFixData(docCreated, cryptoKey)
              this.crypto
                .importKey(cryptoKey)
                .then(() => {
                  if (!this.cryptoInitialized) {
                    const muteCore = this.muteCore as MuteCore

                    muteCore.syncMessageService.messageSource = this.messageSubject.pipe(
                      filter(({ service }) => service === 423),
                      flatMap((msg) => {
                        return this.crypto
                          .decrypt(msg.content)
                          .then((content) => Object.assign({}, msg, { content }))
                      })
                    )

                    muteCore.syncMessageService.onMsgToBroadcast
                      .pipe(
                        flatMap((msg) =>
                          this.crypto
                            .encrypt(msg.content)
                            .then((content) => Object.assign({}, msg, { content }))
                        )
                      )
                      .subscribe((bm: BroadcastMessage) => this.wg.send(this.encode(bm)))

                    muteCore.syncMessageService.onMsgToSendRandomly
                      .pipe(
                        flatMap((msg) =>
                          this.crypto
                            .encrypt(msg.content)
                            .then((content) => Object.assign({}, msg, { content }))
                        )
                      )
                      .subscribe((srm: SendRandomlyMessage) => {
                        const members = this.wg.members.filter((id) => id !== this.wg.myId)
                        const index = Math.ceil(Math.random() * members.length) - 1
                        this.wg.sendTo(members[index], this.encode(srm))
                      })

                    muteCore.syncMessageService.onMsgToSendTo
                      .pipe(
                        flatMap((msg) =>
                          this.crypto
                            .encrypt(msg.content)
                            .then((content) => Object.assign({}, msg, { content }))
                        )
                      )
                      .subscribe((stm: SendToMessage) => this.wg.sendTo(stm.id, this.encode(stm)))

                    this.cryptoReady.next()
                    this.cryptoInitialized = true
                  }
                })
                .catch((err) => {
                  log.error('Import Key error: ', err.message)
                })
              break
          }
        })

        // subscribes to remote events
        this.muteCore.collaboratorsService.joinSource = this.collabJoinSubject
        this.muteCore.collaboratorsService.leaveSource = this.collabLeaveSubject
        this.muteCore.collaboratorsService.messageSource = this.messageSubject

        this.muteCore.metaDataService.joinSource = this.collabJoinSubject
        this.muteCore.metaDataService.messageSource = this.messageSubject
      })
      .catch((err) => {
        log.error(`Error when searching for the document ${this.signalingKey}`, err)
      })

    // Configure WebGroup callbacks
    wg.onMessage = (id, bytes) => {
      try {
        const { service, content } = Message.decode(bytes as Uint8Array)
        this.messageSubject.next(new NetworkMessage(service, id, true, content))
      } catch (err) {
        log.error('Failed to decode a message: ', err)
      }
    }
    wg.onStateChange = (state) => {
      if (state === WebGroupState.JOINED) {
        this.joinSubject.next(new JoinEvent(this.wg.myId, this.signalingKey, false))
      } else if (state === WebGroupState.LEFT) {
        this.saveContent()
        global.clearInterval(this.saveInterval)
      }
    }

    wg.onMemberJoin = (id) => this.collabJoinSubject.next(id)
    wg.onMemberLeave = (id) => {
      if (wg.members.length < 2) {
        this.saveContent()
      }
      this.collabLeaveSubject.next(id)
    }
  }

  private saveContent() {
    try {
      if (
        this.mongoDoc &&
        this.lastReceivedState &&
        this.lastReceivedState !== this.lastSaveState
      ) {
        this.mongoDoc.set({ operations: this.lastReceivedState.richLogootSOps })
        this.saveDoc()
        this.lastSaveState = this.lastReceivedState
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

  private async saveDoc() {
    this.saveChain = this.saveChain
      .then(async () => {
        if (this.mongoDoc) {
          await this.mongoDoc.save()
        }
      })
      .catch((err: Error) => log.warn('Could not save the document: ', err))
  }

  private createMuteCore(
    mongoDoc: Document,
    key: string,
    operations: RichLogootSOperation[]
  ): MuteCore {
    // TODO: MuteCore should consume doc Object
    const muteCore = new MuteCore({
      profile: {
        displayName: this.displayName,
        login: this.login,
        avatar: BotStorage.AVATAR,
      },
      metaTitle: {
        title: mongoDoc.get('title'),
        titleModified: mongoDoc.get('titleModified'),
      },
      metaFixData: {
        docCreated: mongoDoc.get('created'),
        cryptoKey: mongoDoc.get('cryptoKey'),
      },
    })

    merge(
      muteCore.collaboratorsService.onMsgToBroadcast,
      muteCore.metaDataService.onMsgToBroadcast
    ).subscribe((bm: BroadcastMessage) => this.wg.send(this.encode(bm)))
    merge(
      muteCore.collaboratorsService.onMsgToSendRandomly,
      muteCore.metaDataService.onMsgToSendRandomly
    ).subscribe((srm: SendRandomlyMessage) => {
      const members = this.wg.members.filter((id) => id !== this.wg.myId)
      const index = Math.ceil(Math.random() * members.length) - 1
      this.wg.sendTo(members[index], this.encode(srm))
    })
    merge(
      muteCore.collaboratorsService.onMsgToSendTo,
      muteCore.metaDataService.onMsgToSendTo
    ).subscribe((stm: SendToMessage) => this.wg.sendTo(stm.id, this.encode(stm)))

    muteCore.collaboratorsService.onUpdate.subscribe((collab: ICollaborator) =>
      this.saveLogins(collab.login)
    )

    muteCore.collaboratorsService.onJoin.subscribe((collab: ICollaborator) => {
      this.saveLogins(collab.login)
    })

    // Sync service config
    muteCore.syncService.onState.subscribe((state: State) => (this.lastReceivedState = state))

    muteCore.init(key as string)
    muteCore.syncService.setJoinAndStateSources(
      this.joinSubject,
      this.cryptoReady,
      from([new State(new Map(), operations)])
    )
    return muteCore
  }

  private encode(msg: AbstractMessage) {
    return Message.encode(Message.create(msg)).finish()
  }
}
