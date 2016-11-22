/* eslint-disable */
import request from 'axios';

const root = `/proxyPrefix/api`;

const store = {};

const perPage = 10;

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (request.method == 'get' && request.url.indexOf('/proxyPrefix/user') == -1 ){
    return config;
  }

  if (token !== null && token !== 'undefined') {
    config.headers['authorization'] = token;
  }

  return config;
}, (error) => Promise.reject(error));

request.interceptors.response.use((response) => {
  if (response.data && response.data.status && response.data.status === 'fail') {
    console.log(response.data.description);
  }
  return response;
}, (error) => Promise.reject(error));

export default store;

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
  }, (err) => {
    console.log(err)
  })
}

store.fetchByID = (model, id, query) => {
  let target = `${root}/${model}/${id}`
  return request.get(target, { params: query }).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.patchByID = (model, id, form) => {
  let target = `${root}/${model}/${id}`
  return request.patch(target, form).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.post = (model, form) => {
  let target = `${root}/${model}`
  return request.post(target, form).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.deleteByID = (model, id) => {
  let target = `${root}/${model}/${id}`
  return request.delete(target).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}
