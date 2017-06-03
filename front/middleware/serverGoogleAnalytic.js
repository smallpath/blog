const log = require('log4js').getLogger('google analytic')

const config = require('../server/config')
const request = require('axios')
const EMPTY_GIF = new Buffer('R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==', 'base64')
const uuid = require('uuid')
const expires = 3600 * 1000 * 24 * 365 * 2
const ipReg = /\d+\.\d+\.\d+\.\d+/
const lowerReg = /\s+/g

const shouldBanSpider = ua => {
  if (!ua) {
    return true
  }

  ua = ua.toLowerCase().replace(lowerReg, '')
  return config.ga.spider.some(item => ua.indexOf(item) > -1)
}

const getClientIp = (req) => {
  let matched = req.ip.match(ipReg)
  return matched ? matched[0] : req.ip
}

module.exports = (req, res, next, query) => {
  let realQuery
  let clientId
  if (!query) {
    clientId = req.cookies.id
    if (!clientId) {
      clientId = uuid.v4()
      res.cookie('id', clientId, {
        expires: new Date(Date.now() + expires)
      })
    }
    res.setHeader('Content-Type', 'image/gif')
    res.setHeader('Content-Length', 43)
    res.end(EMPTY_GIF)
    realQuery = req.query
  } else {
    realQuery = query
    clientId = realQuery.cid
  }

  let passParams = config.ga.required.reduce((prev, curr) => {
    if (!realQuery[curr]) {
      prev = false
    }
    return prev
  }, true)

  if (passParams === false) return
  if (config.googleTrackID === '') return
  let userAgent = req.header('user-agent')
  if (shouldBanSpider(userAgent) === true) return

  let { z: timeStamp = Date.now() } = realQuery
  let form = Object.assign({}, realQuery, {
    v: config.ga.version,
    tid: config.googleTrackID,
    ds: 'web',
    z: timeStamp + clientId,
    cid: clientId,
    uip: getClientIp(req),
    ua: userAgent,
    t: 'pageview',
    an: config.title,
    dh: config.siteUrl
  })
  request.get(config.ga.api, {
    params: form
  }).then(response => {
    if (response.status !== 200) {
      log.error(response, form)
      return
    }
    log.info('Google Analytic sended', form.cid, form.ua)
  }).catch(err => log.error(err, form))
}
