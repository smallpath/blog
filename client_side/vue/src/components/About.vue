<template>
    <div id='main'>
        {{{ html }}}
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