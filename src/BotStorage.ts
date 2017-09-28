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
import { log } from './log'
import { MongooseAdapter } from './MongooseAdapter'
import { BotProtocol, IBotProtocol, IMessage, Message } from './proto'

// TODO: BotStorage should serialize document in DB
export class BotStorage {

  private mongooseAdapter: MongooseAdapter
  private wg
  private muteCore: MuteCore
  private pseudonym: string
  private url: string

  private joinSubject: Subject<JoinEvent>
  private messageSubject: ReplaySubject<NetworkMessage>
  private peerJoinSubject: ReplaySubject<number>
  private peerLeaveSubject: ReplaySubject<number>
  private stateSubject: Subject<State>

  constructor (pseudonym: string, wg: WebGroup, mongooseAdapter: MongooseAdapter) {
    this.pseudonym = pseudonym
    this.joinSubject = new Subject<JoinEvent>()
    this.messageSubject = new ReplaySubject()
    this.peerJoinSubject = new ReplaySubject()
    this.peerLeaveSubject = new ReplaySubject()
    this.stateSubject = new Subject<State>()

    this.wg = wg

    wg.onMessage = (id, bytes: Uint8Array, isBroadcast) => {
      const msg: IMessage = Message.decode(bytes)
      if (msg.service === 'botprotocol') {
        const docKey: string = BotProtocol.decode(msg.content).key

        this.mongooseAdapter.find(docKey)
          .then((doc: RichLogootSOperation[]) => {
            this.initMuteCore(docKey)
            this.joinSubject.next(new JoinEvent(this.wg.myId, docKey, false))
            if (doc === null) {
              log.info(`Document ${docKey} was not found in database, thus create a new document`)
              this.stateSubject.next(new State(new Map(), []))
            } else {
              log.info(`Document ${docKey} retreived from database`)
              this.stateSubject.next(new State(new Map(), doc))
            }
          })
          .catch((err) => {
            log.error(`Error when searching for the document ${docKey}`, err)
          })

        wg.onMessage = (id, bytes: Uint8Array, isBroadcast) => {
          const msg: IMessage = Message.decode(bytes)
          this.messageSubject.next(new NetworkMessage(msg.service, id, isBroadcast, msg.content))
        }
      } else {
        this.messageSubject.next(new NetworkMessage(msg.service, id, isBroadcast, msg.content))
      }
    }

    // this.sendMyUrl()
    wg.onMemberJoin = (id) => {
      // this.sendMyUrl(id)
      this.peerJoinSubject.next(id)
    }
    wg.onMemberLeave = (id) => this.peerLeaveSubject.next(id)

    this.mongooseAdapter = mongooseAdapter
  }

  sendKeyRequest (wg) {
    wg.sendTo(wg.members[0], this.encode({
      service: 'botprotocol',
      content: BotProtocol.encode(BotProtocol.create({ key: '' })).finish(),
    }))
  }

  initMuteCore (docKey: string): void {
    // TODO: MuteCore should consume doc Object
    this.muteCore = new MuteCore(42)
    this.muteCore.messageSource = this.messageSubject.asObservable() as any
    this.muteCore.onMsgToBroadcast.subscribe((bm: BroadcastMessage) => {
      this.wg.send(this.encode(bm))
    })
    this.muteCore.onMsgToSendRandomly.subscribe((srm: SendRandomlyMessage) => {
      const index: number = Math.ceil(Math.random() * this.wg.members.length) - 1
      this.wg.sendTo(this.wg.members[index], this.encode(srm))
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
    this.muteCore.syncService.onState.subscribe((state: State) => {
      // FIXME: Reduce the number of saves
      this.mongooseAdapter.save(docKey, state.richLogootSOps)
        .catch((err) => {
          log.error(`The document ${docKey} could not be saved into database`, err)
        })
    })
    this.muteCore.syncService.setJoinAndStateSources(
      this.joinSubject.asObservable() as any, this.stateSubject.asObservable() as any,
    )

    this.muteCore.init(docKey)
  }

  // private sendMyUrl (id?: number) {
  //   const msg = new pb.BotResponse()
  //   msg.setUrl(this.url)
  //   if (id !== undefined) {
  //     this.wg.sendTo(this.wg.members[0], this.encode({
  //       service: 'botprotocol',
  //       content: msg.serializeBinary(),
  //     }))
  //   } else {
  //     this.wg.send(this.encode({
  //       service: 'botprotocol',
  //       content: msg.serializeBinary(),
  //     }))
  //   }
  // }

  private encode (msg: AbstractMessage) {
    return Message.encode(Message.create(msg)).finish()
  }
}
