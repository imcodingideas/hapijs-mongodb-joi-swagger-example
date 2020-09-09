const AbstractServiceFactory = require('../../common/AbstractServiceFactory')
const PostService = require('./post.service')

class PostServiceFactory extends AbstractServiceFactory {
  serviceConstructor(server) {
    return function () {
      const { db } = server
      const postModel = db.Post

      return new PostService(postModel)
    }
  }
}

module.exports = PostServiceFactory
