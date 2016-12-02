import { BotServer } from 'netflux'

import { BotStorage } from './botstorage'
import { MongooseAdapter } from './mongooseadapter'

import * as express from 'express'

const host = '0.0.0.0'
const portAPI = 8080
const portWS = 9000
const log = true

const options = {host, portWS, log}

const app = express()

const botServer = new BotServer(options)

const mongooseAdapter: MongooseAdapter = new MongooseAdapter('localhost')

botServer.start()
  .then(() => {
    console.info(`Bot is listening at ${host }:${ portWS }`)
  })
  .catch((err) => {
    console.info(`An error occurred while starting the bot: ${ err }`)
  })

botServer.onWebChannel = (wc) => {
  new BotStorage(wc, mongooseAdapter)
}

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/docs', (req, res) => {
  mongooseAdapter.list()
  .then( (docs: any[]) => {
    const data = docs.map( (doc) => {
      // We just want to retrieve the doc's ID and title
      return { id: doc.key, title: doc.key }
    })
    res.json(data)
  })
  .catch( (err) => {
    res.status(500).json({ error: err })
  })
})

app.listen(portAPI, () => {
  console.log(`API listening on port ${portAPI}!`)
})
