<template>
  <div>
    <div id="header" :style="{ 
        'background-image': sidebarUrl 
        ? 'url(' + sidebarUrl + ')' : ''
      }">
      <div class="btn-bar"><i></i></div>
      <h1><a :style="{'color': option ? option.sidebarFontColor || '' : ''}" href="/">{{ siteInfo.title.value }}</a></h1>
      <a class=me href="/about">
        <img :src="logoUrl" :alt="siteInfo.title.value">
      </a>
    </div>
    <div id="sidebar-mask"></div>
  </div>
</template>

<script>
import mixin from '../mixin/image'

export default {
  mixins: [mixin]
}
</script>