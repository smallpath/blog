<template>
    <div id='main'>
        <article class="post page">
            {{{ html }}}
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
      html: store.fetchAbout(this).then(html=>{
          this.html = html;
      })
    }
  },


}
</script>