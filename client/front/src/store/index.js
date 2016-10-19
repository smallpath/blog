/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemsPerPage: 10,
    items: [],
    // totalPage
  },

  actions: {

    FETCH_ITEMS: ({ commit, state }, { queryJSON, page }) => {
      // only fetch items that we don't already have.
        return api.fetchBlogByPage(queryJSON, page).then(items => commit('SET_ITEMS', { items }))
    },

    FETCH_USER: ({ commit, state }, { id }) => {
      return state.users[id]
        ? Promise.resolve(state.users[id])
        : fetchUser(id).then(user => commit('SET_USER', { user }))
    }
  },

  mutations: {

    SET_ITEMS: (state, { items }) => {
      items.forEach((item, index) => {
        if (item) {
          Vue.set(state.items, index, item)
        }
      })
    },

    SET_USER: (state, { user }) => {
      Vue.set(state.users, user.id, user)
    }
  },

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    // activeIds (state) {
    //   const { activeType, itemsPerPage, lists } = state
    //   const page = Number(state.route.params.page) || 1
    //   if (activeType) {
    //     const start = (page - 1) * itemsPerPage
    //     const end = page * itemsPerPage
    //     return lists[activeType].slice(start, end)
    //   } else {
    //     return []
    //   }
    // },

    // // items that should be currently displayed.
    // // this Array may not be fully fetched.
     items (state, getters) {
       const { items, itemsPerPage, lists } = state
       return items;
    }
  }
})

export default store
