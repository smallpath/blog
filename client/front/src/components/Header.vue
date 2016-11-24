<template>
  <div>
    <div id="header">
      <div class="btn-bar"><i></i></div>
      <h1><a href="/">{{ siteInfo.title.value }}</a></h1>
      <a class=me href="/about"><img :src="siteInfo.logoUrl.value" :alt="siteInfo.title.value"></a>
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
  serverCacheKey: props => {
    return 'static-header'
  }
}
</script>