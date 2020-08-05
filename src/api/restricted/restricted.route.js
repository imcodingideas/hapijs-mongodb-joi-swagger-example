module.exports = {
  name: 'restrictedRoute',
  version: '1.0.0',
  register(server) {
    server.route({
      method: 'GET',
      path: '/api/v1/restricted',
      config: {
        auth: false,
        // auth: 'jwt',
        tags: ['api', 'Restricted'],
        description: 'Protected route',
        notes: 'Protected route that is protected by by the jwt strategy.',
        handler: async (request, h) => {
          console.log(h)
          return null

          // return h.response({
          //   text: 'You used a Token!'
          // })
        },
      },
    })
  },
}
