import { ReplaySubject, BehaviorSubject } from 'rxjs'
import { MuteCore, BroadcastMessage, SendRandomlyMessage, AbstractMessage, SendToMessage, NetworkMessage } from 'mute-core'

import { MongooseAdapter } from './MongooseAdapter'
const pb = require('./proto/message_pb.js')

// TODO: BotStorage should serialize document in DB
export class BotStorage {

  private mongooseAdapter: MongooseAdapter
  private webChannel
  private muteCore: MuteCore
  private pseudonym = 'Bot Storage'

  private messageSubject: ReplaySubject<NetworkMessage>
  private peerJoinSubject: ReplaySubject<number>
  private peerLeaveSubject: ReplaySubject<number>

  constructor(webChannel, mongooseAdapter: MongooseAdapter) {
    this.messageSubject = new ReplaySubject()
    this.peerJoinSubject = new ReplaySubject()
    this.peerLeaveSubject = new ReplaySubject()
    this.webChannel = webChannel
    // FIXME: this.muteCore.joinSource =

    webChannel.onMessage = (id, msg, isBroadcast) => {
      const pbMsg = new pb.Message()
      pbMsg.deserializeBinary()
      if (pbMsg.service === this.pseudonym) {
        const pbBotContent = new pb.DocId()
        pbBotContent.deserializeBinary()
        this.mongooseAdapter.find(pbBotContent.getId())
          .then((data: {doc: Object, title: string}) => this.initMuteCore(data.doc))
        webChannel.onMessage = (id, msg, isBroadcast) => {
          const pbMsg = new pb.Message()
          pbMsg.deserializeBinary()
          this.messageSubject.next(new NetworkMessage(pbMsg.service, id, isBroadcast, pbMsg.content))
        }
      }
    }

    webChannel.onPeerJoin = (id) => this.peerJoinSubject.next(id)
    webChannel.onPeerLeave = (id) => this.peerLeaveSubject.next(id)

    this.mongooseAdapter = mongooseAdapter
  }

  initMuteCore (doc: Object) {
    // TODO: MuteCore should consume doc Object
    this.muteCore = new MuteCore(42)
    this.muteCore.messageSource = this.messageSubject.asObservable() as any
    this.muteCore.onMsgToBroadcast.subscribe((bm: BroadcastMessage) => {
      this.webChannel.send(this.buildMessage(bm))
    })
    this.muteCore.onMsgToSendRandomly.subscribe((srm: SendRandomlyMessage) => {
      const peerId = Math.ceil(Math.random() * this.webChannel.members.length)
      this.webChannel.sendTo(peerId, this.buildMessage(srm))
    })
    this.muteCore.onMsgToSendTo.subscribe((stm: SendToMessage) => {
      this.webChannel.sendTo(stm.id, this.buildMessage(stm))
    })

    // Collaborators config
    this.muteCore.collaboratorsService.peerJoinSource = this.peerJoinSubject.asObservable() as any
    this.muteCore.collaboratorsService.peerLeaveSource = this.peerLeaveSubject.asObservable() as any
    const pseudoSubject = new BehaviorSubject<string>(this.pseudonym)
    this.muteCore.collaboratorsService.pseudoSource = pseudoSubject.asObservable() as any
  }

  private buildMessage (msg: AbstractMessage) {
    const pbMsg = new pb.Message()
    pbMsg.setService(msg.service)
    pbMsg.setContent(msg.content)
    return pbMsg.serializeBinary()
  }
}
