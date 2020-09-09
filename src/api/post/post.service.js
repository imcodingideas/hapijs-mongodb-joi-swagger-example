const Boom = require('@hapi/boom')

class PostService {
  constructor(campaignModel) {
    if (!campaignModel) {
      const errorMessage = 'PostService is missing db dependency!'
      console.trace(errorMessage)

      throw Boom.internal(errorMessage)
    }
    this.postSchema = postSchema
  }

  async list() {}
}

module.exports = PostService