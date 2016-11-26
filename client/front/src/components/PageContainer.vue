<template>
  <pager :page="page"></pager>
</template>

<script>
function fetchPage (store, { path: pathName, params, query }) {
  pathName = pathName.replace(/^\//g, '')
  return store.dispatch('FETCH_PAGE', {
    conditions: {
      pathName,
      type: 'page'
    },
    select: {
      title: 1,
      createdAt: 1,
      content: 1,
      updatedAt: 1,
      commentNum: 1,
      pathName: 1,
      allowComment: 1
    }
  })
}

export default {
  data () {
    return {}
  },
  computed: {
    page () {
      return this.$store.state.page
    }
  },
  preFetch: fetchPage,
  beforeMount () {
    if (this.$root._isMounted) {
      fetchPage(this.$store, this.$store.state.route)
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function (val, oldVal) {
      if (val.name !== 'page') return

      fetchPage(this.$store, this.$store.state.route)
    }
  }
}
</script>