const log = require('./utils/log');
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

require('./model/mongo');

app.listen(3000);

log.debug(`koa2 is running at 3000`);