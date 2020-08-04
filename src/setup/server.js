const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const jtw = require('jsonwebtoken')
const hapiAuthJWT = require('hapi-auth-jwt2')
const HapiSwaggerPlugin = require('./swagger')
const config = require('../config')
const { getRoutes } = require('./routes')

const { host, port, secret } = config

const people = {
  // our 'users database'
  56732: {
    id: 56732,
    name: 'Jen Jones',
    scope: ['a', 'b']
  }
};

const validate = async function (decoded, request, h) {
  if (!people[decoded.id]) {
    return { isValid: false }
  } else {
    return { isValid: true }
  }
}

const server = Hapi.server({
  port,
  host,
})

async function loadPlugins(server) {
  // Register JWT plugin
  const appPlugins = [
    hapiAuthJWT,
    Inert,
    Vision,
    HapiSwaggerPlugin,
    require('./app.config')
  ]

  // Register strategy
  
  // await server.auth.strategy('jwt', 'jwt', {
  //   key: secret,
  //   validate,
  //   verifyOptions: { ignoreExpiration: true },
  // })

  // await server.auth.default('jwt')

  // Register routes
  const routes = getRoutes()

  await server.register(appPlugins.concat(routes))
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
