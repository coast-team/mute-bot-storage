const pb = require('./message_pb.js')

import { MongooseAdapter } from './mongooseadapter'

import * as MuteStructs from 'mute-structs'

export class BotStorage {

  private doc: MuteStructs.LogootSRopes
  private key = 'doc'
  private mongooseAdapter: MongooseAdapter
  private username = 'BotStorage'
  private webChannel

  constructor(webChannel, mongooseAdapter: MongooseAdapter) {
    this.webChannel = webChannel
    this.mongooseAdapter = mongooseAdapter

    webChannel.onMessage = (id, msg, isBroadcast) => {
      this.handleMessage(webChannel, id, msg, isBroadcast)
    }

    // webChannel.replicaNumber = webChannel.myId
    // webChannel.username = 'BotStorage'

    this.mongooseAdapter.find(this.key)
    .then( (data: any) => {
      if (data === null) {
        // Do not have a version of the document yet
        this.sendQueryDoc()
      } else {
        const myId: number = this.webChannel.myId
        const clock = 0

        this.doc = MuteStructs.LogootSRopes.fromPlain(myId, clock, data.doc)

        this.sendDoc()
      }
    })
    .catch( (err: string) => {
      console.error(`Error while retrieving ${this.key} document: ${err}`)
    })

    this.sendPeerPseudo(this.username, -1)
    this.webChannel.onPeerJoin = (id) => this.sendPeerPseudo(this.username, id)
  }

  handleMessage (wc, id, bytes, isBroadcast) {
    let msg = pb.Message.deserializeBinary(bytes)
    switch (msg.getTypeCase()) {
      case pb.Message.TypeCase.LOGOOTSADD:
        const logootSAddMsg = msg.getLogootsadd()
        const identifier = new MuteStructs.Identifier(logootSAddMsg.getId().getBaseList(), logootSAddMsg.getId().getLast())
        const logootSAdd: any = new MuteStructs.LogootSAdd(identifier, logootSAddMsg.getContent())
        logootSAdd.execute(this.doc)
        console.log('Updated doc: ', this.doc.str)
        this.mongooseAdapter.save(this.key, this.doc)
        break
      case pb.Message.TypeCase.LOGOOTSDEL:
        const logootSDelMsg: any = msg.getLogootsdel()
        const lid: any = logootSDelMsg.getLidList().map( (identifier: any) => {
          return new MuteStructs.IdentifierInterval(identifier.getBaseList(), identifier.getBegin(), identifier.getEnd())
        })
        const logootSDel: any = new MuteStructs.LogootSDel(lid)
        logootSDel.execute(this.doc)
        console.log('Updated doc: ', this.doc.str)
        this.mongooseAdapter.save(this.key, this.doc)
        break
      case pb.Message.TypeCase.LOGOOTSROPES:
        const myId: number = this.webChannel.myId
        const clock = 0

        const plainDoc: any = msg.toObject().logootsropes

        // Protobuf rename keys like 'base' to 'baseList' because, just because...
        if (plainDoc.root instanceof Object) {
          this.renameKeys(plainDoc.root)
        }

        this.doc = MuteStructs.LogootSRopes.fromPlain(myId, clock, plainDoc)
        // TODO: Retrieve the document's key from this message
        console.log('Received doc: ', this.doc.str)
        this.mongooseAdapter.save(this.key, this.doc)
        break
      case pb.Message.TypeCase.PEERPSEUDO:
      case pb.Message.TypeCase.PEERCURSOR:
        // Don't care about this message
        break
      case pb.Message.TypeCase.QUERYDOC:
        // Should not happen
        break
      case pb.Message.TypeCase.TYPE_NOT_SET:
        console.error('network', 'Protobuf: message type not set')
        break
    }
  }

  sendQueryDoc () {
    const msg = new pb.Message()

    const queryDoc = new pb.QueryDoc()
    msg.setQuerydoc(queryDoc)

    const peerDoor: number = this.webChannel.members[0]

    this.webChannel.sendTo(peerDoor, msg.serializeBinary())
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

  sendDoc () {
    const msg = new pb.Message()

    const logootSRopesMsg = new pb.LogootSRopes()
    logootSRopesMsg.setStr(this.doc.str)

    if (this.doc.root instanceof MuteStructs.RopesNodes) {
      const ropesMsg = this.generateRopesNodeMsg(this.doc.root)
      logootSRopesMsg.setRoot(ropesMsg)
    }

    msg.setLogootsropes(logootSRopesMsg)

    this.webChannel.send(msg.serializeBinary())
  }

  generateRopesNodeMsg (ropesNode: MuteStructs.RopesNodes): any {
    const ropesNodeMsg = new pb.RopesNode()

    const blockMsg = this.generateBlockMsg(ropesNode.block)
    ropesNodeMsg.setBlock(blockMsg)

    if (ropesNode.left instanceof MuteStructs.RopesNodes) {
      ropesNodeMsg.setLeft(this.generateRopesNodeMsg(ropesNode.left))
    }

    if (ropesNode.right instanceof MuteStructs.RopesNodes) {
      ropesNodeMsg.setRight(this.generateRopesNodeMsg(ropesNode.right))
    }

    ropesNodeMsg.setOffset(ropesNode.offset)
    ropesNodeMsg.setLength(ropesNode.length)

    return ropesNodeMsg
  }

  generateBlockMsg (block: MuteStructs.LogootSBlock): any {
    const blockMsg = new pb.LogootSBlock()

    blockMsg.setId(this.generateIdentifierInterval(block.id))
    blockMsg.setNbelement(block.nbElement)

    return blockMsg
  }

  generateIdentifierInterval (id: MuteStructs.IdentifierInterval): any {
    const identifierInterval = new pb.IdentifierInterval()

    identifierInterval.setBaseList(id.base)
    identifierInterval.setBegin(id.begin)
    identifierInterval.setEnd(id.end)

    return identifierInterval
  }

  // FIXME: Prevent Protobuf from renaming our fields or move this code elsewhere
  renameKeys (node: {block: {id: any, nbElement?: any, nbelement: number}, right?: any, left?: any}) {
    node.block.id.base = node.block.id.baseList
    node.block.nbElement = node.block.nbelement
    if (node.left) {
      this.renameKeys(node.left)
    }
    if (node.right) {
      this.renameKeys(node.right)
    }
  }

}
