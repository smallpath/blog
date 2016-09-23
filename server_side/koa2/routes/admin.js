const redis = require('../model/redis');
const tokenService = require('../service/token');

exports.login = async function (next) {
  let model = models.user;
  var error, result;

  let users, user;

  try {
    users = await model.find({ name: this.request.body.name }).exec();
    console.log(users);
    user = {
      name: users[0].name,
      password: users[0].password
    }


    if (user.password == this.request.body.password) {

      let token = tokenService.createToken(user);

      redis.set("token", token, 'EX', tokenService.expiresIn, ()=>{
        
      });

      console.log(token);

      return this.body = { token: token };

    } else {
      return this.body = 'Get token fails. Check name and password';
    }

  } catch (_error) {
    error = _error;
    return this.body = _error;
  }

};


exports.logout = async function (next) {
  const headers = this.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return this.body = err;
  }

  if (!token) {
    return this.body = 'Token not found';
  }

  const result = tokenService.verifyToken(token);

  if (result == false) {
    return this.body = 'Token verify failed ';
  }else{
    //redis.
  }

};