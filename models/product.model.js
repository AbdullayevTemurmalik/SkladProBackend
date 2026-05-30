const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  brand: { type: DataTypes.STRING },
  sku: { type: DataTypes.STRING },
  height: { type: DataTypes.FLOAT },
  width: { type: DataTypes.FLOAT },
  length: { type: DataTypes.FLOAT },
  year: { type: DataTypes.INTEGER },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  categoryId: { type: DataTypes.INTEGER },
  unitId: { type: DataTypes.INTEGER },
  warehouseId: { type: DataTypes.INTEGER },
  image: { type: DataTypes.TEXT }
}, { timestamps: true });

module.exports = Product;
