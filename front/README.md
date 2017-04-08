## front

> 博客的前台单页, 支持服务端渲染

复制server文件夹中的默认配置`mongo.tpl`, 并命名为`mongo.js`

``` bash
npm install
# 测试环境
npm run dev
# 默认打包文件在 dist 文件夹内
npm run build
```

命令顺利执行会得到类似以下回显:

```
[2017-04-07 22:09:55.971] [DEBUG] ssr axios - MongoDB is ready
[HPM] Proxy created: /proxyPrefix  ->  http://localhost:3000/
[HPM] Proxy rewrite rule created: "^/proxyPrefix" ~> ""
[2017-04-07 22:09:56.640] [DEBUG] ssr server - server started at localhost:8080
```
不出意外的话访问 http://localhost:8080/ 就可以访问博客页面了

## TIPS

- 如果mongoDB不在本机对应端口，请自行配置`mongo.js`中的属性:

- 请将`logo.png`与`favicon.ico`放至`static`目录中


- 生产环境 nginx 代理本机8080端口模板

```
server{
    listen 80;                                      #如果是https, 则替换80为443
    server_name *.smallpath.me smallpath.me;        #替换域名
    root /alidata/www/Blog/front/dist;       #替换路径为构建出来的dist路径
    set $node_port 3000;
    set $ssr_port 8080;

    location ^~ / {
        proxy_http_version 1.1;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:$ssr_port;
        proxy_redirect off;
    }

    location ^~ /proxyPrefix/ {
        rewrite ^/proxyPrefix/(.*) /$1 break;
        proxy_http_version 1.1;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:$node_port;
        proxy_redirect off;
    }

    location ^~ /dist/ {
        rewrite ^/dist/(.*) /$1 break;
        etag         on;
        expires      max;
    }

    location ^~ /static/ {
        etag         on;
        expires      max;
    }
}
```