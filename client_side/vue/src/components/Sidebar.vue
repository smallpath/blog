<template>
    <nav id=sidebar class=behavior_1>
        <div class=wrap>
            <div class=profile>
                <a href="/"> <img v-bind:src="logoPath" alt="Smallpath的小站"> </a> <span>Smallpath的小站</span></div>
            <ul class=buttons>
                <li>
                    <a href="/" title="首页"> <i class="iconfont icon-home"></i> <span>首页</span></a>
                    <li>
                        <a href="/archives/" title="归档"> <i class="iconfont icon-archive"></i> <span>归档</span></a>
                        <li>
                            <a href="/tags/" title="标签"> <i class="iconfont icon-tags"></i> <span>标签</span></a>
                            <li>
                                <a v-link="{name:'about'}" title="关于"> <i class="iconfont icon-user"></i> <span>关于</span></a>
                                <li>
                                    <a href="/links/" title="友情链接"> <i class="iconfont icon-link"></i> <span>友链</span></a>
            </ul>
            <ul class=buttons>
                <li>
                    <a class=inline target=_blank href="https://github.com/Smallpath"> <i class="iconfont icon-github-v" title=GitHub></i></a>
                    <a class=inline href="/rss.html"> <i class="iconfont icon-rss-v" title=RSS></i></a>
                    <a class=inline href="/search.html"> <i class="iconfont icon-search" title=Search></i></a>
            </ul>
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      siteName: 'Smallpath的小站',  
      prefix: 'https://smallpath.me',
      logoPath: "https://smallpath.me/static/upload/201605/logo.png",
    }
  }
}
</script>

<style>
    @import '../assets/res/css/all.css';
    @import '../assets/res/css/article.css';
    @import '../assets/res/css/comment.css';
    @import '../assets/res/css/footer.css';
    @import '../assets/res/css/header.css';
    @import '../assets/res/css/highlight.css';
    @import '../assets/res/css/pagination.css';
    @import '../assets/res/css/responsive.css';
    @import '../assets/res/css/search.css';
    @import '../assets/res/css/icon.css';
    @import '../assets/res/css/sidebar.css';
</style>