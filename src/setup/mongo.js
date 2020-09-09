const mongoose = require('mongoose')
const { loadModels } = require('./models')
const config = require('../config')

const mongoSetup = {
  name: 'mongoSetup',
  version: '1.0.0',
  async register(server, options, next) {
    const {
      dbConfig: { url},
    } = config

    const db = loadModels()

    // Connect to the Database
    mongoose.Promise = global.Promise
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true
    })

    server.decorate('server', 'db', db)

    mongoose.connection.on('error', (err) => {
      console.error(`Error → ${err.message}`)
    })
  },
}

module.exports = mongoSetup