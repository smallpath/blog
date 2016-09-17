/* eslint-disable */
import { EventEmitter } from 'events'

const blogAPI = `/proxyPrefix/api/post`;

const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`

const store = new EventEmitter()

export default store

store.fetchAbout = (vue) => {
  return vue.$http.get(aboutAPI).then((response) => {
    console.log('Response Ok')
    return response.body;
  }, (err) => {
    console.log('Response Error')
    console.log(err)
  })
}

store.fetchBlogByPage = (vue, page = 0, perPage = 10) => {
  let api = `${blogAPI}?limit=${perPage}&skip=${page*perPage}`
  return vue.$http.get(blogAPI).then((response) => {
    console.log('Response Ok')
    console.log(response.body);
    return response.body;
  }, (err) => {
    console.log('Response Error')
    console.log(err)
  })
}