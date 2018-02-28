import { Document } from 'mongoose'
import {
  AbstractMessage,
  BroadcastMessage,
  JoinEvent,
  MuteCore,
  NetworkMessage,
  RichLogootSOperation,
  SendRandomlyMessage,
  SendToMessage,
  State } from 'mute-core'
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs'

import { WebGroup } from 'netflux'
import { MongooseAdapter } from './MongooseAdapter'
import { BotProtocol, IMessage, Message } from './proto'

const SAVE_INTERVAL = 60000

export class BotStorage {

  private mongooseAdapter: MongooseAdapter
  private wg: WebGroup
  private muteCore: MuteCore
  private pseudonym: string
  private lastReceivedState: State
  private lastSaveState: State
  private key: string
  private mongoDoc: Document
  private operations: RichLogootSOperation[]
  private saveInterval: NodeJS.Timer

  private joinSubject: Subject<JoinEvent>
  private messageSubject: ReplaySubject<NetworkMessage>
  private peerJoinSubject: ReplaySubject<number>
  private peerLeaveSubject: ReplaySubject<number>
  private stateSubject: Subject<State>

  constructor (pseudonym: string, wg: WebGroup, mongooseAdapter: MongooseAdapter) {
    this.pseudonym = pseudonym
    this.wg = wg
    this.mongooseAdapter = mongooseAdapter
    this.joinSubject = new Subject<JoinEvent>()
    this.messageSubject = new ReplaySubject()
    this.peerJoinSubject = new ReplaySubject()
    this.peerLeaveSubject = new ReplaySubject()
    this.stateSubject = new Subject<State>()

    this.saveInterval = setInterval(() => {
      if (this.mongoDoc) {
        this.save()
      }
    }, SAVE_INTERVAL)

    wg.onMessage = (id, bytes: Uint8Array) => {
      const msg: IMessage = Message.decode(bytes)
      if (msg.service === 'botprotocol') {
        this.key = BotProtocol.decode(msg.content as any).key

        this.mongooseAdapter.find(this.key)
          .then((doc) => {
            if (doc) {
              log.info(`Document "${this.key}" retreived from database`)
              return doc
            } else {
              log.info(`"${this.key}" document was not found in database: a new document has been created`)
              return this.mongooseAdapter.create(this.key)
            }
          })
          .then((doc: Document) => {
            this.mongoDoc = doc
            this.operations = doc.get('operations').map((op: any) => RichLogootSOperation.fromPlain(op))
            this.initMuteCore()
            this.joinSubject.next(new JoinEvent(this.wg.myId, this.key, false))
            this.stateSubject.next(new State(new Map(), this.operations))
          })
          .catch((err) => {
            log.error(`Error when searching for the document ${this.key}`, err)
          })

        wg.onMessage = (id, bytes: Uint8Array) => {
          const msg = Message.decode(bytes)
          this.messageSubject.next(new NetworkMessage(msg.service, id, true, msg.content))
        }
      } else {
        this.messageSubject.next(new NetworkMessage(msg.service as any, id, true, msg.content as any))
      }
    }

    // this.sendMyUrl()
    wg.onMemberJoin = (id) => this.peerJoinSubject.next(id)
    wg.onMemberLeave = (id) => this.peerLeaveSubject.next(id)
  }

  init () {
    this.wg.sendTo(this.wg.members[1], this.encode({
      service: 'botprotocol',
      content: BotProtocol.encode(BotProtocol.create({ key: '' })).finish(),
    }))
  }

  clean () {
    this.save()
    global.clearInterval(this.saveInterval)
  }

  private save () {
    if (this.lastReceivedState !== this.lastSaveState) {
      log.info('Saving document: ' + this.key)
      this.mongoDoc.set( { operations: this.lastReceivedState.richLogootSOps} )
      this.mongoDoc.save()
      this.lastSaveState = this.lastReceivedState
    }
  }

  private initMuteCore (): void {
    // TODO: MuteCore should consume doc Object
    this.muteCore = new MuteCore(42)
    this.muteCore.messageSource = this.messageSubject.asObservable() as any
    this.muteCore.onMsgToBroadcast.subscribe((bm: BroadcastMessage) => {
      this.wg.send(this.encode(bm))
    })
    this.muteCore.onMsgToSendRandomly.subscribe((srm: SendRandomlyMessage) => {
      const members = this.wg.members.filter((id) => id !== this.wg.myId)
      const index = Math.ceil(Math.random() * members.length) - 1
      this.wg.sendTo(members[index], this.encode(srm))
    })
    this.muteCore.onMsgToSendTo.subscribe((stm: SendToMessage) => {
      this.wg.sendTo(stm.id, this.encode(stm))
    })

    // Collaborators config
    this.muteCore.collaboratorsService.peerJoinSource = this.peerJoinSubject.asObservable() as any
    this.muteCore.collaboratorsService.peerLeaveSource = this.peerLeaveSubject.asObservable() as any
    const pseudoSubject = new BehaviorSubject<string>(this.pseudonym)
    this.muteCore.collaboratorsService.pseudoSource = pseudoSubject.asObservable() as any

    // Sync service config
    this.muteCore.syncService.onState.subscribe((state: State) => this.lastReceivedState = state)

    this.muteCore.syncService.setJoinAndStateSources(
      this.joinSubject.asObservable() as any, this.stateSubject.asObservable() as any,
    )

    this.muteCore.init(this.key)
  }

  private encode (msg: AbstractMessage) {
    return Message.encode(Message.create(msg)).finish()
  }
}
