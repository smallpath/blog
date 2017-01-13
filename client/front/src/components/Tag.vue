<template>
    <div id='main'>
        <article class="post tags">
            <h1 class=title>{{title}}</h1>
            <div class="entry-content">
                <section> 
                    <router-link v-for="key in sortedKeys" 
                        :to="{ name: 'tagPager', params:{ tagName: key } }"
                        :data-tag="key">{{key}}({{items[key]}})</router-link> 
                </section>
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
function fetchTags (store, { path: pathName, params, query }, callback) {
  return store.dispatch('FETCH_TAGS', {
    conditions: {
      type: 'post',
      isPublic: true
    },
    select: {
      _id: 0,
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
    },
    sortedKeys () {
      let ref = this.items
      return Object.keys(ref).sort((a, b) => ref[a] < ref[b])
    }
  },
  preFetch: fetchTags
}
</script>