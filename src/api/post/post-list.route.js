const postServiceFactory = require('./post.service.factory')

module.exports = {
  name: 'postListRoute',
  version: '1.0.0',
  register(server) {
    const factory = new postServiceFactory(server)
    // const service = factory.getService()

    server.route({
      method: 'GET',
      path: '/api/v1/post',
      config: {
        auth: 'jwt',
        tags: ['api', 'post'],
        description: 'List all posts route',
        notes: 'Protected route that is protected by by the jwt strategy.',
        
        handler: async (request, h) => {

          // return await service.list()
          
          return h.response({
            text: 'You used the token!',
            token: `${request.headers.authorization}`
          })
        },
      },
    })
  },
}
