const restc = require('restc')

module.exports = class {
  constructor() {}

  async beforeUseRoutes({ app }) {
    app.use(restc.koa2())
  }
}

