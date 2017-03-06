const config = require('./mongo.js')

const mongoose = require('mongoose')
const log = require('log4js').getLogger('ssr axios')

mongoose.Promise = global.Promise = require('bluebird')

const mongoUrl = `${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`

mongoose.connect(mongoUrl)

const db = mongoose.connection

db.on('error', (err) => {
  log.error('connect error:', err)
})

db.once('open', () => {
  log.debug('MongoDB is ready')
})

const Schema = mongoose.Schema

let post = new Schema({
  type: { type: String, default: '' },
  status: { type: Number, default: 0 },
  title: String,
  pathName: { type: String, default: '' },
  summary: { type: String },
  markdownContent: { type: String },
  content: { type: String },
  markdownToc: { type: String, default: '' },
  toc: { type: String, default: '' },
  allowComment: { type: Boolean, default: true },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
  isPublic: { type: Boolean, default: true },
  commentNum: Number,
  options: Object,
  category: String,
  tags: Array
})

let category = new Schema({
  name: String,
  pathName: String
})

let tag = new Schema({
  name: String,
  pathName: String
})

let option = new Schema({
  key: String,
  value: Schema.Types.Mixed,
  desc: String
})

let theme = new Schema({
  name: String,
  author: String,
  option: Schema.Types.Mixed
})

post = mongoose.model('post', post)
category = mongoose.model('category', category)
option = mongoose.model('option', option)
theme = mongoose.model('theme', theme)
tag = mongoose.model('tag', tag)

module.exports = {
  post,
  category,
  option,
  tag,
  theme
}
