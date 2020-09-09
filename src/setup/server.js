const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const hapiAuthJWT = require('hapi-auth-jwt2')
const HapiSwaggerPlugin = require('./swagger')
const config = require('../config')
const { validate } = require('../common/util')
const { getRoutes } = require('./routes')
const DB = require('./mongo')

const { host, port, jwtSecret } = config

const server = Hapi.server({
  port,
  host,
})


async function loadPlugins(server) {
  const appPlugins = [
    hapiAuthJWT,
    Inert,
    Vision,
    HapiSwaggerPlugin,
    DB,
    require('./app.config'),
  ]

  await server.register(appPlugins)

  // Register strategy
  server.auth.strategy('jwt', 'jwt', {
    validate,
    key: jwtSecret,
    verifyOptions: { algorithms: ['HS256'] },
  })

  server.auth.default('jwt')

  // Register routes
  const routes = getRoutes()

  await server.register(routes)
}

exports.isInit = false

exports.runInit = async () => {
  if (!this.isInit) {
    await loadPlugins(server)
    await server.initialize()

    this.isInit = true
  }
}

exports.init = async () => {
  await this.runInit()
  return server
}

exports.start = async () => {
  await this.runInit()
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
  return server
}
