<template>
    <div id='main'>
        <section id="page-index">
            <blog-summary v-for="item in items" :article="item" ></blog-summary>
        </section>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index'

export default {
  data () {
      return {
        items: store.fetchBlogByPage(this,0).then(items=>this.items=items)
      }
    }
}
</script>
