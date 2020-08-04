class LoginService {
  async create({ email, password }) {
    return { email, password }
  }
}

module.exports = LoginService
