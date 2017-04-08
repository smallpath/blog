# server

> 博客的提供RESTful API的后端

## 设置配置文件

复制conf文件夹中的默认配置`config.tpl`, 并命名为`config.js`

有如下属性可以自行配置:

- `tokenSecret`
  - 改为任意字符串
- `defaultAdminPassword`
  - 默认密码, 必须修改, 否则服务器将拒绝启动

如果mongoDB或redis不在本机对应端口，可以修改对应的属性
- `mongoHost`
- `mongoDatabase`
- `mongoPort`
- `redisHost`
- `redisPort`

如果需要启用后台管理单页的七牛图片上传功能，请再修改如下属性:
- `qiniuAccessKey`
  - 七牛账号的公钥
- `qiniuSecretKey`
  - 七牛账号的私钥
- `qiniuBucketHost`
  - 七牛Bucket对应的外链域名
- `qiniuBucketName`
  - 七牛Bucket的名称
- `qiniuPipeline`
  - 七牛多媒体处理队列的名称

## 运行

```bash
npm install
npm start
```

RESTful 服务器在本机3000端口开启