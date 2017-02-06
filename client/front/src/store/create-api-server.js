import LRU from 'lru-cache'

const isProd = process.env.NODE_ENV === 'production'

let api
if (process.__API__) {
  api = process.__API__
} else {
  api = process.__API__ = {
    host: isProd ? 'http://localhost:3000'
    : 'http://localhost:8080/proxyPrefix',
    onServer: true,
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })
  }
}

export default api
