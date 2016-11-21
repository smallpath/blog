import ItemList from '../containers/List.vue'

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function (options) {
  return {
    name: `${options.name}-stories-view`,
    // this will be called during SSR to pre-fetch data into the store!
    preFetch (store) {
      return store.dispatch('FETCH_LIST', options)
    },
    render (h) {
      return h(ItemList, { props: { options: options  } })
    }
  }
}