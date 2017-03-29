const env = process.env

module.exports = {
  ssrPort: env.ssrPort || 8080,

  mongoHost: env.mongoHost || '127.0.0.1',
  mongoDatabase: env.mongoDatabase || 'blog',
  mongoPort: env.mongoPort || 27017,

  isRpc: env.isRpc || false,
  redisHost: env.redisHost || '127.0.0.1',
  redisPort: env.redisPort || 6379,
  redisPassword: env.redisPassword || '',
}
