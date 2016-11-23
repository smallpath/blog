/* eslint-disable */
import request from 'axios';

const root = `/proxyPrefix/api`;

const store = {};

const perPage = 10;

export default store;

store.request = request;

store.login = (conditions) => {
  return request.post(`/proxyPrefix/admin/login`, conditions);
}

store.logout = (conditions) => {
  return request.post(`/proxyPrefix/admin/logout`, conditions);
}

// post CRUD

store.fetchList = (model, query) => {
  let target = `${root}/${model}`
  return request.get(target, { params: query }).then((response) => {
    return response.data;
  })
}

store.fetchByID = (model, id, query) => {
  let target = `${root}/${model}/${id}`
  return request.get(target, { params: query }).then((response) => {
    return response.data;
  })
}

store.patchByID = (model, id, form) => {
  let target = `${root}/${model}/${id}`
  return request.patch(target, form).then((response) => {
    return response.data;
  })
}

store.post = (model, form) => {
  let target = `${root}/${model}`
  return request.post(target, form).then((response) => {
    return response.data;
  })
}

store.deleteByID = (model, id) => {
  let target = `${root}/${model}/${id}`
  return request.delete(target).then((response) => {
    return response.data;
  })
}
