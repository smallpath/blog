module.exports = (router, modelName, actions, prefix, {
  beforeRestfulRoutes,
  afterRestfulRoutes
}) => {
  const modelUrl = `${prefix}/${modelName}`
  const itemUrl = `${prefix}/${modelName}/:id`

  router.get(modelUrl, ...beforeRestfulRoutes, actions.findAll, ...afterRestfulRoutes)
  router.get(itemUrl, ...beforeRestfulRoutes, actions.findById, ...afterRestfulRoutes)
  router.post(modelUrl, ...beforeRestfulRoutes, actions.create, ...afterRestfulRoutes)
  router.post(itemUrl, ...beforeRestfulRoutes, actions.updateById, ...afterRestfulRoutes)
  router.del(itemUrl, ...beforeRestfulRoutes, actions.deleteById, ...afterRestfulRoutes)
  router.put(modelUrl, ...beforeRestfulRoutes, actions.create, ...afterRestfulRoutes)
  router.put(itemUrl, ...beforeRestfulRoutes, actions.replaceById, ...afterRestfulRoutes)
  router.patch(itemUrl, ...beforeRestfulRoutes, actions.updateById, ...afterRestfulRoutes)
}
