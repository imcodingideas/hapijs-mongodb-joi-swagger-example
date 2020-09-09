const loginSchema = require('./login.schema')
const LoginService = require('./login.service')

module.exports = {
  name: 'loginRoute',
  version: '1.0.0',
  register(server) {
    const service = new LoginService()

    server.route({
      method: 'POST',
      path: '/api/v1/login',
      config: {
        tags: ['api', 'Auth'],
        validate: {
          payload: loginSchema,
        },
        auth: false,
        description: 'Auth Route',
        notes: 'User Login Route that returns a valid JWT',
        handler: async (request, h) => {
          const { email } = request.payload

          return await service.create({ email })
        },
      },
    })
  },
}
