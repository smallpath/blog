let { siteUrl } = require('./config');

module.exports = 
`User-agent: *
Disallow: /beacon
Disallow: /search
Allow: /
Sitemap: ${siteUrl}/sitemap.xml

User-agent: YisouSpider
Disallow: /
User-agent: EasouSpider
Disallow: /
User-agent: EtaoSpider
Disallow: /
User-agent: MJ12bot
Disallow: /`