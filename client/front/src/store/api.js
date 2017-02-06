import axios from 'axios'
import api from 'create-api'

const prefix = `${api.host}/api`

const store = {}
// should cache the response on the server side
const shouldCache = api.onServer

export default store

store.fetch = (model, query) => {
  const target = `${prefix}/${model}`
  const key = target + JSON.stringify(query)
  if (shouldCache && api.cache.has(key)) {
    return Promise.resolve(api.cache.get(key))
  }
  return axios.get(target, { params: query }).then((response) => {
    const result = response.data
    if (shouldCache) api.cache.set(key, result)
    return result
  })
}

