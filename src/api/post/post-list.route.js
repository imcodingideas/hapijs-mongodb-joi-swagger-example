const postServiceFactory = require('./post.service.factory')
const joiPostSchema = require('./post.schema')
const joiIdPostSchema = require('./id-post.schema')

module.exports = {
  name: 'postListRoute',
  version: '1.0.0',
  register(server) {
    const factory = new postServiceFactory(server)
    const service = factory.getService()

    server.route({
      method: 'GET',
      path: '/api/v1/post',
      config: {
        auth: 'jwt',
        tags: ['api', 'post'],
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

    server.route({
      method: 'POST',
      path: '/api/v1/post',
      config: {
        auth: 'jwt',
        tags: ['api', 'post'],
        validate: {
          payload: joiPostSchema,
        },
        description: 'Add new post route',
        notes: 'Protected route that is protected by by the jwt strategy.',

        handler: async (request, h) => {
          try {
            return await service.addPost(request.payload)
          } catch (error) {
            return h.response(error).code(500)
          }
          
        },
      },
    })

    server.route({
      method: 'DELETE',
      path: '/api/v1/post/{id}',
      config: {
        auth: 'jwt',
        tags: ['api', 'post'],
        validate: {
          params: joiIdPostSchema,
        },
        description: 'Delete post route',
        notes: 'Protected route that is protected by by the jwt strategy.',

        handler: async (request, h) => {
          try {
            const deletedPost = await service.deletePost(request.params.id)
            return h.response(deletedPost)
          } catch (error) {
            return h.response(error).code(500)
          }
        },
      },
    })


    server.route({
      method: 'PUT',
      path: '/api/v1/post/{id}',
      config: {
        auth: 'jwt',
        tags: ['api', 'post'],
        validate: {
          params: joiIdPostSchema,
          payload: joiPostSchema
        },
        description: 'Update post route',
        notes: 'Protected route that is protected by by the jwt strategy.',

        handler: async (request, h) => {
          try {
            const updatedPost = await service.updatePost(request.params.id, request.payload)
            return h.response(updatedPost)
          } catch (error) {
            return h.response(error).code(500)
          }
        },
      },
    })





  },
}
