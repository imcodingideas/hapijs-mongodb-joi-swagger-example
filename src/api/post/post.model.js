
const mongoose = require('mongoose')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const postSchema = new Schema({
    title: String
})

module.exports = mongoose.model('Post', postSchema)