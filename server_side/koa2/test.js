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
  console.log(`${ ctx.method } ${ ctx.url } - ${ ms }ms`);
});

router.post('/admin/login', async function (ctx, next) {
  let model = models.user;
  var error, result;

  let users, user;

  try {
    users = await model.find({ name: this.request.body.name }).exec();
    console.log(users);
    user = {
      name: users[0].name,
      password: users[0].password
    };

    if (user.password == this.request.body.password) {

      let token = tokenService.createToken(user);

      redis.set("token", token, 'EX', tokenService.expiresIn, () => {});

      console.log(token);

      return this.body = { token: token };
    } else {
      return this.body = 'Get token fails. Check name and password';
    }
  } catch (_error) {
    error = _error;
    return this.body = _error;
  }
});

let verifyToken = async function (next) {

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

  redis.get("token", (err, reply) => {
    if (err) {
      console.log(err);
      return;
    }

    if (reply === token) {
      console.log(typeof next);
      // await next();
      return;
    } else {
      return this.body = 'token invalid';
    }
  });
};

Object.keys(models).forEach(value => {
  koa2RestMongoose(app, router, models[value], '/api', verifyToken);
});

app.listen(3000);

log.debug(`koa2 is running at 3000`);
