const Joi = require('@hapi/joi')

const loginSchema = Joi.object({
  email: Joi.string().email().required().example('example@docs.com'),
}).label('LoginPayload')

module.exports = loginSchema
