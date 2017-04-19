let head = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n`

let tail = '</urlset>'

let api = 'http://localhost:3000/api/post'
let params = {
  conditions: {
    type: 'post',
    isPublic: true
  },
  select: {
    pathName: 1,
    updatedAt: 1
  },
  sort: {
    updatedAt: -1
  }
}

let getSitemapFromBody = (result, config) => {
  let res = result.data
  let body = res.reduce((prev, curr) => {
    prev += `  <url>\r\n`
    prev += `    <loc>${config.siteUrl}/post/${curr.pathName}</loc>\r\n`
    prev += `    <lastmod>${curr.updatedAt.slice(0, 10)}</lastmod>\r\n`
    prev += `    <priority>0.6</priority>\r\n`
    prev += `  </url>\r\n`
    return prev
  }, '')
  return head + body + tail
}

module.exports = {
  api,
  params,
  getSitemapFromBody
}
