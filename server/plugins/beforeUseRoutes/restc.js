const restc = require('restc')

module.exports = class {
  async beforeUseRoutes({ app }) {
    app.use(restc.koa2())
  }
}

