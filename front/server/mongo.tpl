const {
  mongoHost,
  mongoDatabase,
  mongoPort,
  ssrPort
} = process.env

module.exports = {
  ssrPort: ssrPort || 8080,

  mongoHost: mongoHost || '127.0.0.1',
  mongoDatabase: mongoDatabase || 'blog',
  mongoPort: mongoPort || 27017
}
