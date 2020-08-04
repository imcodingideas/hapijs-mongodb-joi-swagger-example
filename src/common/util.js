const jwt = require('jsonwebtoken')
const { secret } = require('../config')

exports.generateToken = (user) => {
  const { email } = user

  return jwt.sign({ id: user._id, email }, secret, {
    algorithm: 'HS256',
  })
}