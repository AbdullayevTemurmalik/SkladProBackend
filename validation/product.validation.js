const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  brand: Joi.string().allow("", null),
  sku: Joi.string().allow("", null),
  height: Joi.number().optional(),
  width: Joi.number().optional(),
  length: Joi.number().optional(),
  year: Joi.number().integer().optional(),
  stock: Joi.number().integer().optional(),
  categoryId: Joi.number().integer().optional(),
  unitId: Joi.number().integer().optional(),
  warehouseId: Joi.number().integer().optional(),
  image: Joi.string().allow("", null),
});

function ValidateProduct(product) {
  return productSchema.validate(product);
}

module.exports = { ValidateProduct };
