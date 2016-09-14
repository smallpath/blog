const log = require('./utils/log');
const Koa = require('koa');

const app = new Koa();
let router = require('koa-router')();

const koa2RestMongoose = require('./mongo_rest/index');

let models = require('./model/mongo');

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

Object.keys(models).forEach(value=>{
  if(value != 'db'){
    koa2RestMongoose(app, router, models[value],'/api');
  }
})

app.listen(3000);

log.debug(`koa2 is running at 3000`);