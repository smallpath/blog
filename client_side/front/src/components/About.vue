<template>
    <div id='main'>
        <article class="post page">
            <h1 class=title>{{html.title}}</h1>
            <div class="entry-content">
                {{{ html.content }}}
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index'

export default {
  data () {
    return {
      html: store.fetchPage(this,{ title: '关于' }).then(html=>{
          this.html = html[0];
      })
    }
  },


}
</script>