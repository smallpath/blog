const log = require('./utils/log');
const Koa = require('koa');

const app = new Koa();


let router = require('koa-router')();

var bodyParser = require('koa-bodyparser');

app.use(bodyParser());

const koa2RestMongoose = require('./mongo_rest/index');

let models = require('./model/mongo');

const tokenService = require('./service/token');

let redis = require('./model/redis');

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});



const { login, logout } = require('./routes/admin');
router.post('/admin/login', login);
router.post('/admin/logout', logout);


let permission = async function (next) {

  const headers = this.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return this.body = err;
  }

  if (!token) {
    return this.body = 'Token not found';
  }

  const result = tokenService.verifyToken(token);

  if (result == false) {
    return this.body = 'Token verify failed ';
  }


  let reply = await redis.getAsync("token");


  if (reply === token) {
    await next;
    return;
  } else {
    console.log(reply, token);
    return this.body = 'token invalid';
  }

}


Object.keys(models).forEach(value => {
  koa2RestMongoose(app, router, models[value], '/api', permission);
})

app.listen(3000);

log.debug(`koa2 is running at 3000`);