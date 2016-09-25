let config = require('../conf/config');
let mongoose = require('mongoose');
let log = require('../utils/log');

mongoose.Promise = require('bluebird');

let mongoUrl = '127.0.0.1:27017/koa_rest_mongoose';

mongoose.connect(mongoUrl);
// mongoose.connect(config.mongoHost,config.mongoDatabase,config.mongoPort);

let db = mongoose.connection;

db.on('error', log.error.bind(log, "connect error:"));
db.once('open', callback => console.log('MongoDB is ready!'));

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
    options: String,
});

let category = new Schema({
    name: String,
    pid: Number,
    pathName: String,
});

let option = new Schema({
    key: String,
    value: String,
    desc: String,
});

let postCategory = new Schema({
    postID: String,
    categoryID: String,
});

let postTag = new Schema({
    postID: String,
    tagID: String,
});

let tag = new Schema({
    name: String,
    pathName: String,
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

post.methods.next = async function() {
  var model = this.model("post");
  let quote;
  try{
    quote = await model.findOne().where('_id').gt(this._id).sort({_id: 1 }).exec();
  }catch(err){console.log(err)}

    if (quote) {
        return quote;
    } else {
        return {};
    }
};

post.methods.prev = async function() {
  var model = this.model("post");
  let quote;
  try{
    quote = await model.findOne().where('_id').lt(this._id).sort({_id: -1 }).exec();
  }catch(err){console.log(err)}

    if (quote) {
        return quote;
    } else {
        return {};
    }
};

post = mongoose.model('post', post),
category = mongoose.model('category', category),
option = mongoose.model('option', option),
postCategory = mongoose.model('postCategory', postCategory),
postTag = mongoose.model('postTag', postTag),
tag = mongoose.model('tag', tag),
user = mongoose.model('user', user);


module.exports = {
    post,
    category,
    option,
    postCategory,
    postTag,
    tag,
    user,
}