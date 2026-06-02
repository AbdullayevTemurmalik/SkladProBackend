const { Sequelize } = require('sequelize');
require('dotenv').config();

const isRailway = process.env.RAILWAY_ENVIRONMENT === 'true' || process.env.RAILWAY_STATIC_URL;

let dbUrl = process.env.DATABASE_URL;

// Agar kompyuterdan turib ulanmoqchi bo'lsa va DATABASE_URL kiritilmagan bo'lsa:
if (!isRailway && !dbUrl) {
  console.log('\x1b[31m%s\x1b[0m', '======================================================');
  console.log('\x1b[31m%s\x1b[0m', 'XATOLIK: Railway bazasiga tashqaridan ulanish uchun');
  console.log('\x1b[31m%s\x1b[0m', 'Siz .env faylingizga DATABASE_URL ni kiritishingiz shart!');
  console.log('\x1b[31m%s\x1b[0m', 'Railway Dashboard -> Postgres -> Connect -> Postgres Connection URL ni nusxalab oling.');
  console.log('\x1b[31m%s\x1b[0m', 'Va .env fayliga quydagicha qo\'shing:');
  console.log('\x1b[33m%s\x1b[0m', 'DATABASE_URL=postgresql://postgres:...');
  console.log('\x1b[31m%s\x1b[0m', '======================================================');
  process.exit(1);
}

// Default eski URL agar kerak bo'lib qolsa (Lekin ishlamaydi parol xato bo'lsa)
if (!dbUrl) {
  dbUrl = 'postgresql://postgres:LZhmLnBOdZCQeSgndLoGpVedSjPObEjQ@zephyr.proxy.rlwy.net:42668/railway';
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
