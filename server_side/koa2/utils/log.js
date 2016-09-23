const log4js = require('log4js');
const config = require('../conf/config');

// log4js.configure({
//   appenders: [
//     { type: "console" }
//   ],
//   replaceConsole: true
// });

let log = log4js.getLogger(config.appName);

module.exports = log;