global.Promise = require('bluebird')

const log = require('./utils/log')
const Koa = require('koa')
const koaRouter = require('koa-router')
const mongoRest = require('./mongoRest')
const models = require('./model/mongo')
const redis = require('./model/redis')
const config = require('./conf/config')

const devConfig = require('./build/blogpack.prod.config')
const Blogpack = require('./blogpack')
const lifecycle = new Blogpack(devConfig)

const app = new Koa()
const router = koaRouter()

;(async () => {
  await lifecycle.beforeUseRoutes({
    config: lifecycle.config,
    app,
    router,
    models,
    redis
  })

  const beforeRestfulRoutes = lifecycle.getBeforeRestfulRoutes()
  const afterRestfulRoutes = lifecycle.getAfterRestfulRoutes()

  router.post(
    '/admin/qiniu',
    ...beforeRestfulRoutes,
    require('./service/qiniu'),
    ...afterRestfulRoutes
  )
  router.post('/admin/login', require('./auth/login'))
  router.post('/admin/logout', require('./auth/logout'))

  Object.keys(models).map(name => models[name]).forEach(model => {
    mongoRest(router, model, '/api', {
      beforeRestfulRoutes,
      afterRestfulRoutes
    })
  })

  app.use(router.routes())

  const beforeServerStartArr = lifecycle.getBeforeServerStartFuncs()

  try {
    for (const middleware of beforeServerStartArr) {
      await middleware()
    }

    app.listen(config.serverPort, () => {
      log.debug(`koa2 is running at ${config.serverPort}`)
    })
  } catch (err) {
    log.error(err)
  }
})()
