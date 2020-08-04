const Joi = require('@hapi/joi')

const loginSchema = Joi.object({
  email: Joi.string().email().required().example('example@docs.com'),
  password: Joi.string().required().example('password'),
}).label('LoginPayload')

module.exports = loginSchema
