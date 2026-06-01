const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Warehouse = sequelize.define('warehouse', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  regionId: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = Warehouse;
