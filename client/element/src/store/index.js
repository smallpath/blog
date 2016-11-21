import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    siteInfo: {},
    list: []
  },

  actions: {
    FETCH_LIST: ({ commit, state }, { model, query }) => {
      return api.fetchList(model, query).then(obj => {
        commit('SET_LIST', { obj })
      })
    },

    FETCH_OPTIONS: ({ commit, state }) => {
      return api.fetchOption().then(optionArr => {
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
    }
  },

  getters: {

  }
})

export default store
