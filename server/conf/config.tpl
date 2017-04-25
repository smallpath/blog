const env = process.env

module.exports = {
  serverPort: env.serverPort || 3000,

  mongoHost: env.mongoHost || '127.0.0.1',
  mongoDatabase: env.mongoDatabase || 'blog',
  mongoPort: env.mongoPort || 27017,

  redisHost: env.redisHost || '127.0.0.1',
  redisPort: env.redisPort || 6379,
  redisPassword: env.redisPassword || '',

  tokenSecret: env.tokenSecret || 'test',
  tokenExpiresIn: env.tokenExpiresIn || 3600,

  defaultAdminName: env.defaultAdminName || 'admin',
  defaultAdminPassword: env.defaultAdminPassword || 'admin'
}
