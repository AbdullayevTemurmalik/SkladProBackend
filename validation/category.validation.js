const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

function ValidateCategory(category) {
  return categorySchema.validate(category);
}

module.exports = { ValidateCategory };
