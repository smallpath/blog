<template>
    <div id='main'>
        <article class="post page">
            <h1 class=title>{{html.title}}</h1>
            <div class="entry-content" v-html="html.content">
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import api from '../store/api'

export default {
  data () {
    return {
      html: api.fetchPost({ title: '关于', type: 1 }).then(html=>{
          console.log(html.length)
          this.html = html[0];
      })
    }
  },


}
</script>