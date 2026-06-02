const { Sequelize } = require('sequelize');
require('dotenv').config();

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl && process.env.DB_HOST && !process.env.DB_HOST.includes('railway.internal')) {
  dbUrl = 'postgresql://postgres:LZhmLnBOdZCQeSgndLoGpVedSjPObEjQ@zephyr.proxy.rlwy.net:42668/railway';
} else if (!dbUrl) {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || 5432;
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || process.env.BD_NAME || 'railway';
  dbUrl = `postgresql://${user}:${password}@${host}:${port}/${dbName}`;
}


const sequelize = new Sequelize(
  dbUrl,
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: dbUrl.includes('internal') ? {} : {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
