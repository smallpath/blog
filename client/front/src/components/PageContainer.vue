<template>
  <pager :page="page"></pager>
</template>

<script>
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
  data () {
    return {}
  },
  computed: {
    page () {
      return this.$store.state.page.pathName
        ? this.$store.state.page
         : {
           pathName: 404,
           createdAt: '2017-01-01 00:00:00',
           updatedAt: '2017-01-01 00:00:00',
           title: '404 Not Found',
           content: '<p>你要找的页面不存在。</p><p>请检查URL是否有误，或者查看本博客所有<a href="/proxyPrefix/api/post?conditions={&quot;isPublic&quot;:true}&select={&quot;_id&quot;:0,&quot;title&quot;:1,&quot;pathName&quot;:1}&sort=1">文章</a></p>'
         }
    }
  },
  preFetch: fetchPage
}
</script>