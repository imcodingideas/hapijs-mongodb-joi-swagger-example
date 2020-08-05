const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

exports.generateToken = (user) => {
  const { email } = user

  return jwt.sign({ id: user._id, email }, jwtSecret, {
    algorithm: 'HS256',
  })
}

exports.validate = async token => {
  try {
    if (typeof token !== 'string') {
      return { isValid: false }
    }

    const decoded = await jwt.verify(token, jwtSecret)
    if(!decoded) return { isValid: false }

    return {
      isValid: true
    }

  } catch (err) {
    return { isValid: false }
  }
}