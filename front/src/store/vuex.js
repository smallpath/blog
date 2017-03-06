const global = typeof window !== 'undefined' ? window : process

class Store {
  constructor({
    state,
    actions,
    mutations,
    getters
  }) {
    this.actions = actions
    this.mutations = mutations
    this.getters = {}
    this._watcherVM = new global.Vue()
    const store = this
    const computed = {}

    forEachValue(getters, (fn, key) => {
      computed[key] = () => {
        const state = store.state
        return fn(state)
      }
      Object.defineProperty(store.getters, key, {
        get: () => {
          return store._vm[key]
        },
        enumerable: true
      })
    })
    store._vm = new global.Vue({
      data: {
        $$state: state
      },
      computed
    })
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(state) {
    this._vm._data.$$state = state
  }

  commit(mutation, options) {
    if (mutation === 'router/ROUTE_CHANGED') {
      return global.Vue.set(this.state, 'route', options)
    }
    return this.mutations[mutation].call(null, this.state, options)
  }

  dispatch(action, options) {
    const result = this.actions[action].call(null, {
      commit: this.commit.bind(this),
      state: this.state,
      dispatch: this.dispatch.bind(this)
    }, options)
    if (result && typeof result.then === 'function') {
      return result
    } else {
      return Promise.resolve(result)
    }
  }

  watch(getter, cb, options) {
    return this._watcherVM.$watch(() => getter(this.state, this.getters), cb, options)
  }

  replaceState(state) {
    this._vm._data.$$state = state
  }

  registerModule(path, rawModule) {
    this.state.route = rawModule
  }

}

function install(_Vue) {
  if (global.Vue || _Vue.isInstalled === true) return
  _Vue.isInstalled = true
  global.Vue = _Vue
  global.Vue.mixin({ beforeCreate: vuexInit })
}

const mapGetters = (getters) => {
  const res = {}
  getters.forEach(item => {
    res[item] = function() {
      const result = this.$store.getters[item]
      return result
    }
  })
  return res
}

function vuexInit() {
  const options = this.$options
  // store injection
  if (options.store) {
    this.$store = options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}

export default {
  install,
  Store
}

export {
  mapGetters
}

function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
