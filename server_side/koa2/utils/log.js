const log4js = require('log4js');
const config = require('../conf/config');

let log = log4js.getLogger(config.appName);

module.exports = log;