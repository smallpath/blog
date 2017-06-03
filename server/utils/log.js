const log4js = require('log4js')
const config = require('../conf/config')
let log = log4js.getLogger(config.mongoDatabase)
const isTest = process.env.NODE_ENV === 'TEST'

module.exports = isTest ? {
  debug: () => {},
  info: () => {},
  log: () => {},
  error: () => {},
  warn: () => {}
} : log
