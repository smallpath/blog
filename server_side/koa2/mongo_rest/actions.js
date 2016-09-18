/**
 * lib - actions
 * @authors luoyjx (yjk99@qq.com)
 * @date    2016-08-29 23:30:32
 */

module.exports = function generateActions(model) {
  return {

    findAll:async function(next) {
      await next;
      var error, result;
      try {
        var conditions = {};
        var query = this.request.query;
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
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },

    findById: async function(next) {
      await next;
      var error, result;
      try {
        result = await model.findById(this.params.id).exec();

        var query = this.request.query;

        let arr = ['prev','next'];
        for(let i=0; i<arr.length; i++){
         let key = arr[i];
          if(query[key]){
            result = await result[key]();
          }
        }

        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },

    deleteById: async function(next) {
      await next;
      var error, result;
      try {
        result = await model.findByIdAndRemove(this.params.id).exec();
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },

    replaceById: async function(next) {
      await next;
      var error, newDocument, result;
      try {
        await model.findByIdAndRemove(this.params.id).exec();
        newDocument = this.request.body;
        newDocument._id = this.params.id;
        result = await model.create(newDocument);
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },

    updateById: async function(next) {
      await next;
      var error, result;
      try {
        result = await model.findByIdAndUpdate(this.params.id, this.request.body, {new: true}).exec();
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },
    
    create: async function(next) {
      await next;
      var error, result;
      try {
        result = await model.create(this.request.body);
        this.status = 201;
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    }
  };
};