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
import store from '../store/index';

export default {
  data () {
    return {
        siteInfo: {
          logo_url: {
            value: '',
          },
          title: {
            value: '',
          }
        },
    }
  },
  mounted (){
    store.fetchOption().then(result=>{
      let obj = {};
      result.forEach(value=>{
          obj[value.key] = value;
      });
      this.siteInfo = obj;

    })
  }

}
</script>