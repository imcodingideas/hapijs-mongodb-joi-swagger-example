const PostServiceFactory = require('./post.service.factory')
const joiPostSchema = require('./post.schema')

module.exports = {
  name: 'postCreateRoute',
  version: '1.0.0',
  register(server) {
    const factory = new PostServiceFactory(server)

    const service = factory.getService()
    server.route({
      method: 'POST',
      path: '/api/v1/post',
      config: {
        auth: 'jwt',
        tags: ['api', 'Post'],
        validate: {
          payload: joiPostSchema,
        },
        description: 'List all posts route',
        notes: 'Protected route that is protected by by the jwt strategy.',
        handler: async (request, h) => {
          try {
            return await service.create(request.payload)
          } catch (error) {
            return h.response(error).code(500)
          }
        },
      },
    })
  },
}
