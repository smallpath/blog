let qiniu = require("qiniu")
let { 
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

    let putPolicy = new qiniu.rs.PutPolicy2(policy(`${qiniuBucketName}:${fileName}`));

    let token = putPolicy.token();

    return token;

}

module.exports = getQiniuTokenFromFileName;