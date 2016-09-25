# Blog
A blog using Koa2, Vue, MongoDB and Redis

# Demo
[https://smallpath.me](https://smallpath.me)

# TODO
- [x] 前台单页开启H5模式
- [x] disqus评论
- [ ] 后台管理单页-图片直传
- [ ] 文章toc
- [ ] 非技术类文章的分类
- [x] 部署文档
- [ ] API文档
- [ ] vue 1.0 => vue 2.0
- [ ] koa2 unstable => koa2 stable 
- [ ] server side rendering

# 构建与部署

## 前置

- Node v6
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