const HapiSwagger = require('hapi-swagger')
const Pack = require('../../package')

const swaggerOptions = {
  info: {
    title: 'Hapi Example',
    version: Pack.version,
    description: 'This is a sample example of API documentation.'
  },
  grouping: 'tags',
  sortEndpoints: 'ordered',
  documentationPath: '/docs',
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }]
}

module.exports = {
  plugin: HapiSwagger,
  options: swaggerOptions,
}
