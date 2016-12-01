const pb = require('./message_pb.js')

export class BotStorage {

  private webChannel
  private username = 'BotStorage'

  constructor(webChannel) {
    this.webChannel = webChannel

    webChannel.onMessage = (id, msg, isBroadcast) => {
      console.log('We got a message!')
      // this.handleMessage(webChannel, id, msg, isBroadcast)
    }

    // webChannel.replicaNumber = webChannel.myId
    // webChannel.username = 'BotStorage'

    this.sendPeerPseudo(this.username, -1)
    this.webChannel.onPeerJoin = (id) => this.sendPeerPseudo(this.username, id)
  }

  sendPeerPseudo (pseudo: string, id: number = -1) {
    let pseudoMsg = new pb.PeerPseudo()
    pseudoMsg.setPseudo(pseudo)
    let msg = new pb.Message()
    msg.setPeerpseudo(pseudoMsg)
    if (id !== -1) {
      this.webChannel.sendTo(id, msg.serializeBinary())
    } else {
      this.webChannel.send(msg.serializeBinary())
    }
  }

}
