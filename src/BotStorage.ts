import { ReplaySubject, BehaviorSubject, Subject } from 'rxjs'
import {
  MuteCore,
  BroadcastMessage,
  SendRandomlyMessage,
  AbstractMessage,
  SendToMessage,
  NetworkMessage,
  JoinEvent,
  RichLogootSOperation,
  State } from 'mute-core'

import { MongooseAdapter } from './MongooseAdapter'
import { log } from './log'
const pb = require('./proto/message_pb.js')

// TODO: BotStorage should serialize document in DB
export class BotStorage {

  private mongooseAdapter: MongooseAdapter
  private webChannel
  private muteCore: MuteCore
  private pseudonym: string
  private url: string

  private joinSubject: Subject<JoinEvent>
  private messageSubject: ReplaySubject<NetworkMessage>
  private peerJoinSubject: ReplaySubject<number>
  private peerLeaveSubject: ReplaySubject<number>
  private stateSubject: Subject<State>

  constructor(pseudonym, webChannel, mongooseAdapter: MongooseAdapter) {
    this.pseudonym = pseudonym
    this.joinSubject = new Subject<JoinEvent>()
    this.messageSubject = new ReplaySubject()
    this.peerJoinSubject = new ReplaySubject()
    this.peerLeaveSubject = new ReplaySubject()
    this.stateSubject = new Subject<State>()

    this.webChannel = webChannel

    webChannel.onMessage = (id, bytes, isBroadcast) => {
      const msg = pb.Message.deserializeBinary(bytes)
      if (msg.getService() === 'botprotocol') {
        const docKey = pb.BotProtocol.deserializeBinary(msg.getContent()).getKey()

        this.mongooseAdapter.find(docKey)
          .then((doc: RichLogootSOperation[]) => {
            this.initMuteCore(docKey)
            this.joinSubject.next(new JoinEvent(this.webChannel.myId, docKey, false))
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

        webChannel.onMessage = (id, bytes, isBroadcast) => {
          const msg = pb.Message.deserializeBinary(bytes)
          this.messageSubject.next(new NetworkMessage(msg.getService(), id, isBroadcast, msg.getContent()))
        }
      } else {
        this.messageSubject.next(new NetworkMessage(msg.getService(), id, isBroadcast, msg.getContent()))
      }
    }

    const msg = new pb.BotProtocol()
    msg.setKey('')
    webChannel.sendTo(webChannel.members[0], this.buildMessage({
      service: 'botprotocol',
      content: msg.serializeBinary()
    }))

    // this.sendMyUrl()
    webChannel.onPeerJoin = (id) => {
      // this.sendMyUrl(id)
      this.peerJoinSubject.next(id)
    }
    webChannel.onPeerLeave = (id) => this.peerLeaveSubject.next(id)

    this.mongooseAdapter = mongooseAdapter
  }

  initMuteCore (docKey: string): void {
    // TODO: MuteCore should consume doc Object
    this.muteCore = new MuteCore(42)
    this.muteCore.messageSource = this.messageSubject.asObservable() as any
    this.muteCore.onMsgToBroadcast.subscribe((bm: BroadcastMessage) => {
      this.webChannel.send(this.buildMessage(bm))
    })
    this.muteCore.onMsgToSendRandomly.subscribe((srm: SendRandomlyMessage) => {
      const index: number = Math.ceil(Math.random() * this.webChannel.members.length) - 1
      this.webChannel.sendTo(this.webChannel.members[index], this.buildMessage(srm))
    })
    this.muteCore.onMsgToSendTo.subscribe((stm: SendToMessage) => {
      this.webChannel.sendTo(stm.id, this.buildMessage(stm))
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
    this.muteCore.syncService.setJoinAndStateSources(this.joinSubject.asObservable() as any, this.stateSubject.asObservable() as any)
    this.muteCore.init(docKey)
  }

  private sendMyUrl (id?: number) {
    const msg = new pb.BotResponse()
    msg.setUrl(this.url)
    if (id !== undefined) {
      this.webChannel.sendTo(this.webChannel.members[0], this.buildMessage({
        service: 'botprotocol',
        content: msg.serializeBinary()
      }))
    } else {
      this.webChannel.send(this.buildMessage({
        service: 'botprotocol',
        content: msg.serializeBinary()
      }))
    }
  }

  private buildMessage (msg: AbstractMessage) {
    const pbMsg = new pb.Message()
    pbMsg.setService(msg.service)
    pbMsg.setContent(msg.content)
    return pbMsg.serializeBinary()
  }
}
