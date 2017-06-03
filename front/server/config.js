const isProd = process.env.NODE_ENV === 'production'
const request = require('./server-axios')
const { ssrPort, serverPort, enableServerSideGA } = require('./mongo')

let siteUrl = 'http://localhost:8080'
let title = 'Blog'
let description = ''
let googleTrackID = ''
let favicon = isProd ? './dist' : '.'
let ga = {
  version: 1,
  api: 'https://www.google-analytics.com/collect',
  required: ['dt', 'dr', 'dp', 'z'],
  spider: [
    'spider',
    'bot',
    'appid', // for google appengine
    'go-http-client',
    'loadtest', // for load test
    'feed'
  ].map(item => item.toLowerCase().replace(/\s+/g, ''))
}

function flushOption() {
  return request.get('http://localhost:3000/api/option').then(res => {
    let options = res.data.reduce((prev, curr) => {
      prev[curr.key] = curr.value
      return prev
    }, {})
    siteUrl = options['siteUrl']
    title = options['title']
    description = options['description']
    googleTrackID = options['analyzeCode']
    favicon += options['faviconUrl']
  })
}

exports.ssrPort = ssrPort
exports.serverPort = serverPort
exports.enableServerSideGA = enableServerSideGA

Object.defineProperty(exports, 'title', {
  enumerable: true,
  get: function() {
    return title
  },
  set: function(value) {
    title = value
  }
})
Object.defineProperty(exports, 'siteUrl', {
  enumerable: true,
  get: function() {
    return siteUrl
  },
  set: function(value) {
    siteUrl = value
  }
})
Object.defineProperty(exports, 'description', {
  enumerable: true,
  get: function() {
    return description
  },
  set: function(value) {
    description = value
  }
})
Object.defineProperty(exports, 'googleTrackID', {
  enumerable: true,
  get: function() {
    return googleTrackID
  },
  set: function(value) {
    googleTrackID = value
  }
})
Object.defineProperty(exports, 'favicon', {
  enumerable: true,
  get: function() {
    return favicon
  },
  set: function(value) {
    favicon = value
  }
})
Object.defineProperty(exports, 'flushOption', {
  enumerable: true,
  get: function() {
    return flushOption
  }
})
Object.defineProperty(exports, 'ga', {
  enumerable: true,
  get: function() {
    return ga
  }
})
