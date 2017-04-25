const qiniu = require('qiniu')

const fops = 'imageMogr2/format/webp'

const policy = (name, fileName, { qiniuBucketName, qiniuPipeline }) => {
  let encoded = new Buffer(`${qiniuBucketName}:webp/${fileName}`).toString('base64')
  const persist = {}
  if (qiniuPipeline !== '') {
    persist.persistentOps = `${fops}|saveas/${encoded}`
    persist.persistentPipeline = qiniuPipeline
  }
  return Object.assign({}, persist, {
    scope: name,
    deadline: new Date().getTime() + 600
  })
}

const getQiniuTokenFromFileName = (fileName, {
  qiniuBucketName,
  qiniuPipeline,
  qiniuBucketHost
}) => {
  const key = `${qiniuBucketName}:${fileName}`
  const putPolicy = new qiniu.rs.PutPolicy2(policy(key, fileName, {
    qiniuPipeline,
    qiniuBucketName
  }))

  const upToken = putPolicy.token()

  return {
    upToken,
    key,
    bucketHost: qiniuBucketHost,
    supportWebp: qiniuPipeline !== ''
  }
}

module.exports = class {
  constructor(options) {
    this.options = options
    qiniu.conf.ACCESS_KEY = this.options.qiniuAccessKey
    qiniu.conf.SECRET_KEY = this.options.qiniuSecretKey
  }

  async mountingRoute() {
    return {
      method: 'post',
      path: '/admin/qiniu',
      needBeforeRoutes: true,
      middleware: [
        function({ request, response }, next) {
          return response.body = getQiniuTokenFromFileName({
            key: request.body.key,
            options: this.options
          })
        }
      ],
      needAfterRoutes: false
    }
  }
}
