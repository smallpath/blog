const redis = require('../model/redis');
const tokenService = require('../service/token');
const { user: model } = require('../model/mongo');

exports.login = async function (ctx, next) {
  var error, result;

  let users, user;

  try {
    users = await model.find({ name: ctx.request.body.name }).exec();
    user = {
      name: users[0].name,
      timestamp: (new Date()).valueOf(),
    };

    let password = users[0].password;


    if (password == ctx.request.body.password) {

      let token = tokenService.createToken(user);

      redis.set("token", token, 'EX', tokenService.expiresIn, ()=>{
        
      });

      return ctx.body = { 
          status: 'success',  
          token: token 
        };

    } else {
      return ctx.body = {
          status: 'fail', 
          description: 'Get token failed. Check the password' 
        };
    }

  } catch (_error) {
    error = _error;
    return ctx.body = {
          status: 'fail', 
          description: 'Get token failed. Check the name', 
        };
  }

};


exports.logout = async function (ctx, next) {
  const headers = ctx.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return ctx.body = {
          status: 'fail', 
          description: err 
        };
  }

  if (!token) {
    return ctx.body = {
          status: 'fail', 
          description: 'Token not found'
        };
  }

  const result = tokenService.verifyToken(token);

  if (result == false) {
    return ctx.body = {
          status: 'fail', 
          description: 'Token verify failed'
        };
  }else{
    await redis.del('token');
    return ctx.body =  {
          status: 'success', 
          description: 'Token deleted'
        };
  }

};

exports.permission =  async function (ctx, next) {
  const headers = ctx.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return ctx.body = {
          status: 'fail', 
          description:err
        };;
  }

  if (!token) {
    return ctx.body = {
          status: 'fail', 
          description: 'Token not found'
        };
        
  }

  const result = tokenService.verifyToken(token);
  if (result == false) {
    return ctx.body = {
          status: 'fail', 
          description: 'Token verify failed '
        };
  }


  let reply = await redis.getAsync("token");


  if (reply === token) {
    return next();
  } else {

    return ctx.body = {
          status: 'fail', 
          description: 'Token invalid '
        };
  }

}

