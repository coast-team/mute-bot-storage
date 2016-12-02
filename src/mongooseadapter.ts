import * as mongoose from 'mongoose'
import * as MuteStructs from 'mute-structs'

export class MongooseAdapter {

  private db: mongoose.Connection

  private docSchema: mongoose.Schema = new mongoose.Schema({
    key: {
      type: String,
      require: true
    },
    doc: {
      root: Object,
      str: String
    }
  })

  private docModel = mongoose.model('Doc', this.docSchema)

  constructor (url: string) {
    mongoose.connect(`mongodb://${url}/docs`)
    this.db = mongoose.connection
    this.db.on('error', console.error.bind(console, 'connection error:'))
    this.db.once('open', function() {
      // we're connected!
      console.log(`Successfully connected to database ${url}`)
    })
  }

  find (key: string): Promise<any> {
    return new Promise( (resolve, reject) => {
      const query = { key: key }
      this.docModel.findOne(query, function (err, doc) {
        if (err) {
          console.error(err)
          reject()
        } else {
          resolve(doc)
        }
      })
    })
  }

  list (): Promise<any[]> {
    return new Promise( (resolve, reject) => {
      this.docModel.find((err, docs) => {
        if (err) {
          console.error(err)
          reject()
        } else {
          resolve(docs)
        }
      })
    })
  }

  // FIXME: Limit the number of saves
  save (key: string, doc: MuteStructs.LogootSRopes) {
    const query = { key: key }
    const update = { doc: { root: doc.root, str: doc.str } }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }

    this.docModel.findOneAndUpdate(query, update, options, function(err, result) {
        if (err) {
          return console.error(err)
        }
    })
  }
}
