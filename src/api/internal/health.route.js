module.exports = {
  name: 'healthRoute',
  version: '1.0.0',
  register(server) {
    server.route({
      method: 'GET',
      path: '/api/v1/health',
      config: {
        tags: ['api', 'Health'],
        auth: false,
        description: 'Health',
        notes: 'Returns a health message',
        handler: () => {
          return { message: 'everything ok!' }
        },
      },
    })
  },
}
