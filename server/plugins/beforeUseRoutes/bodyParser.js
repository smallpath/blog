const bodyParser = require('koa-bodyparser')

module.exports = class {
  constructor() {}

  async beforeUseRoutes({ app }) {
    app.use(bodyParser())
  }
}
