import request from 'axios'

const root = `/proxyPrefix/api`

const store = {}

export default store

store.request = request

store.login = (conditions) => {
  return request.post(`/proxyPrefix/admin/login`, conditions)
}

store.logout = (conditions) => {
  return request.post(`/proxyPrefix/admin/logout`, conditions)
}

store.getImageHeight = url => {
  return request.get(`${url}?imageInfo`).then(response => response.data)
}

store.getImageToken = (body) => {
  return request.post(`/proxyPrefix/admin/qiniu`, body).then(response => response.data)
}

store.fetchList = (model, query) => {
  let target = `${root}/${model}`
  return request.get(target, { params: query }).then((response) => {
    return response.data
  })
}

store.fetchByID = (model, id, query) => {
  let target = `${root}/${model}/${id}`
  return request.get(target, { params: query }).then((response) => {
    return response.data
  })
}

store.post = (model, form) => {
  let target = `${root}/${model}`
  return request.post(target, form).then((response) => {
    return response.data
  })
}

store.patchByID = (model, id, form) => {
  let target = `${root}/${model}/${id}`
  return request.patch(target, form).then((response) => {
    return response.data
  })
}

store.deleteByID = (model, id) => {
  let target = `${root}/${model}/${id}`
  return request.delete(target).then((response) => {
    return response.data
  })
}
