<template>
  <div id='main'>
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">{{ article.createdAt }}</div>
        </div>
        <h1 class="title">{{ article.title }}</h1>
        <div class="entry-content" v-html="article.content"></div>
      </article>
      <div class="comments" v-if="article.allowComment === true && commentName !== ''">
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
    return `${props.page.pathName}::${props.page.updatedAt}`
  },
  computed: {
    article () {
      return this.page
    },
    commentType () {
      return this.$store.state.siteInfo.commentType.value || 'disqus'
    },
    commentName () {
      return this.$store.state.siteInfo.commentName.value || ''
    },
    siteURL () {
      return this.$store.state.siteInfo.siteUrl.value || 'localhost'
    }
  },
  watch: {
    '$route': 'resetDisqus'
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
    resetDisqus (val, oldVal) {
      if (val.name !== 'page') return

      if (window.DISQUS) {
        this.reset(window.DISQUS)
      }
    }
  }
}
</script>
