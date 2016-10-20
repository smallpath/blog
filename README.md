# Blog
Not only blog. Based on Vue2, Koa2, MongoDB and Redis

前后端分离的博客系统, 前端SPA + 后端RESTful服务器

# Demo
[https://smallpath.me](https://smallpath.me)

# TODO
- [ ] 前台单页
  - [x] 开启H5模式
  - [x] disqus评论
  - [x] vue1.0升级至vue2.0
  - [x] server side rendering
  - [ ] 使用fetch替换vue-resource (进行中)
  - [ ] 侧边栏图片
- [ ] 后台管理单页
  - [x] 添加升级模型的管理
  - [ ] vue 1.0 => vue 2.0
  - [ ] 使用element ui
  - [ ] 支持schema的增删改查
  - [ ] 七牛云图片上传
- [ ] RESTful服务器
  - [ ] 文章toc
  - [ ] 标签及分类移至文章中
  - [ ] 七牛access_token下发及鉴权
  - [ ] OAuth1升级至OAuth2
- [x] 部署文档
- [ ] server side rendering部署文档
- [x] API文档
- [ ] koa2 unstable => koa2 stable 


# 构建与部署

## 前置

- Node v4
- MongoDB
- Redis

## server

博客的提供RESTful API的后端

修改 conf/config.js:

- `tokenSecret`
    - 改为任意字符串
- `defaultAdminPassword`
    - 默认密码, 必须修改, 否则服务器将拒绝启动

```
npm install
pm2 start entry.js
```
## client/front
博客的前台单页

目前正在开发前台单页的ssr，暂时无法使用最新提交构建，如需部署此单页，请使用这个[commit](https://github.com/Smallpath/Blog/tree/43ec05c6192838d2fe2d96add185ad77d6882db4)的文件

```
npm install
npm run build
```

用nginx代理构建出来的`dist`文件夹即可

>部署前, 必须对nginx进行配置, 请查看本页面上的**Nginx配置**

## client/back
博客的后台管理单页

```
npm install
npm run build
```

用nginx代理构建出来的`dist`文件夹即可

>部署前, 必须对nginx进行配置, 请查看本页面上的**Nginx配置**

## Nginx配置
两个单页都需要配置相应的nginx代理, 可以使用如下的模板

```
server{
    listen 80;                                      #如果是https, 则替换80为443
    server_name *.smallpath.me smallpath.me;        #替换域名
    root /alidata/www/Blog/client/front/dist;       #替换路径为构建出来的dist路径
    set $node_port 3000;

    index index.js index.html index.htm;

    location / {
        try_files $uri $uri/ @rewrites;
    }

    location @rewrites {
        rewrite ^(.*)$ / last;
    }

    location ^~ /proxyPrefix/ {
        rewrite ^/proxyPrefix/(.*) /$1 break;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:$node_port;
        proxy_redirect off;
    }

    location ^~ /static/ {
        etag         on;
        expires      max;
    }
}
```

# 后端RESTful API

## 说明

后端服务器默认开启在3000端口, 如不愿意暴露IP, 可以自行设置nginx代理, 或者直接使用前端两个单页的代理前缀`/proxyPrefix`

例如, demo的API根目录如下:

> https://smallpath.me/proxyPrefix/api/:modelName/:id

其中, `:modelName`为模型名, 总计如下8个模型

```
post
category
option
postCategory
postTag
tag
user
update
```

`:id`为指定的文档ID, 用以对指定文档进行CRUD

## HTTP动词

支持如下五种:

```
GET     //查询
POST    //新建
PUT     //替换
PATCH   //更新部分属性
DELETE  //删除指定ID的文档
```

有如下两个规定:

- 对所有请求
  - header中必须将`Content-Type`设置为`application/json`, 需要`body`的则`body`必须是合法JSON格式
- 对所有回应
  - header中的`Content-Type`均为`application/json`, 且返回的数据也是JSON格式

## 权限验证

服务器直接允许对`user`模型外的所有模型的GET请求

`user`表的所有请求, 以及其他表的非GET请求, 都必须将header中的`authorization`设置为服务器下发的Token, 服务器验证通过后才会继续执行CRUD操作

### 获得Token
> POST https://smallpath.me/proxyPrefix/admin/login

`body`格式如下:

```
{
	"name": "admin",
	"password": "testpassword"
}
```

成功, 则返回带有`token`字段的JSON数据
```
{
  "status": "success",
  "token": "tokenExample"
}
```

失败, 则返回如下格式的JSON数据:
```
{
  "status": "fail",
  "description": "Get token failed. Check name and password"
}
```

获取到`token`后, 在上述需要token验证的请求中, 请将header中的`authorization`设置为服务器下发的Token, 否则请求将被服务器拒绝

### 撤销Token
> POST https://smallpath.me/proxyPrefix/admin/logout

将`header`中的`authorization`设置为服务器下发的token, 即可撤销此token

### Token说明
Token有效期为获得后的一小时, 超出时间后请重新请求Token

## 查询 

服务器直接允许对`user`模型外的所有模型的GET请求, 不需要验证Token

### 查询所有文档
> GET https://smallpath.me/proxyPrefix/api/post

### 查询文档的数量
> GET https://smallpath.me/proxyPrefix/api/post?count=1

### 查询title字段为'关于'的文档
> GET https://smallpath.me/proxyPrefix/api/post?conditions={"title":"关于"}

### 查询所有文档并按时间倒叙
> GET https://smallpath.me/proxyPrefix/api/post?sort=1

### 查询第2页的文档并按时间倒叙
> GET https://smallpath.me/proxyPrefix/api/post?limit=10&skip=10&sort=1

### 查询指定文档的前一篇文档
> GET https://smallpath.me/proxyPrefix/api/post/57e7b31fa73182482918b277?prev=1

### 查询指定文档的后一篇文档
> GET https://smallpath.me/proxyPrefix/api/post/57e7b31fa73182482918b277?next=1

## 新建

需要验证Token

> POST https://smallpath.me/proxyPrefix/api/:modelName

Body中为用来新建文档的JSON数据

每个模型的具体字段, 可以查看该模型的[Schema定义](https://github.com/smallpath/blog/blob/develop/server/model/mongo.js#L24)来获得

## 替换

需要验证Token

> PUT https://smallpath.me/proxyPrefix/api/:modelName/:id

`:id`为查询到的文档的`_id`属性, Body中为用来替换该文档的JSON数据

## 更新

需要验证Token

> PATCH https://smallpath.me/proxyPrefix/api/:modelName/:id

`:id`为查询到的文档的`_id`属性, Body中为用来更新该文档的JSON数据

更新操作请使用`PATCH`而不是`PUT`

## 删除

需要验证Token

> DELETE https://smallpath.me/proxyPrefix/api/:modelName/:id

删除指定ID的文档

## vue-resource说明

vue-resource会将请求的URL进行格式化, 不允许URL中的JSON查询, 比如下面这种:

> GET https://smallpath.me/proxyPrefix/api/post?conditions={"title":"关于"}

在这种情况下, 请使用`keys`和`values`来替代`conditions`查询, 例如:

> GET https://smallpath.me/proxyPrefix/api/post?keys=title&values=关于

或者使用其他XmlHttpRequest封装库

