# Blog
A blog system. Based on Vue2, Koa2, MongoDB and Redis

前后端分离 + 服务端渲染的博客系统, 前端 SPA + 后端 RESTful 服务器

# Demo
前端：[https://smallpath.me](https://smallpath.me)  
后台管理截图：[https://smallpath.me/post/blog-back-v2](https://smallpath.me/post/blog-back-v2)

Table of Contents
=================

* [TODO](#todo)
* [构建与部署](#构建与部署)
  * [前置](#前置)
  * [server](#server)
  * [front](#front)
  * [admin](#admin)
* [后端RESTful API](#后端restful-api)
  * [说明](#说明)
  * [HTTP动词](#http动词)
  * [权限验证](#权限验证)
      * [获得Token](#获得token)
      * [撤销Token](#撤销token)
      * [Token说明](#token说明)
  * [查询](#查询)
  * [新建](#新建)
  * [替换](#替换)
  * [更新](#更新)
  * [删除](#删除)

# TODO
- [x] 前台单页
  - [x] disqus评论
  - [x] vue1.0升级至vue2.0
  - [x] vuex单向数据流
  - [x] 服务端渲染
  - [x] 客户端谷歌统计 
  - [x] 服务端sitemap定时任务
  - [x] 服务端rss定时任务
  - [x] 组件级缓存
  - [x] Loading组件
  - [x] 侧边栏图片
  - [x] 服务端谷歌统计
  - [x] 全局404页面
  - [x] 文章toc
  - [x] 页面meta
  - [x] 按需分块加载
  - [x] service worker缓存所有资源
  - [x] SSR服务端直连mongo
  - [x] 自制axios以减小打包大小
  - [x] 自制vuex以减小打包大小
  - [x] SSR服务端不可用时进行降级
  - [ ] SSR数据获取增加RPC形式
  - [ ] blogPager增加查看更多链接
  - [ ] footer显示备案号
  - [ ] 修改倒序查询条件
- [x] 后台管理单页
  - [x] vue1.0升级至vue2.0
  - [x] 使用element ui
  - [x] 七牛云图片上传
  - [x] 文章toc的生成与编辑
  - [x] 草稿的自动生成与手动恢复
  - [x] 上传图片后指定img标签的高度以避免闪烁
  - [x] 扫描所有文章，指定img高度
  - [ ] 文章增加标题图片的编辑功能
  - [ ] 修改倒序查询条件
- [x] RESTful服务器
  - [x] RESTful添加select字段过滤
  - [x] 标签及分类移至文章中 
  - [x] 七牛access_token下发及鉴权
  - [x] lint
  - [ ] 配合redis提供RPC服务
  - [ ] RESTful的排序自定义
  - [ ] 按天备份
- [x] 部署文档
- [x] API文档
- [ ] Docker
- [ ] CI

# 运行本项目必备软件

运行本项目代码之前请确保安装以下软件:

- Node.js v6 +
- MongoDB
- Redis
- pm2

本说明以 *macos* 为例

## Node.js

官网下载安装包直接安装

## Mongodb

```bash
# 安装
brew install mongodb
# 启动
mongod -dbpath=your/path
```

## Redis

```bash
# 安装
brew install redies
# 启动
redis-server /usr/local/etc/redis.conf
```

# 构建与部署

本项目服务核心分为三大部分:

1. server : 提供 api 服务,也是博客的核心服务
2. fornt : 前端显示界面,可以自己进行定制
3. admin : 博客管理模块

相关说明请点击对应文件夹或者直接点击 wiki 页面,安装过程中如果遇到困难欢迎去提交 issue.

# Docker 方式体验

```bash
# 克隆项目
git clone https://github.com/Smallpath/Blog.git
# 进入项目目录
cd Blog
# 打包docker 镜像文件
docker build -t blog .
# 运行 镜像
docker run -it --rm -p 3000:3000 -p 8080:8080 blog
```
默认用户名密码 `coucou`

# 后端 RESTful API

## 说明

后端服务器默认开启在 3000 端口, 如不愿意暴露 IP, 可以自行设置 nginx 代理, 或者直接使用前端两个单页的代理前缀`/proxyPrefix`

例如, demo的API根目录如下:

> https://smallpath.me/proxyPrefix/api/:modelName/:id

其中, `:modelName`为模型名, 总计如下6个模型

```
post
theme
tag
category
option
user
```

`:id`为指定的文档ID, 用以对指定文档进行 CRUD

## HTTP 动词

支持如下五种:

``` bash
GET     //查询
POST    //新建
PUT     //替换
PATCH   //更新部分属性
DELETE  //删除指定ID的文档
```

有如下两个规定:

- 对所有请求
  - header中必须将 `Content-Type` 设置为 `application/json` , 需要 `body` 的则 `body` 必须是合法 JSON格式
- 对所有回应
  - header中的`Content-Type`均为`application/json`, 且返回的数据也是 JSON格式

## 权限验证

服务器直接允许对`user`模型外的所有模型的GET请求

`user`表的所有请求, 以及其他表的非 GET 请求, 都必须将 header 中的`authorization`设置为服务器下发的 Token, 服务器验证通过后才会继续执行 CRUD 操作

### 获得 Token
> POST https://smallpath.me/proxyPrefix/admin/login

`body`格式如下:

```
{
	"name": "admin",
	"password": "testpassword"
}
```

成功, 则返回带有`token`字段的 JSON 数据
```
{
  "status": "success",
  "token": "tokenExample"
}
```

失败, 则返回如下格式的 JSON 数据:
```
{
  "status": "fail",
  "description": "Get token failed. Check name and password"
}
```

获取到`token`后, 在上述需要 token 验证的请求中, 请将 header 中的`authorization`设置为服务器下发的 Token, 否则请求将被服务器拒绝

### 撤销 Token
> POST https://smallpath.me/proxyPrefix/admin/logout

将`header`中的`authorization`设置为服务器下发的 token, 即可撤销此 token

### Token说明
Token 默认有效期为获得后的一小时, 超出时间后请重新请求 Token  
如需自定义有效期, 请修改服务端配置文件中的`tokenExpiresIn`字段, 其单位为秒

## 查询 

服务器直接允许对`user`模型外的所有模型的 GET 请求, 不需要验证 Token

为了直接通过 URI 来进行 mongoDB 查询, 后台提供六种关键字的查询:
```
conditions,
select,
count,
sort,
skip,
limit
```

### 条件(conditions)查询
类型为JSON, 被解析为对象后, 直接将其作为`mongoose.find`的查询条件

#### 查询所有文档
> GET https://smallpath.me/proxyPrefix/api/post

#### 查询title字段为'关于'的文档
> GET https://smallpath.me/proxyPrefix/api/post?conditions={"title":"关于"}

#### 查询指定id的文档的上一篇文档
> GET https://smallpath.me/proxyPrefix/api/post/?conditions={"_id":{"$lt":"580b3ff504f59b4cc27845f0"}}&sort=1&limit=1

#### select查询
类型为JSON, 用以拾取每条数据所需要的属性名, 以过滤输出来加快响应速度

#### 查询title字段为'关于'的文档的建立时间和更新时间
> GET https://smallpath.me/proxyPrefix/api/post?conditions={"title":"关于"}&select={"createdAt":1,"updatedAt":1}

### count查询
获得查询结果的数量

#### 查询文档的数量
> GET https://smallpath.me/proxyPrefix/api/post?conditions={"type":0}&count=1

### sort查询
为了查询方便, sort=1代表按时间倒序, 不使用sort则代表按时间正序

#### 查询所有文档并按时间倒序
> GET https://smallpath.me/proxyPrefix/api/post?sort=1

### skip 查询和 limit 查询

#### 查询第2页的文档(每页10条)并按时间倒叙
> GET https://smallpath.me/proxyPrefix/api/post?limit=10&skip=10&sort=1


## 新建

需要验证Token

> POST https://smallpath.me/proxyPrefix/api/:modelName

Body中为用来新建文档的JSON数据

每个模型的具体字段, 可以查看该模型的[Schema定义](https://github.com/smallpath/blog/blob/master/server/model/mongo.js#L24)来获得

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

需要验证 Token

> DELETE https://smallpath.me/proxyPrefix/api/:modelName/:id

删除指定 ID 的文档
