import { BotServer } from 'netflux'
import * as https from 'https'
import * as http from 'http'
import * as express from 'express'
import * as program from 'commander'

import { BotStorage } from './BotStorage'
import { MongooseAdapter } from './MongooseAdapter'
import { createLogger, log } from './log'

// Default options
const defaults = {
  host: '0.0.0.0',
  port: 8080,
  portBot: 9000,
  signalingURL: 'http://signal2.loria.fr',
  useHttps: false,
  logLevel: 'info',
  logIntoFile: false
}

// Configure command-line interface
program
  .option('-h, --host <ip or host name>',
    `Specify host address to bind to, DEFAULT: "${defaults.host}"`, defaults.host)
  .option('-p, --port <n>',
    `Specify port to use for the server (REST API), DEFAULT: ${defaults.port}`, defaults.port)
  .option('-b, --portBot <n>',
    `Specify port to use for the peer to peer bot, DEFAULT: ${defaults.portBot}`, defaults.portBot)
  .option('-s, --signalingURL <url>',
    `Specify Signaling server url for the peer to peer bot, DEFAULT: ${defaults.signalingURL}\n`, defaults.signalingURL)
  .option('-t, --https',
    `If present, the REST API server is listening on HTTPS instead of HTTP`)
  .option('-l, --logLevel <none|trace|debug|info|warn|error|fatal>',
    `Specify level for logging. DEFAULT: "info". `,
    /^(none|trace|debug|info|warn|error|fatal)$/i, defaults.logLevel)
  .option('-f, --logFile', `If specified, writes logs into file`)
  .parse(process.argv)

// Setup settings
const {host, port, portBot, signalingURL, logLevel} = program
const useHttps = (program as any).useHttps ? true : false
const logIntoFile = (program as any).logFile ? true : false

// Configure logging
createLogger(logIntoFile, logLevel)

// Configure error handling on process
process.on('uncaughtException', (err) => log.fatal(err))

// Connect to MongoDB
const mongooseAdapter: MongooseAdapter = new MongooseAdapter('localhost')

// Configure & Start Peer To Peer bot
const bot = new BotServer({host: host, port: portBot, signalingURL})

bot.start()
  .then(() => {
    log.info(`Bot is listening at ${host}:${portBot}`)
    bot.onWebChannel = (wc) => {
      log.info('New peer to peer network invitation. Initializing BotStorage...')
      new BotStorage(wc, mongooseAdapter)
    }
  })
  .catch((err) => {
    log.fatal(`An error occurred while starting the bot`, err)
  })

// Configure & Start REST server
const app = express()

// Configure CORS: Cross-origin resource sharing middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/ping', (req, res) => {
  log.debug('Request Debug: ' )
  log.info('Request info: ' )
  res.send('pong')
})

app.get('/docs', (req, res) => {
  mongooseAdapter.list()
  .then( (docs: any[]) => {
    const data = docs.map( (doc) => {
      // We just want to retrieve the doc's ID and title
      return { id: doc.key, title: doc.title }
    })
    res.json(data)
  })
  .catch( (err) => {
    res.status(500).json({ error: err })
  })
})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const server = useHttps ? https.createServer(app) : http.createServer(app)
server.listen(port, host, () => {
  log.info('Starting with the following settings: ',
    {host, port, portBot, signalingURL, useHttps, logLevel, logIntoFile}
  )
  log.info(`Server (REST API) is listening at http${useHttps ? 's' : ''}://${host}:${port}`)
})
