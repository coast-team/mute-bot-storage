import * as bunyan from 'bunyan'

export let log = bunyan.createLogger({name: 'mute-bot-storage'})

export function setLogLevel(logLevel: string) {
  switch (logLevel) {
    case 'none':
      log.level(bunyan.FATAL + 1)
      break
    case 'trace':
      log.level(bunyan.TRACE)
      break
    case 'debug':
      log.level(bunyan.DEBUG)
      break
    case 'info':
      log.level(bunyan.INFO)
      break
    case 'warn':
      log.level(bunyan.WARN)
      break
    case 'error':
      log.level(bunyan.ERROR)
      break
    case 'fatal':
      log.level(bunyan.FATAL)
      break
    default:
      log.level(bunyan.INFO)
  }
}
