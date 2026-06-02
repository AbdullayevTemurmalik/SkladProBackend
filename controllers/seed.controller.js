const { Region, Warehouse, Category, Unit, User, sequelize } = require('../models');
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
    const regions = await Region.bulkCreate(regionsList);

    await Category.bulkCreate([
      { name: "Elektronika" }, { name: "Kiyim-kechak" }, { name: "Oziq-ovqat" },
      { name: "Maishiy texnika" }, { name: "Qurilish mollari" }
    ]);

    await Unit.bulkCreate([
      { name: "dona" }, { name: "kg" }, { name: "litr" }, { name: "metr" }, { name: "quti" }
    ]);


    let warehouses = [];
    for (let r of regions) {
      warehouses.push({ name: `${r.name.replace(" viloyati", "")} Sklad 1`, regionId: r.id });
      warehouses.push({ name: `${r.name.replace(" viloyati", "")} Sklad 2`, regionId: r.id });
    }
    await Warehouse.bulkCreate(warehouses);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
      firstname: "Asosiy",
      lastname: "Admin"
    });

    res.status(200).json({ message: "Baza toza holatda tayyorlandi! 12 viloyat, har biriga omborlar, 5 kategoriya, 5 o'lchov birligi va Admin (admin/123456) saqlandi." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
