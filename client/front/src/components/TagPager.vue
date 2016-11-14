<template>
    <div id='main'>
        <section id="page-index">
            <h1 class="intro">标签<a href="javascript:avoid(0)">{{$route.params.tagName}}</a>下的文章</h1>
            <blog-summary v-for="item in items" :article="item" ></blog-summary>
            <pagination :page="page" :total-page="totalPage" ></pagination>
        </section>
        <my-footer></my-footer>
    </div>
</template>

<script>
import Api from '../store/api'

export default {
  data () {
    return {
      items: [],
      page: 1,
      totalPage: 1
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getItems()
    })
  },
  methods: {
    getItems () {
      Api.fetchPost({}, {
        select: {
          tags: 1,
          title: 1,
          summary: 1,
          commentNum: 1,
          createdAt: 1,
          updatedAt: 1,
          pathName: 1
        },
        sort: 1
      }).then(result => {
        this.items = []
        result.forEach(value => {
          for (let i = 0; i < value.tags.length; i++) {
            let tag = value.tags[i]
            if (tag === this.$route.params.tagName) {
              this.items.push(value)
              break
            }
          }
        })
      })
    }
  }
}
</script>
