/**
 * lib - routes
 * @authors luoyjx (yjk99@qq.com)
 * @date    2016-08-29 23:24:16
 */

var bodyParser = require('koa-bodyparser');

module.exports = function generateRoutes(app, router, modelName, actions, prefix) {
  if ( prefix == null ) {
    prefix = '';
  }

  app.use(bodyParser());

  router.get(prefix + ("/" + modelName), actions.findAll);
  router.get(prefix + ("/" + modelName + "/:id"), actions.findById);
  router.post(prefix + ("/" + modelName), actions.create);
  router.post(prefix + ("/" + modelName + "/:id"), actions.updateById);
  router.del(prefix + ("/" + modelName + "/:id"), actions.deleteById);
  router.put(prefix + ("/" + modelName), actions.create);
  router.put(prefix + ("/" + modelName + "/:id"), actions.replaceById);
  router.patch(prefix + ("/" + modelName + "/:id"), actions.updateById);

  app.use(router.routes());
}