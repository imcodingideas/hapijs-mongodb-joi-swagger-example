const PostServiceFactory = require('./post.service.factory')
const joiPostSchema = require('./post.schema')
const joiIdPostSchema = require('./id-post.schema')

module.exports = {
  name: 'postUpdateRoute',
  version: '1.0.0',
  register(server) {
    const factory = new PostServiceFactory(server)

    const service = factory.getService()
    server.route({
      method: 'PUT',
      path: '/api/v1/post/{id}',
      config: {
        auth: 'jwt',
        tags: ['api', 'Post'],
        validate: {
          params: joiIdPostSchema,
          payload: joiPostSchema,
        },
        description: 'Update post route',
        notes: 'Protected route that is protected by by the jwt strategy.',

        handler: async (request, h) => {
          try {
            return await service.update(request.params.id)
          } catch (error) {
            return h.response(error).code(500)
          }
        },
      },
    })
  },
}
