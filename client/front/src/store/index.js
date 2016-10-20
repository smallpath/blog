/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemsPerPage: 10,
    items: [],
    achieves: {},
    siteInfo: {
      github_url: {
          value: '',
      },
      title: {
          value: '',
      },
      logo_url: {
          value: '',
      },
    }
    // totalPage
  },

  actions: {

    FETCH_ITEMS: ({ commit, state }, { queryJSON, page }) => {
      // only fetch items that we don't already have.
        return api.fetchBlogByPage(queryJSON, page).then(items => commit('SET_ITEMS', { items }))
    },

    FETCH_ACHIEVE: ({ commit, state }) => {
      // only fetch items that we don't already have.
        return api.fetchAllBlog().then(items => { 
          let sortedItem = items.reduce((prev,curr)=>{
              let time = curr.createdAt.slice(0,7).replace("-","年")+"月";
              if (typeof prev[time] == 'undefined'){
                  prev[time] = [curr];
              }else{
                  prev[time].push(curr);
              }
              return prev;
          },{});
          commit('SET_ACHIEVE', { sortedItem }) 
        })
    },

    FETCH_OPTIONS: ({ commit, state }) => {
      return api.fetchOption().then(optionArr=>{
        let obj = optionArr.reduce((prev,curr)=>{
          prev[curr.key] = curr;
          return prev;
        },{});
        commit('SET_OPTIONS', { obj });
      });
    },

  },

  mutations: {

    SET_ITEMS: (state, { items }) => {
      items.forEach((item, index) => {
        if (item) {
          Vue.set(state.items, index, item)
        }
      })
    },

    SET_ACHIEVE: (state, { sortedItem }) => {
      Vue.set(state, 'achieves', sortedItem);
    },

    SET_OPTIONS: (state, { obj }) => {
      Vue.set(state, 'siteInfo', obj);
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
       const { items, itemsPerPage } = state
       return items;
    },
    siteInfo (state, getters) {
      const { siteInfo } = state
      return siteInfo;
    },
    achieves (state, getters) {
      const { achieves } = state
      return achieves;
    }
  }
})

export default store
