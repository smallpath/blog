<template>
  <pager :page="page" :site-info="siteInfo"></pager>
</template>

<script>
import mock404 from '../utils/404'

function fetchPage (store, { path: pathName, params, query }, callback) {
  pathName = pathName.replace(/^\//g, '')
  return store.dispatch('FETCH_PAGE', {
    conditions: {
      pathName,
      type: 'page',
      isPublic: true
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
  computed: {
    page () {
      return this.$store.state.page.pathName
        ? this.$store.state.page
         : mock404
    },
    siteInfo () {
      return this.$store.state.siteInfo
    }
  },
  preFetch: fetchPage
}
</script>