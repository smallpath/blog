let qiniu = require("qiniu")
let { 
    qiniuBucketHost: bucketHost,
    qiniuAccessKey,
    qiniuSecretKey,
    qiniuBucketName
} = require('../conf/config')

qiniu.conf.ACCESS_KEY = qiniuAccessKey;
qiniu.conf.SECRET_KEY = qiniuSecretKey;

const policy = (name) => {
    return {
        scope: name,
        deadline: new Date().getTime() + 3600,
        insertOnly: 1,
    }
}

const getQiniuTokenFromFileName = (fileName) => {
    let key = `${qiniuBucketName}:${fileName}`
    let putPolicy = new qiniu.rs.PutPolicy2(policy(key));

    let upToken = putPolicy.token();

    return { 
        upToken,
        key,
        bucketHost
    };

}

module.exports = getQiniuTokenFromFileName;