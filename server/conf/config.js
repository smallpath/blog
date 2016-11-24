module.exports = {

    appName: "blog",

    mongoHost: 'localhost',
    mongoDatabase:'blog',
    mongoPort: 27017,

    redisHost: 'localhost',
    redisPort: 6390,

    tokenSecret: 'test',
    tokenExpiresIn: 3600,

    qiniuAccessKey: '',
    qiniuSecretKey: '',
    qiniuBucketName: '',

    defaultAdminName: 'admin',
    defaultAdminPassword: 'admin',

}