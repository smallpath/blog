<template>
  <footer id="footer" class="inner">
    &copy; 2016&nbsp;-&nbsp; {{ siteInfo.title.value }} &nbsp;-&nbsp;
    <a v-if="!(siteInfo.miitbeian.value)" target=_blank href="https://github.com/smallpath/blog">博客源码</a>
    <a v-else target="_blank" rel="nofollow noopener" 
        href="http://www.miitbeian.gov.cn/"
        style="color: #666"
    >{{ siteInfo.miitbeian.value }}</a>
    <br> Powered by&nbsp;
    <a target=_blank href="https://github.com/vuejs/vue">Vue2</a>
    &nbsp;&amp;&nbsp;
    <a target=_blank href="https://github.com/koajs/koa">Koa2</a>        
  </footer>
</template>

<script>
import { mapGetters } from '../store/vuex'

export default {
  computed: {
    ...mapGetters([
      'siteInfo'
    ])
  }
}
</script>