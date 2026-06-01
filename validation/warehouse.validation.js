const Joi = require("joi");

const warehouseSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  regionId: Joi.number().integer().required(),
  userId: Joi.number().integer().optional(),
});

function ValidateWarehouse(warehouse) {
  return warehouseSchema.validate(warehouse);
}

module.exports = { ValidateWarehouse };
