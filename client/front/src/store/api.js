import request from 'superagent'

const host = typeof location === 'undefined'
  ? process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000'
      : 'http://localhost:8080/proxyPrefix'
  : '/proxyPrefix'

const prefix = `${host}/api`

const blogAPI = `${host}/api/post`

const tagAPI = `${host}/api/tag`

const menuAPI = `${host}/api/menu`

const store = {}

export default store

function isObject (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
}

function convertObjectToArray (args) {
  return isObject(args) ? Object.keys(args).map((value, index) => {
    let temp = {}
    temp[value] = args[value]
    return temp
  }) : []
}

store.fetchOption = () => {
  return request.get(`${prefix}/option?select={"key":1,"value":1}`)
    .then((response) => {
      return response.body
    }, (err) => {
      console.log(err)
    })
}

store.fetchPostByID = (id, conditions, args) => {
  let target = `${blogAPI}/${id}?conditions=${JSON.stringify(conditions)}`
  if (args.select) {
    target = target + `&select=${JSON.stringify(args.select)}`
    delete args.select
  }
  args = convertObjectToArray(args)

  return args.reduce((prev, curr) => {
    prev = prev.query(curr)
    return prev
  }, request.get(target)).then((response) => {
    return response.body
  }, (err) => {
    console.log(err)
  })
}

store.fetchPost = (conditions, args) => {
  let target = `${blogAPI}/?conditions=${JSON.stringify(conditions)}`
  if (args.select) {
    target = target + `&select=${JSON.stringify(args.select)}`
    delete args.select
  }
  args = convertObjectToArray(args)

  return args.reduce((prev, curr) => {
    prev = prev.query(curr)
    return prev
  }, request.get(target)).then((response) => {
    return response.body
  }, (err) => {
    console.log(err)
  })
}

store.fetchTags = () => {
  return request.get(tagAPI).then((response) => {
    return response.body
  }, (err) => {
    console.log(err)
  })
}

store.fetchMenu = () => {
  return request.get(menuAPI).then((response) => {
    return response.body
  }, (err) => {
    console.log(err)
  })
}
