<template>
  <div>
    <div id="header" :style="{ 
        'background-image': option.sidebarImageUrl 
        ? 'url(' + option.sidebarImageUrl + ')' : ''
      }">
      <div class="btn-bar"><i></i></div>
      <h1><a :style="{'color': option.sidebarFontColor || ''}" href="/">{{ siteInfo.title.value }}</a></h1>
      <a class=me href="/about">
        <img :src="siteInfo.logoUrl.value" 
          :alt="siteInfo.title.value">
      </a>
    </div>
    <div id="sidebar-mask"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      siteInfo: this.$store.getters.siteInfo
    }
  },
  computed: {
    option () {
      return this.$store.state.theme.option
    }
  },
  serverCacheKey: props => {
    return 'static-header'
  }
}
</script>