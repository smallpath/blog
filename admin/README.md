# admin

> 博客的后台管理单页

## 开发测试环境

``` bash
npm install
npm run dev
```
开发端口为本机8082


## 生产环境

``` bash
npm install
npm run build
```

用nginx代理构建出来的`dist`文件夹即可, 可以使用如下的模板

```
server{
    listen 80;                                     #如果是https, 则替换80为443
    server_name admin.smallpath.me;                #替换域名
    root /alidata/www/Blog/admin/dist;       #替换路径为构建出来的dist路径
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
