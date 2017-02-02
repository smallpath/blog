module.exports = {

    appName: "blog",

    mongoHost: '127.0.0.1',
    mongoDatabase:'blog',
    mongoPort: 27017,

    redisHost: '127.0.0.1',
    redisPort: 6379,

    tokenSecret: 'test',
    tokenExpiresIn: 3600,

    defaultAdminName: 'admin',
    defaultAdminPassword: 'admin',

    qiniuAccessKey: '',
    qiniuSecretKey: '',
    qiniuBucketHost: '',
    qiniuBucketName: '',
    qiniuPipeline: ''

}