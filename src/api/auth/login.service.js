const { generateToken } = require('../../common/util')

class LoginService {
  async create({ email }) {
    const user = {
      _id: 1,
      email,
    }

    const token = generateToken(user)

    return { token }
  }
}

module.exports = LoginService
