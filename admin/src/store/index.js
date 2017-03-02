import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    siteInfo: {},
    list: [],
    curr: {},
    user: {}
  },

  actions: {

    GET_IMAGE_HEIGHT: ({ commit, state }, { url }) => {
      return api.getImageHeight(url).then(data => data.height || 100)
    },

    FETCH: ({ commit, state }, { model, query }) => {
      return api.fetchList(model, query)
    },

    FETCH_BY_ID: ({ commit, state }, { model, id, query }) => {
      return api.fetchByID(model, id, query)
    },

    FETCH_LIST: ({ commit, state }, { model, query }) => {
      return api.fetchList(model, query).then(obj => {
        commit('SET_LIST', { obj })
      })
    },

    FETCH_CREATE: ({ commit, state }, { model, id, query }) => {
      if (id === -1) {
        return api.fetchList(model, query).then(curr => {
          let obj = curr.reduce((prev, value) => {
            if (model === 'option') {
              prev[value.key] = value.value
            } else if (model === 'user') {
              Object.keys(value).forEach(item => {
                prev[item] = value[item]
              })
            }
            return prev
          }, {})
          commit('SET_CURR', { obj })
        })
      } else {
        return api.fetchByID(model, id, query).then(obj => {
          commit('SET_CURR', { obj })
        })
      }
    },

    POST: ({ commit, state }, { model, form }) => {
      if (model !== 'post' && model !== 'option' && model !== 'user') {
        return api.post(model, form)
      } else if (model === 'user' || model === 'post') {
        let { _id: id } = form
        if (typeof id !== 'undefined') {
          return api.patchByID(model, id, form).then((result) => {
            if (model === 'user') {
              commit('SET_USER', { user: result })
            }
            return result
          })
        } else {
          return api.post(model, form)
        }
      } else if (model === 'option') {
        let promiseArr = Object.keys(form).reduce((prev, curr) => {
          if (form[curr] !== state.curr[curr]) {
            const { _id: id } = state.siteInfo[curr]
            let promise = api.patchByID(model, id, {
              value: form[curr]
            })
            prev.push(promise)
          }
          return prev
        }, [])
        return Promise.all(promiseArr)
      }
    },

    GET_IMAGE_TOKEN: ({ commit, state }, body) => {
      return api.getImageToken(body)
    },

    PATCH: ({ commit, state }, { model, id, form }) => {
      return api.patchByID(model, id, form)
    },

    DELETE: ({ commit, state }, { model, id }) => {
      return api.deleteByID(model, id)
    },

    FETCH_USER: ({ commit, state }, { model, query, username }) => {
      return api.fetchList(model, query).then(result => {
        for (let i = 0, len = result.length; i < len; i++) {
          let user = result[i]
          if (user.name === username) {
            commit('SET_USER', { user })
            break
          }
        }
      })
    },

    FETCH_OPTIONS: ({ commit, state }) => {
      return api.fetchList('option', {}).then(optionArr => {
        let obj = optionArr.reduce((prev, curr) => {
          prev[curr.key] = curr
          return prev
        }, {})
        commit('SET_OPTIONS', { obj })
      })
    }

  },

  mutations: {
    SET_LIST: (state, { obj }) => {
      Vue.set(state, 'list', obj)
    },

    SET_OPTIONS: (state, { obj }) => {
      Vue.set(state, 'siteInfo', obj)
    },

    SET_CURR: (state, { obj }) => {
      Vue.set(state, 'curr', obj)
    },

    SET_USER: (state, { user }) => {
      Vue.set(state, 'user', user)
    }
  },

  getters: {

  }
})

export default store
