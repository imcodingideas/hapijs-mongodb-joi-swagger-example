const PostServiceFactory = require('./post.service.factory')
const joiIdPostSchema = require('./id-post.schema')

module.exports = {
  name: 'postDeleteRoute',
  version: '1.0.0',
  register(server) {
    const factory = new PostServiceFactory(server)

    const service = factory.getService()
    server.route({
      method: 'DELETE',
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
            const deletedPost = await service.delete(request.params.id)
            return h.response(deletedPost)
          } catch (error) {
            return h.response(error).code(500)
          }
        },
      },
    })
  },
}
