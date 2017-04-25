const ratelimit = require('koa-ratelimit')

module.exports = class {
  constructor() {}

  async beforeUseRoutes({ app, redis }) {
    app.use(ratelimit({
      db: redis,
      duration: 1000,
      errorMessage: 'Slow Down Your Request.',
      id: ctx => ctx.ip,
      max: 10
    }))
  }
}
