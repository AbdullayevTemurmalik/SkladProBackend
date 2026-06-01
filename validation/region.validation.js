const Joi = require("joi");

const regionSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

function ValidateRegion(region) {
  return regionSchema.validate(region);
}

module.exports = { ValidateRegion };
