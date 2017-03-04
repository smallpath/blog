import Item from '../containers/Post.vue'

export default function(options) {
  return {
    name: `${options.name}-markdown-view`,
    preFetch(store) {
      return store.dispatch('FETCH_LIST', options)
    },
    render(h) {
      return h(Item, { props: { options: options } })
    }
  }
}
