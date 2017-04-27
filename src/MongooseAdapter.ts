import * as mongoose from 'mongoose'
import { RichLogootSOperation } from 'mute-core'

import { log } from './log'

export class MongooseAdapter {

  private db: mongoose.Connection
  private docSchema: mongoose.Schema
  private docModel: mongoose.Model<mongoose.Document>

  constructor () {
    this.docSchema = new mongoose.Schema({
      key: { type: String, require: true },
      doc: { type: Object }
    })
    this.docModel = mongoose.model('Doc', this.docSchema)
  }

  connect(url: string): Promise<void> {
    const uri = `mongodb://${url}/docs`
    return mongoose.connect(uri)
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

  save (key: string, doc: RichLogootSOperation[]): Promise<any> {
    const query = {key}
    const update = {doc}
    const options = {upsert: true, new: true, setDefaultsOnInsert: true}
    return this.docModel.findOneAndUpdate(query, update, options).exec()
  }
}
