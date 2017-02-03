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
          <img :src="option.logoUrl" 
            :alt="siteInfo.title.value">
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
          <a class="inline" :style="{'color': option.sidebarFontColor || ''}" 
            v-if="siteInfo.githubUrl.value"
            rel="nofollow" target="_blank" :href="'https://github.com/'+siteInfo.githubUrl.value"><i class="iconfont icon-github-v" title="GitHub"></i></a>
          <a class="inline" :style="{'color': option.sidebarFontColor || ''}" 
            v-if="siteInfo.weiboUrl.value" 
            rel="nofollow" target="_blank" :href="siteInfo.weiboUrl.value"><i class="iconfont icon-twitter-v" title="Twitter"></i></a>
          <a class="inline" :style="{'color': option.sidebarFontColor || ''}" href="/rss.xml"><i class="iconfont icon-rss-v" title="RSS"></i></a>
          <a class="inline" :style="{'color': option.sidebarFontColor || ''}" 
            v-if="siteInfo.siteUrl.value"
            target=_blank :href="'https://www.google.com/webhp#newwindow=1&safe=strict&q=site:' + siteInfo.siteUrl.value"><i class="iconfont icon-search" title="Search"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  metaInfo () {
    const {
      title: { value: title },
      description: { value: description },
      keywords: { value: keywords },
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
        { ref: 'icon', href: favicon },
        { ref: 'alternate', type: 'application/rss+xml', title: 'RSS 2.0', href: '/rss.xml' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'option',
      'siteInfo'
    ])
  },
  preFetch (store, { path, params, query }) {
    return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN')])
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
</style>