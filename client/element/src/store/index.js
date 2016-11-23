import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    siteInfo: {},
    list: [],
    curr: {}
  },

  actions: {

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
          delete form._id
          delete form.__v
          return api.patchByID(model, id, form)
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

    PATCH: ({ commit, state }, { model, id, form }) => {
      return api.patchByID(model, id, form)
    },

    DELETE: ({ commit, state }, { model, id }) => {
      return api.deleteByID(model, id)
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
    }
  },

  getters: {

  }
})

export default store
