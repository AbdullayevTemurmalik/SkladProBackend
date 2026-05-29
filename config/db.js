const { Sequelize } = require('sequelize');
require('dotenv').config();

// Railway dagi bazaga ulanish kodi
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://postgres:LZhmLnBOdZCQeSgndLoGpVedSjPObEjQ@zephyr.proxy.rlwy.net:42668/railway',
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
