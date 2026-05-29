const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Region = sequelize.define('region', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING } // allowNull olib tashlandi
}, { timestamps: true });

module.exports = Region;
