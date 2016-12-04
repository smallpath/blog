<template>
  <pager :page="page"></pager>
</template>

<script>
function fetchPage (store, { path: pathName, params, query }, callback) {
  pathName = pathName.replace(/^\//g, '')
  return store.dispatch('FETCH_PAGE', {
    conditions: {
      pathName,
      type: 'page'
    },
    select: {
      _id: 0,
      title: 1,
      createdAt: 1,
      content: 1,
      updatedAt: 1,
      pathName: 1,
      allowComment: 1
    },
    callback
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
  preFetch: fetchPage
}
</script>