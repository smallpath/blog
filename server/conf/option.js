module.exports = [
    {
        "key": "analyze_code",
        "value": "",
        "desc": "统计代码，可以添加百度统计、Google 统计等"
    },
    {
        "key": "comment",
        "value": {
            "type": "disqus",
            "name": ""
        },
        "desc": "评论类型"
    },
    {
        "key": "menu",
        "value": [{
            "label": "首页",
            "url": "/",
            "option": "home"
        },{
            "label": "归档",
            "url": "/archive",
            "option": "archive"
        },{
            "label": "标签",
            "url": "/tag",
            "option": "tags"
        },{
            "label": "关于",
            "url": "/about",
            "option": "user"
        },{
            "label": "友链",
            "url": "/link",
            "option": "link"
        }],
        "desc": "导航菜单"
    },
    {
        "key": "description",
        "value": "",
        "desc": "网站描述"
    },
    {
        "key": "favicon_url",
        "value": "/static/favicon.ico",
        "desc": "favicon"
    },
    {
        "key": "github_blog",
        "value": "",
        "desc": "GitHub blog 地址，如果填了则同步到 GitHub 上"
    },
    {
        "key": "github_url",
        "value": "",
        "desc": "GitHub 地址"
    },
    {
        "key": "image_upload",
        "value": "",
        "desc": "图片存放的位置，默认存在放网站上。也可以选择放在七牛或者又拍云等地方"
    },
    {
        "key": "keywords",
        "value": "",
        "desc": "网站关键字"
    },
    {
        "key": "logo_url",
        "value": "/static/logo.png",
        "desc": "logo 地址"
    },
    {
        "key": "miitbeian",
        "value": "",
        "desc": "网站备案号"
    },
    {
        "key": "num_per_page",
        "value": "",
        "desc": "文章一页显示的条数"
    },
    {
        "key": "password_salt",
        "value": "t5xUOyQK2G!@#$%^&*",
        "desc": "密码 salt，网站安装的时候随机生成一个"
    },
    {
        "key": "site_url",
        "value": "",
        "desc": "网站地址"
    },
    {
        "key": "theme",
        "value": "blog",
        "desc": "主题名称"
    },
    {
        "key": "title",
        "value": "",
        "desc": "网站标题"
    },
    {
        "key": "twitter_url",
        "value": "",
        "desc": "微博地址"
    },
    {
        "key": "two_factor_auth",
        "value": "",
        "desc": "是否开启二步验证"
    }
]