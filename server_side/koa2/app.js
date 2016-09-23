const log = require('./utils/log');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaRouter = require('koa-router');

const koa2RestMongoose = require('./mongo_rest/index');
const tokenService = require('./service/token');
const models = require('./model/mongo');
const redis = require('./model/redis');
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
})

app.listen(3000);

log.debug(`koa2 is running at 3000`);