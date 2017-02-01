<template>
  <div id='main'>
    <section id="page-index">
      <h1 class="intro">标签<a href="javascript:void(0)">{{$route.params.tagName}}</a>下的文章</h1>
      <blog-summary v-for="item in items" :article="item" ></blog-summary>
      <pagination :page="1" :total-page="1" ></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

function getItems (store, { path, query, params }, callback) {
  return store.dispatch('FETCH_TAG_PAGER', {
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
    sort: 1,
    callback
  })
}

export default {
  computed: {
    ...mapGetters([
      'items',
      'page',
      'totalPage'
    ])
  },
  preFetch: getItems
}
</script>
