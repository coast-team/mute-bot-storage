import * as program from 'commander'
import * as http from 'http'
import * as https from 'https'
import * as koaCors from 'kcors'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as KoaRouter from 'koa-router'
import { WebGroup, WebGroupBotServer, WebGroupState } from 'netflux'

import { BotStorage } from './BotStorage'
import { createLogger, log } from './log'
import { MongooseAdapter } from './MongooseAdapter'
import { Keys } from './proto'

interface IOptions {
  name: string,
  host: string,
  port: number,
  botURL: string,
  signalingURL: string,
  useHttps: boolean,
  database: string,
  key: string,
  cert: string,
  ca: string,
  logLevel: string,
  logIntoFile: boolean
}

// Default options
const defaults: IOptions = {
  name: 'Repono',
  host: '0.0.0.0',
  port: 20000,
  botURL: 'ws://localhost:20000',
  signalingURL: 'ws://localhost:10000',
  useHttps: false,
  database: 'mutedocs',
  key: '',
  cert: '',
  ca: '',
  logLevel: 'info',
  logIntoFile: false,
}

// Configure command-line interface
program
  .option('-n, --name <bot name>',
    `Bot name. Default: "${defaults.name}"`, defaults.name)
  .option('-h, --host <ip or host name>',
    `Host address to bind to, Default: "${defaults.host}"`, defaults.host)
  .option('-p, --port <n>',
    `Port to use for the server. Default: ${defaults.port}`, defaults.port)
  .option('-b, --botURL <n>',
    `Bot public URL, to be shared on the p2p network. Default: ${defaults.botURL}`, defaults.botURL)
  .option('-d, --database <n>',
    `Database name. Default: ${defaults.database}`, defaults.database)
  .option('-s, --signalingURL <url>',
    `Signaling server url. Default: ${defaults.signalingURL}\n`, defaults.signalingURL)
  .option('-t, --https',
    `If present, the REST API server is listening on HTTPS instead of HTTP`)
  .option('-k, --key <value>',
    `Private key for the certificate`)
  .option('-c, --cert <value>',
    `The server certificate`)
  .option('-a, --ca <value>',
    `The additional intermediate certificate or certificates that web browsers
      will need in order to validate the server certificate.`)
  .option('-l, --logLevel <none|trace|debug|info|warn|error|fatal>',
    `Logging level. Default: "info". `,
    /^(none|trace|debug|info|warn|error|fatal)$/i, defaults.logLevel)
  .option('-f, --logFile', `If specified, writes logs into file`)
  .parse(process.argv)

if (!program.host) {
  throw new Error('-h, --host options is required')
}

// Command line parameters
const {name, host, port, botURL, signalingURL, database, key, cert, ca, logLevel} = program as any
const useHttps = (program as any).useHttps ? true : false
const logIntoFile = (program as any).logFile ? true : false

// Configure logging
createLogger(logIntoFile, logLevel)

// Configure error handling on process
process.on('uncaughtException', (err) => log.fatal(err))

// Connect to MongoDB
const error = null
const db = new MongooseAdapter()
db.connect('localhost', database)
  .then(() => {
    log.info(`Connected to the database  ✓`)

    // Configure routes
    // Instantiate main objects
    const app = new Koa()
    const router = new KoaRouter()

    router
      .get('/name', (ctx, next) => {
        log.debug('/name')
        ctx.body = name
      })
      .post('/exist', async (ctx, next) => {
        const keys = (ctx.request as any).body
        log.debug('Waiting /exist', keys)
        const existedKeys = await db.whichExist([])
        log.debug('finish /exist', existedKeys)
        ctx.body = JSON.stringify(existedKeys)
      })
      .get('/docs', async (ctx, next) => {
        log.debug('Waiting /docs')
        await db.list()
          .then((docs: any[]) => {
            const docList = docs.map((doc) => ({ id: doc.key }))
            ctx.body = docList
          })
          .catch( (err) => {
            log.error('Could not retreive the document list stored in database', err)
            ctx.status = 500
          })
        log.debug('finish /docs')
      })

    // Apply router and cors middlewares
    return app
      .use(koaCors())
      .use(bodyParser())
      .use(router.routes())
      .use(router.allowedMethods())
  })
  .then ((app) => {
    log.info(`Configured routes  ✓`)

    // Create server
    if (useHttps) {
      const fs = require('fs')
      return require('https').createServer({
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert),
        ca: fs.readFileSync(ca),
      }, app.callback())
    } else {
      return http.createServer(app.callback())
    }
  })
  .then((server: http.Server|https.Server) => {
    log.info(`Configured server  ✓`)

    // Configure storage bot
    const bot = new WebGroupBotServer({url: botURL, server, webGroupOptions: { signalingURL }})
    bot.onWebGroup = (wg: WebGroup) => {
      log.info('New peer to peer network invitation received. Waiting for a document key...')
      const botStorage = new BotStorage(name, wg, db)
      wg.onStateChange = (state: WebGroupState) => {
        if (state === WebGroupState.JOINED) {
          botStorage.sendKeyRequest(wg)
        }
      }
    }

    return new Promise((resolve, reject) => {
      // Start the server
      server.listen(port, host, resolve)
      // console.assert(false)
    })
  })
  .then(() => {
    log.info(`Successfully started the storage bot server at ${host}:${port} with the following settings`,
      {name, host, port, botURL, signalingURL, useHttps, logLevel, logIntoFile},
    )
  })
  .catch((err) => {
    log.fatal(err)
  })
