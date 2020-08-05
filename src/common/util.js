const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')
const { jwtSecret } = require('../config')

exports.generateToken = (user) => {
  const { email } = user

  return jwt.sign({ id: user._id, email }, jwtSecret, {
    algorithm: 'HS256',
  })
}

exports.validate = (decoded, request) => {
  try {
    const { token } = request.auth

    if (typeof token !== 'string') {
      return { isValid: false }
    }

    // jwt.verify is not async 
    return jwt.verify(token, jwtSecret, function(err, decoded) {
      if(!decoded) return { isValid: false }

      return {
        isValid: true
      }
    })

  } catch (err) {
    return Boom.unauthorized('Authentication failed');
  }
}