let { siteUrl } = require('./config');
const request = require('superagent');

let head = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n`

let tail = `</urlset>`

let api = 'localhost:3000/api/post?conditions={"type":0}&select={"pathName":1,"updatedAt":1}&sort=1'

let getSitemapFromBody = result => {
        let res = result.body;
        let body = res.reduce((prev, curr)=>{
            prev += `  <url>\r\n`;
            prev += `    <loc>${siteUrl}/post/${curr.pathName}</loc>\r\n`;
            prev += `    <lastmod>${curr.updatedAt.slice(0, 10)}</lastmod>\r\n`;
            prev += `    <priority>0.6</priority>\r\n`;
            prev += `  </url>\r\n`;
            return prev;
        }, '');
        return head + body + tail;
}

module.exports = {
    request,
    api,
    getSitemapFromBody
}