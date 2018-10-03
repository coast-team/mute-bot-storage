import { Symmetric } from '@coast-team/mute-crypto'
import { connect, connection, Document, Model, model, Mongoose, Schema } from 'mongoose'

import { isUndefined } from 'util'
import { log } from './log'

export interface IMetadata {
  signalingKey: string
  cryptoKey: string
  title: string
  titleModified: number
  created: number
  shareLogs: boolean
  shareLogsVector: Map<number, number>
}

const DEFAULT_TITLE = 'Untitled Document'

export class MongooseAdapter {
  private DocModel: Model<Document>

  constructor() {
    this.DocModel = model(
      'Doc',
      new Schema({
        key: String,
        signalingKey: { type: String, require: true },
        cryptoKey: { type: String, default: '' },
        title: { type: String, default: DEFAULT_TITLE },
        titleModified: { type: Number, default: 0 },
        created: Number,
        logins: [],
        operations: Array,
        shareLogs: Boolean,
        shareLogsVector: { type: Map, of: Number },
      })
    )
  }

  connect(url: string, dbName: string): Promise<Mongoose> {
    connection.on('close', () => log.warn(`Connection to the database has been closed`))
    return connect(
      `mongodb://${url}:27017/${dbName}`,
      { useNewUrlParser: true }
    )
  }

  async find(signalingKey: string): Promise<Document | null> {
    const doc = await this.DocModel.findOne({ signalingKey }).exec()
    if (doc) {
      const key = doc.get('key')
      if (key) {
        doc.set({
          key: undefined,
          signalingKey: key,
          cryptoKey: await Symmetric.generateKey(),
        })
        await doc.save()
      }
    }
    return doc
  }

  async lookupMetadataByLogin(login: string): Promise<IMetadata[]> {
    const docs = await this.DocModel.find({ logins: login }, '-operations -logins').exec()

    const result = []
    for (const doc of docs) {
      const key = doc.get('key')
      if (key) {
        doc.set({
          key: undefined,
          signalingKey: key,
          cryptoKey: await Symmetric.generateKey(),
        })
        await doc.save()
      }
      const signalingKey = doc.get('signalingKey')
      const cryptoKey = doc.get('cryptoKey')
      const title = doc.get('title')
      const titleModified = doc.get('titleModified')
      const created = doc.get('created')
      const shareLogs = doc.get('shareLogs')
      const shareLogsVector = this.getShareVector(doc)
      result.push({
        signalingKey,
        cryptoKey,
        title,
        titleModified,
        created,
        shareLogs,
        shareLogsVector,
      })
    }
    return result
  }

  async removeLogin(signalingKey: string, login: string) {
    const doc = await this.find(signalingKey)
    if (doc) {
      const logins: string[] = doc.get('logins')
      for (let i = 0; i < logins.length; i++) {
        if (logins[i] === login) {
          logins.splice(i)
          break
        }
      }
      doc.set('logins', logins)
      await doc.save()
    }
  }

  async create(signalingKey: string): Promise<Document> {
    const cryptoKey = await Symmetric.generateKey()
    return this.DocModel.create({
      signalingKey,
      created: Date.now(),
      cryptoKey,
    })
  }

  public getShareVector(doc: Document): Map<number, number> {
    const shareLogsVector = doc.get('shareLogsVector')
    if (isUndefined(shareLogsVector)) {
      return new Map<number, number>()
    }
    const map = new Map<number, number>()
    for (const k of shareLogsVector.keys()) {
      const id = parseInt(k, 10)
      map.set(id, shareLogsVector.get(k))
    }
    return map
  }
}
