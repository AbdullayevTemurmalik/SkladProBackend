const Joi = require("joi");

const unitSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
});

function ValidateUnit(unit) {
  return unitSchema.validate(unit);
}

module.exports = { ValidateUnit };
