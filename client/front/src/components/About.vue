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

function fetchAbout(store){
    return store.dispatch("FETCH_ABOUT", { 
        conditions: { 
            pathName: 'about', 
            type: 1 
        }
    });
}

export default {
  data () {
    return {
      
    }
  },
  computed:{
      html() {
          return this.$store.state.about
      }
  },
  preFetch(store) {
      return fetchAbout(store);
  },
  beforeMount () {
      if (this.$root._isMounted){
         fetchAbout(this.$store)
     }
  },


}
</script>