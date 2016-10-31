<template>
    <nav id=sidebar class=behavior_1>
        <div class=wrap>
            <div class=profile>
                <a href="/"> 
                    <img 
                        :src="siteInfo.logo_url.value" 
                        :alt="siteInfo.title.value">
                </a> 
                <span>{{siteInfo.title.value}}</span>
            </div>
            <ul class="buttons">
                <li>
                    <router-link :to="{name:'main'}" title="首页"> <i class="iconfont icon-home"></i> <span>首页</span></router-link>
                </li>
                <li>
                    <router-link :to="{name:'archive'}" title="归档"> <i class="iconfont icon-archive"></i> <span>归档</span></router-link>
                </li>
                <li>
                    <router-link :to="{name:'tag'}"  title="标签"> <i class="iconfont icon-tags"></i> <span>标签</span></router-link>
                </li>
                <li>
                    <router-link :to="{name:'about'}" title="关于"> <i class="iconfont icon-user"></i> <span>关于</span></router-link>
                </li>
                <!--<li>
                    <a href="/links/" title="友情链接"> <i class="iconfont icon-link"></i> <span>友链</span></a>
                </li>-->
            </ul>
            <ul class="buttons">
                <li>
                    <a class="inline" target=_blank :href="'https://'+siteInfo.github_url.value"><i class="iconfont icon-github-v" title="GitHub"></i></a>
                    <a class="inline" href="/rss.xml"><i class="iconfont icon-rss-v" title="RSS"></i></a>
                    <a class="inline" href="/search"><i class="iconfont icon-search" title="Search"></i></a>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      siteInfo: this.$store.getters.siteInfo
    }
  },
  preFetch (store, { path, params, query }) {
    return store.dispatch('FETCH_OPTIONS')
  },
  beforeMount () {
    if (typeof this.siteInfo.title === 'undefined') {
      this.$store.dispatch('FETCH_OPTIONS').then(() => {
        if (this.siteInfo['title'] && typeof document !== 'undefined') {
          document.title = this.siteInfo['title'].value
        }
      })
    } else {
      document.title = this.siteInfo['title'].value || 'Blog'
    }
  }
}
</script>
 
<style>
    @import '../assets/res/css/all.css';
    @import '../assets/res/css/article.css';
    @import '../assets/res/css/base.css';
    @import '../assets/res/css/comment.css';
    @import '../assets/res/css/footer.css';
    @import '../assets/res/css/header.css';
    @import '../assets/res/css/highlight.css';
    @import '../assets/res/css/icon.css';
    @import '../assets/res/css/pagination.css';
    @import '../assets/res/css/search.css';
    @import '../assets/res/css/sidebar.css';
    @import '../assets/res/css/responsive.css';
</style>