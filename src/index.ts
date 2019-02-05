import * as program from 'commander'
import * as http from 'http'
import * as https from 'https'
import * as koaCors from 'kcors'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as KoaRouter from 'koa-router'
import { Bot, LogLevel, setLogLevel } from 'netflux'

import { asymmetricCrypto } from '@coast-team/mute-crypto'
import { BotStorage } from './BotStorage'
import { createLogger, log } from './log'
import { IMetadata, MongooseAdapter } from './MongooseAdapter'
import { IKeyPair } from './PKRequest'

interface IOptions {
  name: string
  host: string
  port: number
  botURL: string
  signalingURL: string
  keyServerURLPrefix: string
  jwt: string
  database: string
  cryptography: string
  cors: boolean
  key: string
  cert: string
  ca: string
  logLevel: string
  logFolder: string
}

// Retrieve version from package.json
let version: string
try {
  version = require('../package.json').version
} catch (err) {
  try {
    version = require('./package.json').version
  } catch {
    log.error(err)
    version = ''
  }
}

// Default options
const defaults: IOptions = {
  name: 'Repono',
  host: '0.0.0.0',
  port: 20000,
  botURL: 'ws://localhost:20000',
  signalingURL: 'ws://localhost:8010',
  keyServerURLPrefix: '', // dev http://localhost:4000/public-key
  jwt: '',
  database: 'mutedocs',
  cryptography: 'keyagreement', // Possible values: 'none', 'metadata', 'keyagreement'
  cors: false,
  key: '',
  cert: '',
  ca: '',
  logLevel: 'info',
  logFolder: '',
}

// Configure command-line interface
program
  .version(version)
  .option('-h, --host <ip or host name>', 'Host address to bind to.', defaults.host)
  .option('-p, --port <number>', 'Port to use for the server.', defaults.port)
  .option('-b, --botURL <number>', 'Bot public URL.', defaults.botURL)
  .option('-s, --signalingURL <url>', 'Signaling server url.', defaults.signalingURL)
  .option('-k, --keyServerURLPrefix <url>', 'Keyserver url prefix.', defaults.keyServerURLPrefix)
  .option('-j, --jwt <jwt>', 'JSON Web Token for the keyserver API.', defaults.jwt)
  .option('', '\n')
  .option(
    '-c --cryptography <string>',
    'Specify cryptography type. Possible values are: "none", "metadata", "keyagreement"',
    defaults.cryptography
  )
  .option('--cors', 'Enable Cross-origin Resource Sharing.', defaults.cors)
  .option('-n, --name <bot name>', 'Bot name.', defaults.name)
  .option('-d, --database <name>', 'Database name.', defaults.database)
  .option('', '\n')
  .option('--key <file path>', 'Private key for the certificate')
  .option('--cert <file path>', 'The server certificate')
  .option(
    '--ca <file path>',
    'The additional intermediate certificate or certificates that web browsers will need in order to validate the server certificate.'
  )
  .option('', '\n')
  .option(
    '-l, --logLevel <none|trace|debug|info|warn|error|fatal>',
    `Logging level.`,
    /^(none|trace|debug|info|warn|error|fatal)$/i,
    defaults.logLevel
  )
  .option(
    '-f, --logFolder <path>',
    `Path to where log files would be stored.
                              If not specified stdout will used.`,
    defaults.logFolder
  )
  .parse(process.argv)

// Command line parameters
const {
  name,
  host,
  port,
  botURL,
  signalingURL,
  keyServerURLPrefix,
  jwt,
  database,
  cryptography,
  cors,
  key,
  cert,
  ca,
  logLevel,
  logFolder,
} = program as any

// Configure logging
createLogger(logFolder, logLevel)

if (logLevel !== 'none') {
  setLogLevel(LogLevel.DEBUG)
}

// Configure error handling on process
process.on('uncaughtException', (err) => {
  // log.fatal('NodeJS process error', err)
  console.error('uncaughtException -> ', err)
})

// Connect to MongoDB
const db = new MongooseAdapter()
db.connect(
  `localhost`,
  database
)
  .then(() => {
    log.info(`Connected to the database  ✓`)

    // Configure routes
    // Instantiate main objects
    let app = new Koa()
    const router = new KoaRouter()

    router
      .get('/info', (ctx) => {
        ctx.body = getInfo()
      })
      .get('/docs/:login', async (ctx) => {
        await db
          .lookupMetadataByLogin(ctx.params.login)
          .then((metadata: IMetadata[]) => (ctx.body = metadata))
          .catch((err) => {
            log.error('Could not retreive the document list stored in database', err)
            ctx.status = 500
          })
      })
      .post('/remove', (ctx) => {
        const { key, login } = ctx.request.body as any
        if (ctx.request.body && key && login) {
          db.removeLogin(key, login)
            .then(() => {
              ctx.body = true
            })
            .catch((err) => {
              log.error(`Failed to remove login ${login}`, err)
              ctx.status = 500
            })
        } else {
          ctx.status = 404
        }
      })

    // Apply router and cors middlewares
    if (cors) {
      app = app.use(koaCors())
    }
    return app
      .use(bodyParser())
      .use(router.routes())
      .use(router.allowedMethods())
  })
  .then((app) => {
    log.info(`Configured routes  ✓`)

    // Create server
    if (key && cert && ca) {
      const fs = require('fs')
      return require('https').createServer(
        {
          key: fs.readFileSync(key),
          cert: fs.readFileSync(cert),
          ca: fs.readFileSync(ca),
        },
        app.callback()
      )
    } else {
      return http.createServer(app.callback())
    }
  })
  .then(async (server: http.Server | https.Server) => {
    log.info(`Configured server  ✓`)

    server.on('clientError', (err) => {
      log.error('Client Error', err)
    })

    // Configure storage bot
    const bot = new Bot({
      url: botURL,
      server,
      leaveOnceAlone: false,
      webGroupOptions: {
        signalingServer: signalingURL,
      },
    })
    const exportedSigningKeyPair =
      cryptography === 'keyagreement' ? await generateSigningKeyPair() : undefined
    bot.onWebGroup = (wg) => {
      const botStorage = new BotStorage(
        name,
        getLogin(),
        getDeviceID(botURL),
        wg,
        db,
        cryptography,
        exportedSigningKeyPair,
        keyServerURLPrefix,
        jwt
      )
      log.info('New peer to peer network invitation received for ', botStorage.signalingKey)
    }

    return new Promise((resolve) => server.listen(port, host, resolve))
  })
  .then(() => {
    log.info(
      `Successfully started the storage bot server at ${host}:${port} with the following settings`,
      {
        name,
        host,
        port,
        botURL,
        signalingURL,
        cryptography,
        keyServerURLPrefix,
        jwt,
        logLevel,
        logFolder,
      }
    )
  })
  .catch((err) => log.fatal(err))

function getInfo() {
  return {
    displayName: name,
    login: getLogin(),
    deviceID: getDeviceID(botURL),
    avatar: BotStorage.AVATAR,
    version,
  }
}

function getDeviceID(url: string) {
  // find & remove protocol (http, ftp, etc.) and get hostname and port
  const chunks = url.split('/')
  const host = url.indexOf('://') > -1 ? chunks[2] : chunks[0]

  return host
}

function getLogin() {
  return 'bot.storage'
}

async function generateSigningKeyPair(): Promise<IKeyPair> {
  const signingKeyPair = await asymmetricCrypto.generateSigningKeyPair()
  const exportedSigningKeyPair = await exportSigningKeyPair(signingKeyPair)
  log.debug('PUBLIC KEY = ', exportedSigningKeyPair.publicKey)
  return exportedSigningKeyPair
}

async function exportSigningKeyPair(signingKeyPair: IKeyPair): Promise<IKeyPair> {
  if (signingKeyPair === undefined) {
    throw new Error('Signing key pair is not defined')
  }
  return {
    publicKey: JSON.stringify(await asymmetricCrypto.exportKey(signingKeyPair.publicKey)),
    privateKey: JSON.stringify(await asymmetricCrypto.exportKey(signingKeyPair.privateKey)),
  }
}
