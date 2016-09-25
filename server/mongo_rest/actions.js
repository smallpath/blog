/**
 * lib - actions
 * @authors luoyjx (yjk99@qq.com)
 * @date    2016-08-29 23:30:32
 */

module.exports = function generateActions(model) {
  return {

    findAll:async function(ctx, next) {
      // next();
      var error, result;
      try {
        var conditions = {};
        var query = ctx.request.query;
        if (query.conditions) {
          conditions = JSON.parse(query.conditions);
        }
        if (query.keys && query.values){
          if (Array.isArray(query.keys) === true){
            query.keys.forEach((value,index)=>{
              if (typeof query.values[index] != 'undefined')
                conditions[value] = query.values[index];
            })
          }else{
            conditions[query.keys] = query.values;
          }
        }
        var builder = model.find(conditions);
        ['limit', 'skip', 'sort', 'count'].forEach(function(key){
          if (query[key]) {
            let arg = query[key];
            if (key == 'limit' || key == 'skip'){
              arg = parseInt(arg);
            }
            if (key == 'sort') {
              arg = { "_id": "desc" };
            }
            if (key != 'count')
              builder[key](arg);
            else
              builder[key]();
          }
        })

        result = await builder.exec();
        return ctx.body = result;
      } catch (_error) {
        error = _error;
        return ctx.body = error;
      }
    },

    findById: async function(ctx, next) {
      // await next;
      var error, result;
      try {
        result = await model.findById(ctx.params.id).exec();

        var query = ctx.request.query;

        let arr = ['prev','next'];
        for(let i=0; i<arr.length; i++){
         let key = arr[i];
          if(query[key]){
            result = await result[key]();
          }
        }

        return ctx.body = result;
      } catch (_error) {
        error = _error;
        return ctx.body = error;
      }
    },

    deleteById: async function(ctx, next) {
      // await next;
      var error, result;
      try {
        result = await model.findByIdAndRemove(ctx.params.id).exec();
        return ctx.body = result;
      } catch (_error) {
        error = _error;
        return ctx.body = error;
      }
    },

    replaceById: async function(ctx, next) {
      // await next;
      var error, newDocument, result;
      try {
        await model.findByIdAndRemove(ctx.params.id).exec();
        newDocument = ctx.request.body;
        newDocument._id = ctx.params.id;
        result = await model.create(newDocument);
        return ctx.body = result;
      } catch (_error) {
        error = _error;
        return ctx.body = error;
      }
    },

    updateById: async function(ctx, next) {
      // await next;
      var error, result;
      try {
        result = await model.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true}).exec();
        return ctx.body = result;
      } catch (_error) {
        error = _error;
        return ctx.body = error;
      }
    },
    
    create: async function(ctx, next) {
      // await next;
      var error, result;
      try {
        result = await model.create(ctx.request.body);
        ctx.status = 201;
        return ctx.body = result;
      } catch (_error) {
        error = _error;
        return ctx.body = error;
      }
    }
  };
};