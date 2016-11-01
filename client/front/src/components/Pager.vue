<template>
    <div id='main'>
        <div id="page-post">
            <article class="post detail">
                <div class="meta">
                    <div class="date">{{ article.createdAt }}</div>
                    <div class="comment"> <a href="#comments">{{ article.commentNum }} comments</a></div>
                </div>
                <h1 class="title">{{ article.title }}</h1>

                <div class="entry-content" v-html="article.content">
                </div>
            </article>
            <div class="comments" v-if="commentName !== ''">
                <disqus :shortname="commentName" ></disqus>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
export default {
  props: ['page'],
  data () {
    return {}
  },
  serverCacheKey: props => {
    return `${props.page._id}::${props.page.updatedAt}`
  },
  computed: {
    article () {
      return this.page
    },
    commentType () {
      return JSON.parse(this.$store.state.siteInfo.comment.value).type || 'disqus'
    },
    commentName () {
      return JSON.parse(this.$store.state.siteInfo.comment.value).name || ''
    },
    siteURL () {
      return this.$store.state.siteInfo.site_url.value || 'localhost'
    }
  },
  watch: {
    '$route': 'getPost'
  },
  methods: {
    reset (dsq) {
      const self = this
      dsq.reset({
        reload: true,
        config: function () {
          this.page.identifier = (self.$route.path || window.location.pathname)
          this.page.url = window.location.href
        }
      })
    },
    getPost (val, oldVal) {
      if (val.name !== 'page') return

      if (window.DISQUS) {
        this.reset(window.DISQUS)
      }
    }
  }
}
</script>
