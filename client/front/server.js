const isProd = process.env.NODE_ENV === 'production'

const log = require('log4js').getLogger('ssr server')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const schedule = require('node-schedule')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const serialize = require('serialize-javascript')
const request = require('superagent')
const sendGoogleAnalytic = require('./middleware/serverGoogleAnalytic')
const getRobotsFromConfig = require('./server/robots.js')
const { api: sitemapApi, getSitemapFromBody } = require('./server/sitemap.js')
const { api: rssApi, getRssBodyFromBody } = require('./server/rss.js')
let config = require('./server/config')
const inline = fs.readFileSync(resolve('./dist/styles.css'), 'utf-8')

let html = flushHtml()
let sitemap = ''
let rss = ''
let robots = ''

config.flushOption().then(() => {
  robots = getRobotsFromConfig(config)
  html = flushHtml()

  const flushSitemap = () => request.get(sitemapApi).then(result => {
    sitemap = getSitemapFromBody(result, config)
  })

  const flushRss = () => request.get(rssApi).then(result => {
    rss = getRssBodyFromBody(result, config)
  })

  flushSitemap()
  flushRss()
  schedule.scheduleJob('30 3 * * * ', function () {
    flushRss()
    flushSitemap()
  })
})

function flushHtml () {
  const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
  const i = template.indexOf('<div id=app></div>')

  const style = isProd ? `<style>${inline}</style>`
    : '<link rel=stylesheet href=/dist/styles.css>'
  return {
    head: template.slice(0, i)
      .replace('vue_client_side', config.title)
      .replace('<link rel=stylesheet href=/dist/styles.css>', style),
    tail: template.slice(i + '<div id=app></div>'.length)
  }
}

let app = express()
app.enable('trust proxy')
let renderer
if (isProd) {
  const bundlePath = resolve('./dist/server-bundle.js')
  renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  require('./build/setup-dev-server')(app, bundle => {
    renderer = createRenderer(bundle)
  })
}

function createRenderer (bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

app.use(require('cookie-parser')())

app.use((req, res, next) => {
  log.debug(`${req.method} ${decodeURIComponent(req.url)}`)
  return next()
})

app.use('/dist', express.static(resolve('./dist'), {
  fallthrough: false
}))
app.use('/static', express.static(resolve('./dist/static'), {
  fallthrough: false
}))

app.get('/favicon.ico', (req, res) => res.status(404).end())
app.get('/_.gif', (req, res, next) => sendGoogleAnalytic(req, res, next))
app.get('/robots.txt', (req, res, next) => res.end(robots))
app.get('/rss.xml', (req, res, next) => {
  res.header('Content-Type', 'application/xml')
  return res.end(rss)
})
app.get('/sitemap.xml', (req, res, next) => {
  res.header('Content-Type', 'application/xml')
  return res.end(sitemap)
})

app.get('*', (req, res, next) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  let s = Date.now()
  const context = {
    url: req.url
  }
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true

  res.header('Content-Type', 'text/html; charset=utf-8')

  res.write(html.head)

  renderStream.on('data', chunk => {
    if (firstChunk) {
      if (context.initialState) {
        let siteInfo = context.initialState.siteInfo
        sendGoogleAnalytic(req, res, next, {
          dt: siteInfo.title.value,
          dr: req.url,
          dp: req.url,
          z: Date.now()
        })
        res.write(
          `<script>window.__INITIAL_STATE__=${
          serialize(context.initialState, { isJSON: true })
          }</script>`
        )
      }
      firstChunk = false
    }

    res.write(chunk)
  })

  renderStream.on('end', () => {
    res.end(html.tail)
    log.debug(`whole request: ${Date.now() - s}ms`)
  })

  renderStream.on('error', err => {
    log.error(err)
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  log.debug(`server started at localhost:${port}`)
})
