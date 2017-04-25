const log = require('../../utils/log')

module.exports = module.exports = class {
  async beforeUseRoutes({ app, redis }) {
    app.use(async (ctx, next) => {
      const start = new Date()
      await next()
      const ms = new Date() - start
      log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`)
    })
  }
}
