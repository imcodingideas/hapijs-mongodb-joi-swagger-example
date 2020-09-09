const Boom = require('@hapi/boom')

class PostService {
  constructor(postSchema) {
    if (!postSchema) {
      const errorMessage = 'PostService is missing db dependency!'
      console.trace(errorMessage)

      throw Boom.internal(errorMessage)
    }
    this.postSchema = postSchema
  }

  async list() {
    const post = await this.postSchema.find()

    return post
  }

  async create(post) {
    const postSchema = new this.postSchema(post)
    const postSaved = await postSchema.save()

    return postSaved
  }

  async delete(id) {
    return await this.postSchema.findByIdAndDelete(id)
  }

  async update(id, post) {
    const updatedPost = await this.postSchema.findByIdAndUpdate(id, post, {
      new: true,
    })

    return updatedPost
  }
}

module.exports = PostService
