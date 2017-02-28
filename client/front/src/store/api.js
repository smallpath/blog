import api from 'create-api'

const prefix = `${api.host}/api`

const store = {}

export default store

store.fetch = (model, query) => {
  const target = `${prefix}/${model}`
  return api.axios.get(target, { params: query }).then((response) => {
    const result = response.data
    return result
  })
}

