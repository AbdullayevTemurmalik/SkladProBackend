const { Region, Warehouse, Category, Unit, Product } = require('../models');

exports.seedData = async (req, res) => {
  try {
    const regions = await Region.bulkCreate([
      { name: 'Toshkent' },
      { name: 'Samarqand' },
      { name: 'Buxoro' }
    ]);
    
    const units = await Unit.bulkCreate([
      { name: 'dona' },
      { name: 'kg' },
      { name: 'litr' }
    ]);

    const categories = await Category.bulkCreate([
      { name: 'Elektronika' },
      { name: 'Oziq-ovqat' },
      { name: 'Kiyim' }
    ]);

    let warehouses = [];
    for (let r of regions) {
      warehouses.push({ name: `${r.name} Sklad 1`, regionId: r.id });
      warehouses.push({ name: `${r.name} Sklad 2`, regionId: r.id });
    }
    const createdWarehouses = await Warehouse.bulkCreate(warehouses);

    res.status(200).json({ message: 'Base data seeded successfully! You can add products via API.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
