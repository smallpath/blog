process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')
const robots = require('./server/robots.js')
const request = require('superagent')
const { api: sitemapApi, getSitemapFromBody } = require('./server/sitemap.js')
const { api: rssApi, getRssBodyFromBody } = require('./server/rss.js')
const { title } = require('./server/config')
const schedule = require('node-schedule')

let sitemap = ''
request.get(sitemapApi).then(result => {
  sitemap = getSitemapFromBody(result)
})

schedule.scheduleJob('30 3 * * * ', function () {
  request.get(sitemapApi).then(result => {
    sitemap = getSitemapFromBody(result)
  })
})

let rss = ''
request.get(rssApi).then(result => {
  rss = getRssBodyFromBody(result)
})

schedule.scheduleJob('30 3 * * * ', function () {
  request.get(rssApi).then(result => {
    rss = getRssBodyFromBody(result)
  })
})

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const app = express()

const html = (() => {
  const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
  const i = template.indexOf('<div id=app></div>')

  const style = isProd ? '<link rel=stylesheet href=/dist/styles.css>'
    : '<link rel=stylesheet href=/dist/styles.css>'
  return {
    head: template.slice(0, i)
      .replace('vue_client_side', title)
      .replace('<link rel=stylesheet href=/dist/styles.css>', style),
    tail: template.slice(i + '<div id=app></div>'.length)
  }
})()

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

app.use('/dist', express.static(resolve('./dist'), {
  fallthrough: false
}))
app.use('/static', express.static(resolve('./dist/static'), {
  fallthrough: false
}))
app.use(favicon(resolve('./src/assets/logo.png')))

app.use(bodyParser.json())

app.get('/robots.txt', (req, res) => {
  res.end(robots)
})

app.get('/rss.xml', (req, res) => {
  res.header('Content-Type', 'application/xml')
  res.end(rss)
})

app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml')
  res.end(sitemap)
})

!isProd && app.use((req, res, next) => {
  console.log(`${req.method} ${decodeURIComponent(req.url)}`)
  return next()
})

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  let s = Date.now()
  const context = {
    path: req.path,
    query: req.query,
    params: req.params,
    url: req.url
  }
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true

  res.header('Content-Type', 'text/html; charset=utf-8')

  res.write(html.head)

  renderStream.on('data', chunk => {
    if (firstChunk) {
      // embed initial store state
      if (context.initialState) {
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
    if (context.initialState && context.initialState.siteInfo) {
      let analyzeCode = context.initialState.siteInfo.analyze_code
      if (analyzeCode && analyzeCode.value !== '') {
        let endStr = html.tail.replace('client-bundle.js></script>',
          'client-bundle.js></script><script async src=\'https://www.google-analytics.com/analytics.js\'></script>')
        res.end(endStr)
        !isProd && console.log(`whole request: ${Date.now() - s}ms`)
        !isProd && console.log('---------------')
        return
      }
    }
    res.end(html.tail)
    !isProd && console.log(`whole request: ${Date.now() - s}ms`)
    !isProd && console.log('---------------')
  })

  renderStream.on('error', err => {
    console.log(err)
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
