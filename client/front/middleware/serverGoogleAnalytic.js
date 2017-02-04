const log = require('log4js').getLogger('google analytic')

const config = require('../server/config')
const request = require('superagent')
const uuid = require('uuid')
const EMPTY_GIF = new Buffer('R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==', 'base64')
const expires = 3600 * 1000 * 24 * 365 * 2

const shouldBanSpider = ua => {
  if (!ua) {
    return true
  }

  ua = ua.toLowerCase().replace(/\s+/g, '')
  return config.ga.spider.some(item => ua.indexOf(item) > -1)
}

const getClientIp = (req) => {
  let matched = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
  return matched ? matched[0] : req.ip
}

module.exports = (req, res, next) => {
  let clientId = req.cookies.id
  if (!clientId) {
    clientId = uuid.v4()
    res.cookie('id', clientId, {
      expires: new Date(Date.now() + expires)
    })
  }

  let realQuery = req.query
  res.setHeader('Content-Type', 'image/gif')
  res.setHeader('Content-Length', 43)
  res.end(EMPTY_GIF)

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

  let timeStamp = realQuery.z || Date.now()
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
  request.get(config.ga.api).query(form).end((err, response) => {
    if (err) {
      log.error(err, form)
      return
    }
    if (response.statusCode !== 200) {
      log.error(response, form)
      return
    }
    log.info('Google Analytic sended', form.cid, form.ua)
  })
}
