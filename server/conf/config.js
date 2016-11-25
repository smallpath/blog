module.exports = {

    appName: "blog",

    mongoHost: 'localhost',
    mongoDatabase:'blog',
    mongoPort: 27017,

    redisHost: 'localhost',
    redisPort: 6390,

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