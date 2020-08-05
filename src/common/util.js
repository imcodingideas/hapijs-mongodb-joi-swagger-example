const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

exports.generateToken = (user) => {
  const { email } = user

  return jwt.sign({ id: user._id, email }, jwtSecret, {
    algorithm: 'HS256',
  })
}

exports.validate = async token => {
  if (typeof token !== 'string') {
    return { isValid: false }
  }

  return await jwt.verify(token, jwtSecret, async function (err, decoded) {
    if (err) {
      return { isValid: false }
    }

    return { isValid: true, decoded }
  })

}