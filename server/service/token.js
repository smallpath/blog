const jwt = require('jsonwebtoken')
const config = require('../conf/config')

let secret = config.tokenSecret

let expiresIn = config.tokenExpiresIn

module.exports = {

  createToken(userinfo) {
    let token = jwt.sign(userinfo, secret, {
      expiresIn
    })
    return token
  },

  verifyToken(token) {
    if (!token) {
      return false
    }

    try {
      let result = jwt.verify(token, secret)
      return result
    } catch (err) {
      return false
    }
  },

  expiresIn

}
