const redis = require('../../model/redis')
const tokenService = require('../../service/token')

module.exports = class {
  async mountingRoute() {
    return {
      method: 'post',
      path: '/admin/logout',
      middleware: [middleware]
    }
  }
}

async function middleware(ctx, next) {
  const headers = ctx.request.headers
  let token
  try {
    token = headers['authorization']
  } catch (err) {
    return ctx.body = {
      status: 'fail',
      description: err
    }
  }

  if (!token) {
    return ctx.body = {
      status: 'fail',
      description: 'Token not found'
    }
  }

  const result = tokenService.verifyToken(token)

  if (result === false) {
    return ctx.body = {
      status: 'fail',
      description: 'Token verify failed'
    }
  } else {
    await redis.del('token')
    return ctx.body = {
      status: 'success',
      description: 'Token deleted'
    }
  }
}
