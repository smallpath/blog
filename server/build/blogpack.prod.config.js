const blogpack = require('../blogpack')
const base = require('./blogpack.base.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'
const serverStartPrefix = '../plugins/beforeServerStart'
const env = process.env

const config = Object.assign({}, base, {
  plugins: base.plugins.concat([
    new blogpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
      'process.BROWSER': true
    })
  ])
})

const RatelimitPlugin = require(`${useRoutesPrefix}/ratelimit`)
const BodyParserPlugin = require(`${useRoutesPrefix}/bodyParser`)
const LogTimePlugin = require(`${useRoutesPrefix}/logTime`)
const RestcPlugin = require(`${useRoutesPrefix}/restc`)

const InitOptionPlugin = require(`${serverStartPrefix}/initOption`)
const InstallThemePlugin = require(`${serverStartPrefix}/installTheme`)
const InitUserPlugin = require(`${serverStartPrefix}/initUser`)

const CheckAuthPlugin = require('../plugins/beforeRestful/checkAuth')

const QiniuUploadPlugin = require('../plugins/mountingRoute/qiniu')
const LoginPlugin = require('../plugins/mountingRoute/login')
const LogoutPlugin = require('../plugins/mountingRoute/logout')

config.plugins.push(
  // beforeUseRoutes
  new RatelimitPlugin({
    duration: 1000,
    errorMessage: 'Slow Down Your Request.',
    id: ctx => ctx.ip,
    max: 10
  }),
  new BodyParserPlugin(),
  new LogTimePlugin(),
  new RestcPlugin(),

  // beforeRestful
  new CheckAuthPlugin(),

  // moutingRoute
  new QiniuUploadPlugin({
    qiniuAccessKey: env.qiniuAccessKey || '',
    qiniuSecretKey: env.qiniuSecretKey || '',
    qiniuBucketHost: env.qiniuBucketHost || '',
    qiniuBucketName: env.qiniuBucketName || '',
    qiniuPipeline: env.qiniuPipeline || ''
  }),
  new LoginPlugin(),
  new LogoutPlugin(),

  // beforeServerStart
  new InitUserPlugin(),
  new InstallThemePlugin(),
  new InitOptionPlugin()
)

module.exports = config
