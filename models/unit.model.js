const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Unit = sequelize.define('unit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING } // allowNull olib tashlandi
}, { timestamps: true });

module.exports = Unit;
