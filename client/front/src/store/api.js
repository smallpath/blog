import axios from 'axios'

const host = typeof location === 'undefined'
  ? process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000'
    : 'http://localhost:8080/proxyPrefix'
  : '/proxyPrefix'

const prefix = `${host}/api`

const store = {}

export default store

store.fetch = (model, query) => {
  let target = `${prefix}/${model}`
  return axios.get(target, { params: query }).then((response) => {
    return response.data
  }).catch(err => console.error(err))
}
