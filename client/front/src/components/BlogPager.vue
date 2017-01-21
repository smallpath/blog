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
function fetchItems (store, { path, query, params }, callback) {
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
      _id: 0,
      title: 1,
      summary: 1,
      createdAt: 1,
      updatedAt: 1,
      pathName: 1
    },
    limit: 10,
    skip: (page - 1) * 10,
    sort: 1,
    callback
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
  preFetch: fetchItems
}
</script>