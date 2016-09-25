<template> 
  <div id="header">
    <div class="btn-bar"><i></i></div>
    <h1><a href="/">Smallpath的小站</a></h1>
    <a class=me href="/about/"><img :src="siteInfo.logo_url.value" :alt="siteInfo.title"></a>
  </div>
  <div id="sidebar-mask"></div>
</template>

<script>
/* eslint-disable */
import store from '../store/index';

export default {
  data () {
    return {
        siteInfo: {},
    }
  },
  ready (){
    store.fetchOption(this).then(result=>{
      let obj = {};
      result.forEach(value=>{
          obj[value.key] = value;
      });
      this.siteInfo = obj;

      if(this.siteInfo['title']){
          document.title = this.siteInfo['title'].value;
      }

      if(this.siteInfo['comment']){
          let value = JSON.parse(this.siteInfo['comment'].value);
          let type = value.type, name = value.name;
      }
    })
  }

}
</script>