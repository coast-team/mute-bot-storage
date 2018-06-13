import { Document } from 'mongoose'
import {
  AbstractMessage,
  BroadcastMessage,
  ICollaborator,
  JoinEvent,
  MuteCore,
  NetworkMessage,
  RichLogootSOperation,
  SendRandomlyMessage,
  SendToMessage,
  State,
} from 'mute-core'
import { from, merge, ReplaySubject, Subject } from 'rxjs'
import { flatMap } from 'rxjs/operators'

import { LogLevel, setLogLevel, WebGroup, WebGroupState } from 'netflux'
import { SymmetricCrypto } from './Crypto'
import { MongooseAdapter } from './MongooseAdapter'
import { Message } from './proto'

const SAVE_INTERVAL = 120000

setLogLevel(LogLevel.DEBUG, LogLevel.TOPOLOGY)

export class BotStorage {
  public static ID = 9137

  public key: string

  private mongooseAdapter: MongooseAdapter
  private wg: WebGroup
  private muteCore: MuteCore | undefined
  private pseudonym: string
  private login: string
  private savedLogins: string[]
  private lastReceivedState: State | undefined
  private lastSaveState: State | undefined
  private mongoDoc: Document | undefined
  private operations: RichLogootSOperation[] | undefined
  private saveInterval: NodeJS.Timer

  private joinSubject: Subject<JoinEvent>
  private messageSubject: ReplaySubject<NetworkMessage>
  private peerJoinSubject: ReplaySubject<number>
  private peerLeaveSubject: ReplaySubject<number>

  private crypto: SymmetricCrypto

  constructor(pseudonym: string, login: string, wg: WebGroup, mongooseAdapter: MongooseAdapter) {
    this.pseudonym = pseudonym
    this.login = login
    this.savedLogins = []
    this.wg = wg
    this.key = wg.key
    this.crypto = new SymmetricCrypto()
    this.mongooseAdapter = mongooseAdapter
    this.joinSubject = new ReplaySubject<JoinEvent>()
    this.messageSubject = new ReplaySubject()
    this.peerJoinSubject = new ReplaySubject()
    this.peerLeaveSubject = new ReplaySubject()

    this.saveInterval = setInterval(() => {
      if (this.mongoDoc) {
        this.save()
      }
    }, SAVE_INTERVAL)

    // Look for the document in the database
    this.mongooseAdapter
      .find(this.key)
      .then((doc) => (doc ? doc : this.mongooseAdapter.create(this.key)))
      .then((doc) => {
        this.mongoDoc = doc
        // trasform serialized data into structured object
        this.operations = doc.get('operations').map((op: any) => RichLogootSOperation.fromPlain(op))
      })
      .then(() => this.crypto.importKey(this.key))
      .then(() => {
        // initialize mute-core with provided key and the document content
        this.muteCore = this.createMuteCore(this.key, this.operations as RichLogootSOperation[])

        // subscribes to remote events
        this.muteCore.collaboratorsService.joinSource = this.peerJoinSubject
        this.muteCore.collaboratorsService.leaveSource = this.peerLeaveSubject
        this.muteCore.messageSource = this.messageSubject

        this.mergeSavedLogins()
      })
      .catch((err) => {
        log.error(`Error when searching for the document ${this.key}`, err)
      })

    // Configure WebGroup callbacks
    wg.onMessage = (id, bytes) => {
      const msg = Message.decode(bytes as Uint8Array)

      if (msg.service === 423) {
        this.crypto.decrypt(msg.content).then((content) => {
          this.messageSubject.next(new NetworkMessage(msg.service, id, true, content))
        })
      } else {
        this.messageSubject.next(new NetworkMessage(msg.service, id, true, msg.content))
      }
    }
    wg.onStateChange = (state) => {
      if (state === WebGroupState.JOINED) {
        this.joinSubject.next(new JoinEvent(this.wg.myId, this.key, false))
      } else if (state === WebGroupState.LEFT) {
        this.save()
        global.clearInterval(this.saveInterval)
      }
    }

    wg.onMemberJoin = (id) => this.peerJoinSubject.next(id)
    wg.onMemberLeave = (id) => {
      if (wg.members.length < 2) {
        this.save()
      }
      this.peerLeaveSubject.next(id)
    }
  }

  private save() {
    if (this.mongoDoc && this.lastReceivedState && this.lastReceivedState !== this.lastSaveState) {
      log.info('Saving document: ' + this.key)
      this.mongoDoc.set({ operations: this.lastReceivedState.richLogootSOps })
      this.mongoDoc.save().catch((err) => log.error('Could not save the document ' + this.key, err))
      this.lastSaveState = this.lastReceivedState
    }
  }

  private updateLogins(login: string | undefined) {
    if (login && login !== 'anonymous') {
      if (this.mongoDoc) {
        log.info('Update logins with: ' + login)
        const logins = this.mongoDoc.get('logins')
        logins.push(login)
        this.mongoDoc.set({ logins })
        this.mongoDoc.save()
      } else {
        this.savedLogins.push(login)
      }
    }
  }

  private mergeSavedLogins() {
    if (this.mongoDoc && this.savedLogins.length !== 0) {
      this.mongoDoc.set({
        logins: this.mongoDoc.get('logins').concat(this.savedLogins),
      })
      this.mongoDoc.save()
      this.savedLogins = []
    }
  }

  private createMuteCore(key: string, operations: RichLogootSOperation[]): MuteCore {
    // TODO: MuteCore should consume doc Object
    const muteCore = new MuteCore({
      displayName: this.pseudonym,
      login: this.login,
      avatar: 'https://www.shareicon.net/data/256x256/2016/01/01/228083_bot_256x256.png',
    })
    merge(
      muteCore.collaboratorsService.onMsgToBroadcast,
      muteCore.syncMessageService.onMsgToBroadcast.pipe(
        flatMap((msg) =>
          this.crypto.encrypt(msg.content).then((content) => Object.assign({}, msg, { content }))
        )
      )
    ).subscribe((bm: BroadcastMessage) => this.wg.send(this.encode(bm)))
    merge(
      muteCore.collaboratorsService.onMsgToSendRandomly,
      muteCore.syncMessageService.onMsgToSendRandomly.pipe(
        flatMap((msg) =>
          this.crypto.encrypt(msg.content).then((content) => Object.assign({}, msg, { content }))
        )
      )
    ).subscribe((srm: SendRandomlyMessage) => {
      const members = this.wg.members.filter((id) => id !== this.wg.myId)
      const index = Math.ceil(Math.random() * members.length) - 1
      this.wg.sendTo(members[index], this.encode(srm))
    })
    merge(
      muteCore.collaboratorsService.onMsgToSendTo,
      muteCore.syncMessageService.onMsgToSendTo.pipe(
        flatMap((msg) =>
          this.crypto.encrypt(msg.content).then((content) => Object.assign({}, msg, { content }))
        )
      )
    ).subscribe((stm: SendToMessage) => this.wg.sendTo(stm.id, this.encode(stm)))

    muteCore.collaboratorsService.onUpdate.subscribe((collab: ICollaborator) => {
      this.updateLogins(collab.login)
    })

    muteCore.collaboratorsService.onJoin.subscribe((collab: ICollaborator) => {
      this.updateLogins(collab.login)
    })

    // Sync service config
    muteCore.syncService.onState.subscribe((state: State) => (this.lastReceivedState = state))

    muteCore.init(key as string)
    muteCore.syncService.setJoinAndStateSources(
      this.joinSubject.asObservable(),
      from([new State(new Map(), operations)])
    )
    return muteCore
  }

  private encode(msg: AbstractMessage) {
    return Message.encode(Message.create(msg)).finish()
  }
}
