const { Region, Category, Unit, User, sequelize } = require('../models');
const bcrypt = require('bcrypt');

exports.seedData = async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    const regionsList = [
      { name: "Andijon viloyati" }, { name: "Buxoro viloyati" }, { name: "Fargʻona viloyati" },
      { name: "Jizzax viloyati" }, { name: "Xorazm viloyati" }, { name: "Namangan viloyati" },
      { name: "Navoiy viloyati" }, { name: "Qashqadaryo viloyati" }, { name: "Samarqand viloyati" },
      { name: "Sirdaryo viloyati" }, { name: "Surxondaryo viloyati" }, { name: "Toshkent viloyati" }
    ];
    await Region.bulkCreate(regionsList);

    await Category.bulkCreate([
      { name: "Elektronika" }, { name: "Kiyim-kechak" }, { name: "Oziq-ovqat" },
      { name: "Maishiy texnika" }, { name: "Qurilish mollari" }
    ]);

    await Unit.bulkCreate([
      { name: "dona" }, { name: "kg" }, { name: "litr" }, { name: "metr" }, { name: "quti" }
    ]);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
      firstname: "Asosiy",
      lastname: "Admin"
    });

    res.status(200).json({ message: "Baza toza holatda tayyorlandi! 12 viloyat, 5 kategoriya, 5 o'lchov birligi va Admin (admin/123456) saqlandi. Qolganlarini admin paneldan qo'shishingiz mumkin." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
