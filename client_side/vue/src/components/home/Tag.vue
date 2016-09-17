<template>
    <div id='main'>
        <article class="post tags">
            <h1 class=title>{{title}}</h1>
            <div class="entry-content">
                <section> 
                    <a v-for="item in items" href="/tags/{{item.name}}" data-tag="{{ item.name }}">{{item.name}}(0)</a> 
                </section>
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../../store/index'

export default {
  data () {
    return {
      title: "标签",
      items: [],
    }
  },
  ready () {
      store.fetchTags(this).then(items=>{
            this.items = items
        });
  }

}
</script>