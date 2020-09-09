const mongoose = require('mongoose')
const joiPostSchemma = require('./post.schema')
const Joigoose = require('joigoose')(mongoose)

const { Schema } = mongoose
mongoose.Promise = global.Promise

const postSchema = new Schema(Joigoose.convert(joiPostSchemma))

module.exports = mongoose.model('Post', postSchema)
