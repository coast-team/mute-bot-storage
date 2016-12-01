
export class BotStorage {

  private wc

  constructor(wc) {
    this.wc = wc

    wc.onMessage = (id, msg, isBroadcast) => {
      console.log('We got a message!')
      // this.handleMessage(wc, id, msg, isBroadcast)
    }
    wc.replicaNumber = wc.myId
    wc.username = 'BotStorage'

    /*
    const userInfo = {
      peerId : wc.myId,
      replicaNumber : wc.replicaNumber,
      username : wc.username
    }
    */
  }

}
