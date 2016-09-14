/**
 * lib - index.js
 * @authors luoyjx (yjk99@qq.com)
 * @date    2016-08-29 22:36:20
 */

var generateRoutes = require('./routes');
var generateActions = require('./actions');

module.exports = function generateRest(app, router, model, prefix) {
  var actions = generateActions(model);
  if (prefix == null) prefix = '';

  generateRoutes(app, router, model.modelName, actions, prefix);
};