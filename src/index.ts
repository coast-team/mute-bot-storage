import { BotServer } from 'netflux'

import { BotStorage } from './botstorage'

const host = '0.0.0.0'
const port = 9000
const log = true

const options = {host, port, log}

const botServer = new BotServer(options)
const bots: BotStorage[] = []

botServer.start()
  .then(() => {
    console.info(`Bot is listening at ${host }:${ port }`)
  })
  .catch((err) => {
    console.info(`An error occurred while starting the bot: ${ err }`)
  })

botServer.onWebChannel = (wc) => {
  bots.push(new BotStorage(wc))
}
