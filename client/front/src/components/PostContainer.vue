<template>
  <blog-post :post="post" :prev="prev" :next="next" :site-info="siteInfo"></blog-post>
</template>

<script>
import mock404 from '../utils/404'

function fetchBlog (store, { path: pathName, params, query }, callback) {
  pathName = pathName.replace(/^\/post\//g, '')
  return store.dispatch('FETCH_BLOG', {
    conditions: {
      pathName,
      isPublic: true,
      type: 'post'
    },
    select: {
      title: 1,
      createdAt: 1,
      content: 1,
      updatedAt: 1,
      pathName: 1,
      category: 1,
      allowComment: 1,
      tags: 1
    },
    callback
  })
}

export default {
  computed: {
    post () {
      return this.$store.state.blog.pathName
        ? this.$store.state.blog
         : mock404
    },
    prev () {
      return this.$store.state.prev
    },
    next () {
      return this.$store.state.next
    },
    siteInfo () {
      return this.$store.state.siteInfo
    }
  },
  preFetch: fetchBlog
}
</script>