const config = {
  host: '0.0.0.0',
  port: '8080',
  jwtSecret: 'hapi',
  dbConfig: {
    url: 'mongodb://localhost:27017/example'
  }
}

module.exports = config
