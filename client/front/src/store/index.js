import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemsPerPage: 10,
    totalPage: -1,
    items: [],
    achieves: {},
    blog: {},
    prev: {},
    next: {},
    page: {},
    menu: [],
    siteInfo: {
      github_url: {
        value: ''
      },
      title: {
        value: ''
      },
      logo_url: {
        value: ''
      }
    }
  },

  actions: {

    FETCH_BLOG: ({ commit, state }, { conditions, ...args }) => {
      return api.fetchPost(conditions, args).then(result => {
        let blog = result[0]

        commit('SET_BLOG', { blog })

        let first = api.fetchPost({
          _id: { $lt: blog._id },
          type: 0,
          isPublic: true
        }, {
          sort: 1,
          limit: 1,
          select: {
            title: 1,
            pathName: 1,
            type: 1
          }
        }).then(posts => {
          try {
            let post = posts[0]
            if (post.type === '0') {
              commit('SET_PREV', { post })
            } else {
              commit('SET_PREV', { post: {} })
            }
          } catch (err) {
            commit('SET_PREV', { post: {} })
          }
        })

        let second = api.fetchPost({
          _id: { $gt: blog._id },
          type: 0,
          isPublic: true
        }, {
          limit: 1,
          select: {
            title: 1,
            pathName: 1,
            type: 1
          }
        }).then(posts => {
          try {
            let post = posts[0]
            if (post.type === '0') {
              commit('SET_NEXT', { post })
            } else {
              commit('SET_NEXT', { post: {} })
            }
          } catch (err) {
            commit('SET_NEXT', { post: {} })
          }
        })

        return Promise.all([first, second])
      })
    },

    FETCH_PAGE: ({ commit, state }, { conditions, ...args }) => {
      return api.fetchPost(conditions, args).then(result => {
        let blog = result[0]
        commit('SET_PAGE', { blog })
      })
    },

    FETCH_TAGS: ({ commit, state }, { conditions, ...args }) => {
      return api.fetchPost(conditions, args).then(result => {
        let tags = result.reduce((prev, curr) => {
          curr.tags.forEach(tag => {
            if (typeof prev[tag] === 'undefined') {
              prev[tag] = 1
            } else {
              prev[tag] = prev[tag] + 1
            }
          })
          return prev
        }, {})
        commit('SET_TAGS', { tags })
      })
    },

    FETCH_ITEMS: ({ commit, state }, { conditions, ...args }) => {
      return api.fetchPost(conditions, args).then(items => {
        commit('SET_ITEMS', { items })

        if (state.totalPage === -1) {
          return api.fetchPost({ type: 0 }, { count: 1 })
            .then(totalPage => {
              commit('SET_PAGES', {
                totalPage: Math.ceil(totalPage / 10)
              })
            })
        } else {
          return ''
        }
      })
    },

    FETCH_ACHIEVE: ({ commit, state }, { conditions, ...args }) => {
      return api.fetchPost(conditions, args).then(items => {
        let sortedItem = items.reduce((prev, curr) => {
          let time = curr.createdAt.slice(0, 7).replace('-', '年') + '月'
          if (typeof prev[time] === 'undefined') {
            prev[time] = [curr]
          } else {
            prev[time].push(curr)
          }
          return prev
        }, {})
        commit('SET_ACHIEVE', { sortedItem })
      })
    },

    FETCH_MENU: ({ commit, state }) => {
      return api.fetchMenu().then(obj => {
        commit('SET_MENU', { obj })
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

    SET_BLOG: (state, { blog }) => {
      Vue.set(state, 'blog', blog)
    },
    SET_PREV: (state, { post }) => {
      Vue.set(state, 'prev', post)
    },
    SET_NEXT: (state, { post }) => {
      Vue.set(state, 'next', post)
    },

    SET_TAGS: (state, { tags }) => {
      Vue.set(state, 'tags', tags)
    },
    SET_ITEMS: (state, { items }) => {
      Vue.set(state, 'items', items)
    },
    SET_PAGES: (state, { totalPage }) => {
      Vue.set(state, 'totalPage', totalPage)
    },

    SET_PAGE: (state, { blog }) => {
      Vue.set(state, 'page', blog)
    },

    SET_ACHIEVE: (state, { sortedItem }) => {
      Vue.set(state, 'achieves', sortedItem)
    },

    SET_MENU: (state, { obj }) => {
      Vue.set(state, 'menu', obj)
    },

    SET_OPTIONS: (state, { obj }) => {
      Vue.set(state, 'siteInfo', obj)
    }
  },

  getters: {
    items (state, getters) {
      const { items } = state
      return items
    },
    siteInfo (state, getters) {
      const { siteInfo } = state
      return siteInfo
    },
    achieves (state, getters) {
      const { achieves } = state
      return achieves
    },
    menu (state, getters) {
      const { menu } = state
      return menu
    }
  }
})

export default store
