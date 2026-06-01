const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING },
  firstname: { type: DataTypes.STRING },
  lastname: { type: DataTypes.STRING },
  gender: { type: DataTypes.ENUM("erkak", "ayol") },
  age: { type: DataTypes.INTEGER },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" }
}, { timestamps: true });

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
