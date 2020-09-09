const Joi = require('@hapi/joi')

const joiIdPostSchema = Joi.object({
  id: Joi.string().required()
}).label('IdPostSchema')

module.exports = joiIdPostSchema
