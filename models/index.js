const sequelize = require('../config/db');
const Region = require('./region.model');
const Warehouse = require('./warehouse.model');
const Category = require('./category.model');
const Unit = require('./unit.model');
const Product = require('./product.model');

Region.hasMany(Warehouse, { foreignKey: 'regionId', constraints: false });
Warehouse.belongsTo(Region, { foreignKey: 'regionId', constraints: false });

Warehouse.hasMany(Product, { foreignKey: 'warehouseId', constraints: false });
Product.belongsTo(Warehouse, { foreignKey: 'warehouseId', constraints: false });

Category.hasMany(Product, { foreignKey: 'categoryId', constraints: false });
Product.belongsTo(Category, { foreignKey: 'categoryId', constraints: false });

Unit.hasMany(Product, { foreignKey: 'unitId', constraints: false });
Product.belongsTo(Unit, { foreignKey: 'unitId', constraints: false });

module.exports = {
  sequelize,
  Region,
  Warehouse,
  Category,
  Unit,
  Product
};
