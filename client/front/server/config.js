let request = require('superagent')

let siteUrl = 'http://localhost:8080'
let title = 'Blog'
let description = ''
let googleTrackID = ''
let ga = {
  version: 1,
  api: 'https://www.google-analytics.com/collect',
  required: ['dt', 'dr', 'dp', 'z'],
  spider: [
    'Baiduspider',
    'Googlebot',
    'Sogou web spider',
    'Sogou spider2',
    'Sogou blog',
    'Sogou News Spider',
    'Sogou Orion spider',
    'Sogou inst spider',
    'Yahoo! Slurp',
    'MSNBot',
    'YoudaoBot',
    'JikeSpider',
    'Sosospider',
    '360Spider',
    'iaskspider',
    'YandexBot'
  ].map(item => item.toLowerCase().replace(/\s+/g, ''))
}

function flushOption () {
  return request.get('localhost:3000/api/option').then(res => {
    let options = res.body.reduce((prev, curr) => {
      prev[curr.key] = curr.value
      return prev
    }, {})
    siteUrl = options['siteUrl']
    title = options['title']
    description = options['description']
    googleTrackID = options['analyzeCode']
  })
}

Object.defineProperty(exports, 'title', {
  enumerable: true,
  get: function () {
    return title
  },
  set: function (value) {
    title = value
  }
})
Object.defineProperty(exports, 'siteUrl', {
  enumerable: true,
  get: function () {
    return siteUrl
  },
  set: function (value) {
    siteUrl = value
  }
})
Object.defineProperty(exports, 'description', {
  enumerable: true,
  get: function () {
    return description
  },
  set: function (value) {
    description = value
  }
})
Object.defineProperty(exports, 'googleTrackID', {
  enumerable: true,
  get: function () {
    return googleTrackID
  },
  set: function (value) {
    googleTrackID = value
  }
})
Object.defineProperty(exports, 'flushOption', {
  enumerable: true,
  get: function () {
    return flushOption
  }
})
Object.defineProperty(exports, 'ga', {
  enumerable: true,
  get: function () {
    return ga
  }
})
