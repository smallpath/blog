import { mapGetters } from 'vuex'
import Post from '../components/Post'
import mock404 from '../utils/404'

export default function (type) {
  const isPost = type === 'post'
  const action = isPost ? 'FETCH_BLOG' : 'FETCH_PAGE'
  const regExp = isPost ? /^\/post\//g : /^\//g
  const select = isPost ? { tags: 1, category: 1 } : {}
  return {
    metaInfo () {
      return {
        title: this.post.title
      }
    },
    name: `${type}-view`,
    computed: {
      ...mapGetters([
        'prev',
        'next',
        'siteInfo'
      ]),
      post () {
        const target = isPost ? this.$store.state.blog : this.$store.state.page
        return target.pathName ? target : mock404
      }
    },
    preFetch: function (store, { path: pathName, params, query }, callback) {
      pathName = pathName.replace(regExp, '')
      return store.dispatch(action, {
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
        }, select),
        callback
      })
    },
    render (h) {
      return h(Post, {
        props: {
          type,
          post: this.post,
          prev: this.prev,
          next: this.next,
          siteInfo: this.siteInfo
        }
      })
    }
  }
}
