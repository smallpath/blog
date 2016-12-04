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
    tagPager: [],
    theme: {},
    progress: 0,
    siteInfo: {
      githubUrl: {
        value: ''
      },
      title: {
        value: ''
      },
      logoUrl: {
        value: ''
      }
    }
  },

  actions: {
    SET_PROGRESS: ({ commit, state }, progress) => {
      commit('SET_PROGRESS_VALUE', progress)
    },

    START_LOADING: ({ commit, state, dispatch }) => {
      dispatch('SET_PROGRESS', 30)
      let interval = setInterval(() => {
        let progress = state.progress
        if (progress < 90) {
          let target = progress + 10
          dispatch('SET_PROGRESS', target)
        }
      }, 400)
      return interval
    },

    FETCH_BLOG: ({ commit, state, dispatch }, { conditions, callback, ...args }) => {
      return api.fetchPost(conditions, args).then(result => {
        let blog = result[0]
        commit('SET_BLOG', { blog })
        callback && callback()

        let first = api.fetchPost({
          _id: { $lt: blog._id },
          type: 'post',
          isPublic: true
        }, {
          sort: 1,
          limit: 1,
          select: {
            _id: 0,
            title: 1,
            pathName: 1,
            type: 1
          }
        })

        let second = api.fetchPost({
          _id: { $gt: blog._id },
          type: 'post',
          isPublic: true
        }, {
          limit: 1,
          select: {
            _id: 0,
            title: 1,
            pathName: 1,
            type: 1
          }
        })

        return Promise.all([first, second]).then(result => {
          let prevPost = result[0][0]
          if (prevPost && prevPost.type === 'post') {
            commit('SET_PREV', { post: prevPost })
          } else {
            commit('SET_PREV', { post: {} })
          }

          let nextPost = result[1][0]
          if (nextPost && nextPost.type === 'post') {
            commit('SET_NEXT', { post: nextPost })
          } else {
            commit('SET_NEXT', { post: {} })
          }
        })
      })
    },

    FETCH_PAGE: ({ commit, state, dispatch }, { conditions, callback, ...args }) => {
      return api.fetchPost(conditions, args).then(result => {
        let blog = result[0]
        commit('SET_PAGE', { blog })
        callback && callback()
      })
    },

    FETCH_TAGS: ({ commit, state, dispatch }, { conditions, callback, ...args }) => {
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
        callback && callback()
      })
    },

    FETCH_ITEMS: ({ commit, state, dispatch }, { conditions, callback, ...args }) => {
      return api.fetchPost(conditions, args).then(items => {
        commit('SET_ITEMS', { items })
        callback && callback()
        if (state.totalPage === -1) {
          return api.fetchPost({ type: 'post' }, { count: 1 })
            .then(totalPage => {
              commit('SET_PAGES', {
                totalPage: Math.ceil(totalPage / 10)
              })
            })
        }
        return Promise.resolve()
      })
    },

    FETCH_TAG_PAGER: ({ commit, state, dispatch }, { conditions, callback, ...args }) => {
      return api.fetchPost(conditions, args).then(items => {
        commit('SET_TAG_PAGER', { items })
        callback && callback()
      })
    },

    FETCH_ACHIEVE: ({ commit, state, dispatch }, { conditions, callback, ...args }) => {
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
        callback && callback()
      })
    },

    FETCH_FIREKYLIN: ({ commit, state }) => {
      return api.fetchTheme().then(obj => {
        if (obj[0]) {
          commit('SET_FIREKYLIN', { obj: obj[0] })
        }
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

    SET_PROGRESS_VALUE: (state, progress) => {
      Vue.set(state, 'progress', progress)
    },

    SET_TAGS: (state, { tags }) => {
      Vue.set(state, 'tags', tags)
    },
    SET_TAG_PAGER: (state, { items }) => {
      Vue.set(state, 'tagPager', items)
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

    SET_FIREKYLIN: (state, { obj }) => {
      Vue.set(state, 'theme', obj)
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
