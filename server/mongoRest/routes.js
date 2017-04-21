module.exports = (router, modelName, actions, prefix, ...permission) => {
  const modelUrl = `${prefix}/${modelName}`
  const itemUrl = `${prefix}/${modelName}/:id`

  router.get(modelUrl, ...permission, actions.findAll)
  router.get(itemUrl, ...permission, actions.findById)
  router.post(modelUrl, ...permission, actions.create)
  router.post(itemUrl, ...permission, actions.updateById)
  router.del(itemUrl, ...permission, actions.deleteById)
  router.put(modelUrl, ...permission, actions.create)
  router.put(itemUrl, ...permission, actions.replaceById)
  router.patch(itemUrl, ...permission, actions.updateById)
}
