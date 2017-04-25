
const generateRoutes = require('./routes')
const generateActions = require('./actions')

module.exports = (router, model, prefix, middlewares) => {
  const actions = generateActions(model)

  generateRoutes(
    router,
    model.modelName,
    actions,
    prefix,
    middlewares
  )
}
