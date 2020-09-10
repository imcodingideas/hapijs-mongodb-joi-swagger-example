const PostServiceFactory = require('./post.service.factory')
const joiIdPostSchema = require('./id-post.schema')

module.exports = {
  name: 'postListOneRoute',
  version: '1.0.0',
  register(server) {
    const factory = new PostServiceFactory(server)

    const service = factory.getService()
    server.route({
      method: 'GET',
      path: '/api/v1/post/{id}',
      config: {
        auth: 'jwt',
        tags: ['api', 'Post'],
        validate: {
          params: joiIdPostSchema,
        },
        description: 'Delete post route',
        notes: 'Protected route that is protected by by the jwt strategy.',

        handler: async (request, h) => {
          try {
            const post = await service.listOneById(request.params.id)
            return h.response(post)
          } catch (error) {
            return h.response(error).code(500)
          }
        },
      },
    })
  },
}
