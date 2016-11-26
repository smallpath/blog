<template>
    <div id='main'>
        <section id="page-index">
            <blog-summary v-for="item in items" :article="item"></blog-summary>
            <pagination :page="page" :total-page="totalPage"></pagination>
        </section>
        <my-footer></my-footer>
    </div>
</template>

<script>
function fetchItems (store, { path, query, params }) {
  if (path !== '/') {
    return Promise.resolve()
  }

  let page = query ? (typeof query.page !== 'undefined') ? parseInt(query.page) : 1 : 1
  if (page < 0) {
    page = 1
  }

  return store.dispatch('FETCH_ITEMS', {
    conditions: {
      type: 'post',
      isPublic: true
    },
    select: {
      title: 1,
      summary: 1,
      commentNum: 1,
      createdAt: 1,
      updatedAt: 1,
      pathName: 1
    },
    limit: 10,
    skip: (page - 1) * 10,
    sort: 1
  })
}

export default {
  data () {
    return {
      totalPage: 1
    }
  },
  computed: {
    items () {
      return this.$store.getters.items
    },
    page () {
      let page = this.$store.state.route.query.page || 1
      return parseInt(page)
    },
    totalPage () {
      return this.$store.state.totalPage
    }
  },
  beforeMount () {
    if (this.$root._isMounted) {
      fetchItems(this.$store, this.$store.state.route)
    }
  },
  preFetch: fetchItems,
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function (val, oldVal) {
      if (val.name !== 'main') return

      fetchItems(this.$store, this.$store.state.route)
    }
  }
}
</script>