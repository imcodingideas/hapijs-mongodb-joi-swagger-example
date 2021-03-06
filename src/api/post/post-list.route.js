const PostServiceFactory = require('./post.service.factory')

module.exports = {
  name: 'postListRoute',
  version: '1.0.0',
  register(server) {
    const factory = new PostServiceFactory(server)
    const service = factory.getService()

    server.route({
      method: 'GET',
      path: '/api/v1/post',
      config: {
        auth: 'jwt',
        tags: ['api', 'Post'],
        description: 'List all posts route',
        notes: 'Protected route that is protected by by the jwt strategy.',

        handler: async (request, h) => {
          try {
            return await service.list()
          } catch (error) {
            return h.response(error).code(500)
          }
        },
      },
    })
  },
}
