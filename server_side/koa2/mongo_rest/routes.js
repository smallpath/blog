

module.exports = function generateRoutes(app, router, modelName, actions, prefix, permission) {

  if (modelName != 'user') {

    router.get(prefix + ("/" + modelName), actions.findAll);
    router.get(prefix + ("/" + modelName + "/:id"), actions.findById);

  } else {

    router.get(prefix + ("/" + modelName), permission, actions.findAll);
    router.get(prefix + ("/" + modelName + "/:id"), permission, actions.findById);
    
  }

  router.post(prefix + ("/" + modelName), permission, actions.create);
  router.post(prefix + ("/" + modelName + "/:id"), permission, actions.updateById);
  router.del(prefix + ("/" + modelName + "/:id"), permission, actions.deleteById);
  router.put(prefix + ("/" + modelName), permission, actions.create);
  router.put(prefix + ("/" + modelName + "/:id"), permission, actions.replaceById);
  router.patch(prefix + ("/" + modelName + "/:id"), permission, actions.updateById);

  app.use(router.routes());
}