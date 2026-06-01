const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  firstname: Joi.string().allow("", null),
  lastname: Joi.string().allow("", null),
  gender: Joi.string().valid("erkak", "ayol").optional(),
  age: Joi.number().integer().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("admin", "user").optional(),
});

function ValidateUser(user) {
  return userSchema.validate(user);
}

module.exports = { ValidateUser };
