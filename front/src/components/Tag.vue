<template>
  <div id='main'>
    <article class="post tags">
      <h1 class=title>{{title}}</h1>
      <div class="entry-content">
        <section> 
          <router-link v-for="(key, index) in sortedKeys" 
              :to="{ name: 'tagPager', params:{ tagName: key } }"
              :key="index"
              :data-tag="key">{{key}}({{tags[key]}})</router-link> 
        </section>
      </div>
    </article>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from '../store/vuex'

function fetchTags(store, { path: pathName, params, query }, callback) {
  return store.dispatch('FETCH_TAGS', {
    model: 'post',
    query: {
      conditions: {
        type: 'post',
        isPublic: true
      },
      select: {
        _id: 0,
        tags: 1
      }
    },
    callback
  })
}

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: '标签'
    }
  },
  computed: {
    ...mapGetters([
      'tags',
      'isLoadingAsyncComponent'
    ]),
    sortedKeys() {
      let ref = this.tags
      return Object.keys(ref).sort((a, b) => ref[b] - ref[a])
    }
  },
  preFetch: fetchTags,
  beforeMount() {
    this.isLoadingAsyncComponent && this.$root._isMounted && fetchTags(this.$store, this.$route)
  }
}
</script>