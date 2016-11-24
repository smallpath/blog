let config = require('../conf/config');
let mongoose = require('mongoose');
let log = require('../utils/log');

mongoose.Promise = require('bluebird');

let mongoUrl = '127.0.0.1:27017/blog';

mongoose.connect(mongoUrl);

let db = mongoose.connection;

db.on('error', (err)=>{
    log.error("connect error:", err);
});

db.once('open', () => {
    log.debug('MongoDB is ready')
});

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let post = new Schema({
    type: { type: String, default: '' },
    status: { type: Number, default: 0 },
    title: String,
    pathName: { type: String, default: '' },
    summary: { type: String },
    markdownContent: { type: String },
    content: { type: String },
    allowComment: { type: Boolean, default: true },
    createdAt: {type: String, default: '' },
    updatedAt: {type: String, default: '' },
    isPublic: { type: Boolean, default: true },
    commentNum: Number,
    options: Object,
    category: String,
    tags: Array
});

let category = new Schema({
    name: String,
    pathName: String
});

let tag = new Schema({
    name: String,
    pathName: String
});

let option = new Schema({
    key: String,
    value: Schema.Types.Mixed,
    desc: String,
});

let menu = new Schema({
    label: String,
    url: String,
    option: Schema.Types.Mixed,
});

let user = new Schema({
    name: String,
    displayName: String,
    password: String,
    email: String,
});

let version = new Schema({
    name: String,
    version: String,
    path: String,
});

post = mongoose.model('post', post),
category = mongoose.model('category', category),
option = mongoose.model('option', option),
menu = mongoose.model('menu', menu);
tag = mongoose.model('tag', tag),
user = mongoose.model('user', user);
version = mongoose.model('version', version);


module.exports = {
    post,
    category,
    option,
    tag,
    user,
    version,
    menu
}