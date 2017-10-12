import { Connection, Document, Model, Schema } from 'mongoose'
import { RichLogootSOperation } from 'mute-core'

import { log } from './log'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

export class MongooseAdapter {

  private db: Connection
  private docSchema: Schema
  private docModel: Model<Document>

  constructor () {
    this.docSchema = new mongoose.Schema({
      key: { type: String, require: true },
      doc: { type: Object },
    })
    this.docModel = mongoose.model('Doc', this.docSchema)
  }

  connect (url: string): Promise<void> {
    const uri = `mongodb://${url}/docs`
    return mongoose.connect(uri, {
      useMongoClient: true,
    })
      .then(() => {
        this.db = mongoose.connection
        mongoose.connection.on('close', () => {
          log.warn(`Connection to the database ${uri} has been closed`)
        })
      })
  }

  find (key: string): Promise<RichLogootSOperation[]> {
    return this.docModel.findOne({key})
      .then((response: any) => {
        if (response !== null) {
          return response.doc.map((op: RichLogootSOperation) => {
            return RichLogootSOperation.fromPlain(op)
          })
        }
        return response
      })
  }

  list (): Promise<any> {
    return this.docModel.find().exec()
  }

  whichExist (keys: string[]): Promise<string[]> {
    return this.docModel.find({ key: { $in: keys } }).exec()
      .then((docs) => {
        if (docs !== null) {
          return docs.map((doc: any) => doc.key)
        }
      })
  }

  save (key: string, doc: RichLogootSOperation[]): Promise<any> {
    const query = {key}
    const update = {doc}
    const options = {upsert: true, new: true, setDefaultsOnInsert: true}
    return this.docModel.findOneAndUpdate(query, update, options).exec()
  }
}
