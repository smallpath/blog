<template>
    <nav id=sidebar class=behavior_1 
            :class="{'sidebar-image': option.sidebarImageUrl !== ''}"
            :style="{ 
              'background-image': option.sidebarImageUrl 
              ? 'url(' + option.sidebarImageUrl + ')' : '',
              'transition': option.sidebarImageUrl ? 'background 2s ease-in-out;': ''
            }">
        <div class=wrap>
            <div class=profile>
                <a href="/"> 
                    <img 
                        :src="siteInfo.logoUrl.value" 
                        :alt="siteInfo.title.value"
                        ref="logo">
                </a> 
                <span :style="{ 'color': option.sidebarFontColor || '' }" >{{siteInfo.title.value}}</span>
            </div>
            <ul class="buttons">
                <li v-for="menu in option.menu">
                    <router-link 
                        :style="{ 'color': option.sidebarFontColor || '' }"  
                        :to="{ path: menu.url }" :title="menu.label"> <i class="iconfont" :class="'icon-' + menu.option"></i> <span>{{menu.label}}</span></router-link>
                </li>
            </ul>
            <ul class="buttons">
                <li>
                    <a class="inline" :style="{'color': option.sidebarFontColor || ''}" target=_blank :href="'https://github.com/'+siteInfo.githubUrl.value"><i class="iconfont icon-github-v" title="GitHub"></i></a>
                    <a class="inline" :style="{'color': option.sidebarFontColor || ''}" href="/rss.xml"><i class="iconfont icon-rss-v" title="RSS"></i></a>
                    <a class="inline" :style="{'color': option.sidebarFontColor || ''}" target=_blank :href="'https://www.google.com/webhp#newwindow=1&safe=strict&q=site:' + siteInfo.siteUrl.value"><i class="iconfont icon-search" title="Search"></i></a>
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
  computed: {
    option () {
      return  this.$store.state.theme.option
    }
  },
  preFetch (store, { path, params, query }) {
    return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN')])
  },
  beforeMount () {
    if (typeof this.siteInfo.title === 'undefined') {
      Promise.all([this.$store.dispatch('FETCH_OPTIONS'), this.$store.dispatch('FETCH_FIREKYLIN')])
    }
  },
  mounted () {
    let img = this.$refs.logo
    if (img) img.onerror = ({ target }) => (img.src = target.currentSrc.replace('.webp', '.png'))
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

    .sidebar-image {
      background-position: left center;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: auto;
    }

    .sidebar-image:hover {
      background-position: right center;
    }
</style>