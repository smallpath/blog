<template>
  <nav id=sidebar class=behavior_1
  :class="{'sidebar-image': sidebarUrl !== ''}"
  :style="imageStyle">
  <div class=wrap>
    <div class=profile>
      <a href="/">
        <img :src="logoUrl"
        :alt="siteInfo.title.value">
      </a>
      <span :style="{ 'color': sidebarUrl ? option.sidebarFontColor : '' }" >{{siteInfo.title.value}}</span>
    </div>
    <ul class="buttons" v-if="option && option.menu">
      <li v-for="menu in option.menu">
        <router-link
        :style="buttonColor"
        :to="{ path: menu.url }" :title="menu.label"> <i class="iconfont" :class="'icon-' + menu.option"></i> <span>{{menu.label}}</span></router-link>
      </li>
    </ul>
    <ul class="buttons" v-if="siteInfo && siteInfo.weiboUrl">
      <li>
        <a class="inline" :style="buttonColor" v-if="siteInfo.githubUrl.value"
        rel="nofollow" target="_blank" :href="'https://github.com/'+siteInfo.githubUrl.value"><i class="iconfont icon-github-v" title="GitHub"></i></a>
        <a class="inline" :style="buttonColor" v-if="siteInfo.weiboUrl.value"
        rel="nofollow" target="_blank" :href="siteInfo.weiboUrl.value"><i class="iconfont icon-twitter-v" title="Twitter"></i></a>
        <a class="inline" :style="buttonColor" href="/rss.xml"><i class="iconfont icon-rss-v" title="RSS"></i></a>
        <a class="inline" :style="buttonColor"
        v-if="siteInfo.siteUrl.value"
        target=_blank :href="'https://www.google.com/webhp#newwindow=1&safe=strict&q=site:' + siteInfo.siteUrl.value"><i class="iconfont icon-search" title="Search"></i></a>
      </li>
    </ul>
    <div class="search">
      <input type="text" placeholder="搜索 щ(ﾟДﾟщ)" v-model:value="query" @keyup.enter="search">
      <br/>
      <li v-for="result in searchResult">
        <a :href="result.pathName">{{result.title}}</a>
      </li>
    </div>
  </div>
</nav>
</template>

<script>
import mixin from '../mixin/image'
import algoliasearch from 'algoliasearch'
function fetchInfo(store, { path, params, query }) {
  return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN')])
}

export default {
  metaInfo() {
    const {
      title: { value: title },
      description: { value: description },
      keywords: { value: keywords },
      logoUrl: { value: logoUrl },
      faviconUrl: { value: favicon }
    } = this.siteInfo
    return {
      title,
      titleTemplate: `%s - ${title}`,
      meta: [
        { name: 'charset', content: 'UTF-8' },
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
      ],
      link: [
        { rel: 'icon', href: favicon },
        { rel: 'apple-touch-icon', href: logoUrl },
        { rel: 'alternate', type: 'application/rss+xml', title: 'RSS 2.0', href: '/rss.xml' }
      ]
    }
  },
  mixins: [mixin],
  preFetch: fetchInfo,
  computed: {
    buttonColor() {
      return { 'color': this.sidebarUrl ? this.option.sidebarFontColor : '' }
    },
    imageStyle() {
      const sidebarUrl = this.sidebarUrl
      const sidebarMoveCss = sidebarUrl ? this.option.sidebarMoveCss : ''
      const result = {
        'background-image': sidebarUrl ? 'url(' + sidebarUrl + ')' : '',
        'transition': sidebarMoveCss
      }
      return result
    }
  },
  data(){
    return{
      query:'',
      searchResult:[]
    }
  },
  methods:{
    search:function()
    {
      // algolia 官方获取 有路径才可以正常访问.
      var client = algoliasearch('key', 'apikey')
      var index = client.initIndex('blog')
      var tmp=[]
      var self = this
      index.search(this.query,function(err, content) {
        content.hits.forEach(function(e,index){
          tmp.push(e)
        },this)
        self.searchResult=JSON.parse(JSON.stringify(tmp))
      });
    }
  }
}
</script>

<style>
@import '../assets/css/icon.css';
@import '../assets/css/article.css';
@import '../assets/css/base.css';
@import '../assets/css/footer.css';
@import '../assets/css/header.css';
@import '../assets/css/highlight.css';
@import '../assets/css/pagination.css';
@import '../assets/css/sidebar.css';
@import '../assets/css/responsive.css';

.sidebar-image {
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
}

.sidebar-image:hover {
  background-position: right center;
}
.search {
  padding-left: 25px;
}
.search input {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  display: block;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: none;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: auto;
}
</style>
