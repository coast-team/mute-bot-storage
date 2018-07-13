import { connect, connection, Document, Model, model, Mongoose, Schema } from 'mongoose'
import { SymmetricCrypto } from './SymmetricCrypto'

export interface IMetadata {
  signalingKey: string
  cryptoKey: string
  title: string
  titleModified: number
  created: number
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
      })
    )
  }

  connect(url: string, dbName: string): Promise<Mongoose> {
    connection.on('close', () => log.warn(`Connection to the database has been closed`))
    return connect(`mongodb://${url}/${dbName}`)
  }

  async find(signalingKey: string): Promise<Document | null> {
    const doc = await this.DocModel.findOne({ signalingKey }).exec()
    if (doc) {
      const key = doc.get('key')
      if (key) {
        doc.set({
          key: undefined,
          signalingKey: key,
          cryptoKey: await SymmetricCrypto.generateKey(),
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
          cryptoKey: await SymmetricCrypto.generateKey(),
        })
        await doc.save()
      }
      const signalingKey = doc.get('signalingKey')
      const cryptoKey = doc.get('cryptoKey')
      const title = doc.get('title')
      const titleModified = doc.get('titleModified')
      const created = doc.get('created')
      result.push({ signalingKey, cryptoKey, title, titleModified, created })
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
    const cryptoKey = await SymmetricCrypto.generateKey()
    return this.DocModel.create({ signalingKey, created: Date.now(), cryptoKey })
  }
}
