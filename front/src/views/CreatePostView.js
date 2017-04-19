const vuex = require('../store/vuex')
const { mapGetters } = vuex
const Post = require('../components/Post')
const mock404 = require('../utils/404')

module.exports = function(type) {
  const isPost = type === 'post'
  const action = isPost ? 'FETCH_BLOG' : 'FETCH_PAGE'
  const regExp = isPost ? /^\/post\//g : /^\//g
  const select = isPost ? { tags: 1, category: 1 } : {}
  const preFetch = function(store, { path: pathName, params, query }, callback) {
    pathName = decodeURIComponent(pathName.replace(regExp, ''))
    return store.dispatch(action, {
      model: 'post',
      query: {
        conditions: {
          pathName,
          isPublic: true,
          type
        },
        select: Object.assign({
          title: 1,
          createdAt: 1,
          content: 1,
          toc: 1,
          updatedAt: 1,
          pathName: 1,
          allowComment: 1
        }, select)
      },
      callback
    })
  }
  return {
    metaInfo() {
      return {
        title: this.post.title
      }
    },
    name: `${type}-view`,
    computed: {
      ...mapGetters([
        'prev',
        'next',
        'siteInfo',
        'isLoadingAsyncComponent',
        'supportWebp'
      ]),
      post() {
        const target = isPost ? this.$store.state.blog : this.$store.state.page
        return target.pathName ? target : mock404
      }
    },
    preFetch,
    beforeMount() {
      this.isLoadingAsyncComponent && this.$root._isMounted && preFetch(this.$store, this.$route)
    },
    render(h) {
      return h(Post, {
        props: {
          type,
          post: this.post,
          prev: this.prev,
          next: this.next,
          siteInfo: this.siteInfo,
          supportWebp: this.supportWebp
        }
      })
    }
  }
}
