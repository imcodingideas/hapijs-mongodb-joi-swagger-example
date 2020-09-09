const Joi = require('@hapi/joi')

const joiPostSchemma = Joi.object({
  author: Joi.string().required().example('John Lennon'),
  content: Joi.string()
    .required()
    .example(
      "If everyone demanded peace instead of another television set, then there'd be peace."
    ),
}).label('PostSchema')

module.exports = joiPostSchemma
