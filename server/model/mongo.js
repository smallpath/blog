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
    allowComment: { type: Number, default: 1 },
    createdAt: {type: String, default: '' },
    updatedAt: {type: String, default: '' },
    isPublic: { type: Number, default: 1 },
    commentNum: Number,
    options: Object,
    category: String,
    tags: Array
});

let category = new Schema({
    name: String,
    pathName: String,
    postID: {
        type: Array,
        default: []
    }
});

let tag = new Schema({
    name: String,
    pathName: String,
    postID: {
        type: Array,
        default: []
    }
});

let option = new Schema({
    key: String,
    value: Schema.Types.Mixed,
    desc: String,
});


let user = new Schema({
    name: String,
    displayName: String,
    password: String,
    email: String,
    createdAt: {type: String, default: '' },
    createdIP: String,
    lastLoginTime: String,
    lastLoginIP: String,
});

let version = new Schema({
    name: String,
    version: String,
    path: String,
});

post = mongoose.model('post', post),
category = mongoose.model('category', category),
option = mongoose.model('option', option),
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
}