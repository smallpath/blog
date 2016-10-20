<template>
  <div>
    <div id="header">
      <div class="btn-bar"><i></i></div>
      <h1><a href="/">{{ siteInfo.title.value }}</a></h1>
      <a class=me href="/about/"><img :src="siteInfo.logo_url.value" :alt="siteInfo.title.value"></a>
    </div>
    <div id="sidebar-mask"></div>
  </div>
</template>

<script>
/* eslint-disable */
import store from '../store/api';

export default {
  data () {
    const isInitialRender = !this.$root._isMounted
    return {
        siteInfo: this.$store.getters.siteInfo
    }
  },

}
</script>