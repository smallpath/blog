<template>
  <div id='main'>
    <section id="page-index">
      <h1 class="intro">标签<a href="javascript:void(0)">{{$route.params.tagName}}</a>下的文章</h1>
      <blog-summary v-for="item in tagPager" :key="item._id" :support-webp="supportWebp" :article="item" ></blog-summary>
      <pagination :page="1" :total-page="1" ></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from '../store/vuex'
import BlogSummary from './BlogSummary'

function getItems(store, { path, query, params }, callback) {
  return store.dispatch('FETCH_TAG_PAGER', {
    model: 'post',
    query: {
      conditions: {
        tags: params.tagName,
        type: 'post',
        isPublic: true
      },
      select: {
        _id: 0,
        tags: 1,
        title: 1,
        summary: 1,
        createdAt: 1,
        updatedAt: 1,
        pathName: 1
      },
      sort: {
        updatedAt: -1
      }
    },
    callback
  })
}

export default {
  metaInfo() {
    return {
      title: `标签${this.$route.params.tagName}下的文章`
    }
  },
  components: {
    BlogSummary
  },
  computed: {
    ...mapGetters([
      'tagPager',
      'page',
      'totalPage',
      'isLoadingAsyncComponent',
      'supportWebp'
    ])
  },
  preFetch: getItems,
  beforeMount() {
    this.isLoadingAsyncComponent && this.$root._isMounted && getItems(this.$store, this.$route)
  }
}
</script>
