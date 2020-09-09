const config = {
  host: 'localhost',
  port: '3000',
  jwtSecret: 'hapi',
  dbConfig: {
    url: 'mongodb://localhost:27017/example'
  }
}

module.exports = config