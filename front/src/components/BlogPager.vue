<template>
  <div id='main'>
    <section id="page-index">
      <blog-summary v-for="item in items" :key="item.pathName" :support-webp="supportWebp" :article="item"></blog-summary>
      <pagination :page="page" :total-page="totalPage"></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from '../store/vuex'
import BlogSummary from './BlogSummary'

function fetchItems(store, { path, query, params }, callback) {
  if (path !== '/') {
    return Promise.resolve()
  }

  let page = query ? (typeof query.page !== 'undefined') ? parseInt(query.page) : 1 : 1
  if (page < 0) {
    page = 1
  }

  return store.dispatch('FETCH_ITEMS', {
    model: 'post',
    query: {
      conditions: {
        type: 'post',
        isPublic: true
      },
      select: {
        _id: 0,
        title: 1,
        summary: 1,
        createdAt: 1,
        updatedAt: 1,
        pathName: 1
      },
      limit: 10,
      skip: (page - 1) * 10,
      sort: {
        createdAt: -1
      }
    },
    callback
  })
}

export default {
  name: 'blog-pager',
  metaInfo() {
    return {
      title: '首页'
    }
  },
  components: {
    BlogSummary
  },
  computed: {
    ...mapGetters([
      'items',
      'page',
      'totalPage',
      'siteInfo',
      'isLoadingAsyncComponent',
      'supportWebp'
    ])
  },
  preFetch: fetchItems,
  beforeMount() {
    this.isLoadingAsyncComponent && this.$root._isMounted && fetchItems(this.$store, this.$route)
  }
}
</script>