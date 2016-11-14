<template>
    <nav id=sidebar class=behavior_1>
        <div class=wrap>
            <div class=profile>
                <a href="/"> 
                    <img 
                        :src="siteInfo.logo_url.value" 
                        :alt="siteInfo.title.value"
                        id="logo">
                </a> 
                <span>{{siteInfo.title.value}}</span>
            </div>
            <ul class="buttons">
                <li v-for="menu in siteInfo.menu.value">
                    <router-link :to="{ path: menu.url }" :title="menu.label"> <i class="iconfont" :class="'icon-' + menu.option"></i> <span>{{menu.label}}</span></router-link>
                </li>
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
  serverCacheKey: props => {
    return 'static-sidebar'
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
  },
  mounted () {
    let img = document.getElementById('logo')
    img.onerror = ({ target }) => (img.src = target.currentSrc.replace('.webp', '.png'))
  }
}
</script>
 
<style>
    @import '../assets/res/css/icon.css';
    @import '../assets/res/css/article.css';
    @import '../assets/res/css/base.css';
    @import '../assets/res/css/comment.css';
    @import '../assets/res/css/footer.css';
    @import '../assets/res/css/header.css';
    @import '../assets/res/css/highlight.css';
    @import '../assets/res/css/pagination.css';
    @import '../assets/res/css/search.css';
    @import '../assets/res/css/sidebar.css';
    @import '../assets/res/css/responsive.css';
</style>