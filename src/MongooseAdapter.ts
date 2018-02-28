import { connect, connection, Document, Model, model, Mongoose, Schema } from 'mongoose'

export class MongooseAdapter {

  private DocModel: Model<Document>

  constructor () {
    this.DocModel = model('Doc', new Schema({
      key: { type: String, require: true },
      operations: Array,
    }))
  }

  connect (url: string, dbName: string): Promise<Mongoose> {
    connection.on('close', () => log.warn(`Connection to the database has been closed`))
    return connect(`mongodb://${url}/${dbName}`)
  }

  find (key: string): Promise<Document | null> {
    return this.DocModel.findOne({ key }).exec()
  }

  list (): Promise<Document[]> {
    return this.DocModel.find().exec()
  }

  whichExist (keys: string[]): Promise<string[] | undefined> {
    return this.DocModel.find({ key: { $in: keys } }).exec()
      .then((docs) => {
        if (docs !== null) {
          return docs.map((doc: any) => doc.key)
        }
        return []
      })
  }

  create (key: string): Promise<Document> {
    return this.DocModel.create({ key })
  }
}
