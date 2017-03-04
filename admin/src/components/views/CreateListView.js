import Item from '../containers/List.vue'

export default function(options) {
  return {
    name: `${options.name}-list-view`,
    preFetch(store) {
      return store.dispatch('FETCH_LIST', options)
    },
    render(h) {
      return h(Item, { props: { options: options } })
    }
  }
}
