<template>
    <div id='main'>
        <article class="post tags">
            <h1 class=title>{{title}}</h1>
            <div class="entry-content">
                <section> 
                    <router-link v-for="(item, key, index) in items" 
                        :to="{ name: 'tagPager', params:{ tagName: key } }"
                        :data-tag="key">{{key}}({{item}})</router-link> 
                </section>
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
function fetchTags (store, { path: pathName, params, query }, callback) {
  return store.dispatch('FETCH_TAGS', {
    conditions: {},
    select: {
      tags: 1
    },
    callback
  })
}

export default {
  data () {
    return {
      title: '标签'
    }
  },
  computed: {
    items () {
      return this.$store.state.tags
    }
  },
  preFetch: fetchTags
}
</script>