const log = require('./utils/log');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaRouter = require('koa-router');

const koa2RestMongoose = require('./mongo_rest/index');
const tokenService = require('./service/token');
const models = require('./model/mongo');
const redis = require('./model/redis');
const config = require('./conf/config');
const { login, logout, permission } = require('./routes/admin');


const app = new Koa();
app.use(bodyParser());

const router = koaRouter();


app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


router.post('/admin/login', login);
router.post('/admin/logout', logout);


Object.keys(models).forEach(value => {
  koa2RestMongoose(app, router, models[value], '/api', permission);
});



(async ()=>{
  let count = await models.user.find().count().exec();
  if (count == 0){

    if (config.defaultAdminPassword === 'admin'){
      log.error('you must change the default passoword at ./conf/config.js');
      log.error('koa2 refused to start because of weak password');
      return;
    }

    let result = await models.user.create({
      name: config.defaultAdminName,
      password: config.defaultAdminPassword,
      displayName: config.defaultAdminName,
      email: '',
    });

    log.info(`account '${result.name}' with passoword '${result.password}' is created`);


    app.listen(3000);

    log.debug(`koa2 is running at 3000`);

  }else{

    app.listen(3000);

    log.debug(`koa2 is running at 3000`);
  }
})();

