global.Promise = require('bluebird')

const log = require('./utils/log')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaRouter = require('koa-router')
const mongoRest = require('./mongoRest')
const models = require('./model/mongo')
const config = require('./conf/config')
const plugins = require('./plugins')

const app = new Koa()
const router = koaRouter()
app.use(bodyParser())

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`)
})

app.use(require('restc').koa2())

router.post('/admin/qiniu', ...plugins.beforeRestful, require('./service/qiniu'))
router.post('/admin/login', require('./auth/login'))
router.post('/admin/logout', require('./auth/logout'))

Object.keys(models).map(name => models[name]).forEach(model => {
  mongoRest(router, model, '/api', ...plugins.beforeRestful)
})

app.use(router.routes())

;(async () => {
  for (const middleware of plugins.beforeServerStart) {
    try {
      await middleware()
    } catch (err) {
      log.error(err)
    }
  }

  app.listen(config.serverPort)
  log.debug(`koa2 is running at ${config.serverPort}`)
})()
