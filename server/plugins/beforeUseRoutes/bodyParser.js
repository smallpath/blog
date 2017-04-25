const bodyParser = require('koa-bodyparser')

module.exports = class {
  async beforeUseRoutes({ app }) {
    app.use(bodyParser())
  }
}
