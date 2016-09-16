/* eslint-disable */
import { EventEmitter } from 'events'

const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`

const store = new EventEmitter()

export default store

store.fetchAbout = (vue) => {
  return vue.$http.get(aboutAPI).then((response) => {
    console.log('Response Ok')
    return response.body.content;
  }, (err) => {
    console.log('Response Error')
    console.log(err)
  })
}