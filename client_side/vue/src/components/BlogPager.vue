<template>
    <div id='main'>
        <section id="page-index">
            <li v-for="item in items">
                {{item.title}}
            </li>
            <!--<template v-for="item in items">
                <blog-summary :article={item} ></blog-summary>
            <template>-->
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
