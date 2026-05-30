const { Product, Warehouse, Category, Unit } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const data = await Product.findAll(); // Ulanishlar (includes) olib tashlandi
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.search = async (req, res) => {
  try {
    const { regionId, warehouseId, name } = req.query;
    let whereCondition = {};

    if (name) {
      whereCondition.name = { [Op.iLike]: `%${name}%` };
    }

    if (warehouseId) {
      whereCondition.warehouseId = warehouseId;
    } else if (regionId) {
      // Include ishlatmasdan viloyat bo'yicha tovarlarni izlash usuli:
      // Oldin shu viloyatga tegishli barcha skladlar topiladi
      const warehouses = await Warehouse.findAll({ where: { regionId }, attributes: ['id'] });
      const warehouseIds = warehouses.map(w => w.id);

      // Keyin shu skladlardagi tovarlar izlanadi
      whereCondition.warehouseId = warehouseIds;
    }

    const data = await Product.findAll({
      where: whereCondition
      // Ulanishlar (includes) olib tashlandi
    });
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id); // Ulanishlar olib tashlandi
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    const errDetails = {
      name: error.name,
      message: error.message,
      parent: error.parent ? error.parent.message : null,
      sql: error.sql
    };
    require('fs').writeFileSync('/home/temurmalik/Desktop/error.txt', JSON.stringify(errDetails, null, 2));
    res.status(500).json({ error: errDetails.parent || error.message });
  }
};

exports.bulkUpload = async (req, res) => {
  try {
    const { csvData } = req.body;
    if (!csvData) return res.status(400).json({ error: "Fayl matni topilmadi" });

    // Hamma carriage-return (\r) larni tozalab, bo'sh qatorlarni olib tashlaymiz
    const cleanedData = csvData.replace(/\r/g, '');
    const lines = cleanedData.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return res.status(400).json({ error: "Faylda yetarli ma'lumot yo'q yoki noto'g'ri format" });

    const separator = lines[0].includes('\t') ? '\t' : ',';
    const headers = lines[0].split(separator).map(h => h.trim().toLowerCase());

    const categories = await Category.findAll();
    const warehouses = await Warehouse.findAll();
    const units = await Unit.findAll();

    const newProducts = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(separator);
      const rowData = {};

      headers.forEach((h, index) => {
        rowData[h] = cols[index]?.trim() || '';
      });

      const name = rowData['nomi'] || rowData['name'] || rowData['mahsulot'] || 'Nomsiz';
      if (!name || name === 'Nomsiz') continue;

      const brand = rowData['brend'] || rowData['brand'] || 'Brendsiz';
      const sku = rowData['sku'] || rowData['kod'] || `SKU-${Date.now()}-${i}`;
      const stock = Number(rowData['qoldiq'] || rowData['stock'] || rowData['soni']) || 0;
      const year = Number(rowData['yili'] || rowData['yil'] || rowData['year']) || 2024;
      const image = rowData['rasm'] || rowData['image'] || rowData['img'] || rowData['rasmurl'] || 'https://picsum.photos/400/400';

      const catName = rowData['kategoriya'] || rowData['category'] || '';
      const whName = rowData['ombor'] || rowData['warehouse'] || rowData['sklad'] || '';
      const unitName = rowData['birlik'] || rowData['unit'] || rowData['ulchov'] || '';

      const height = Number(rowData['boyi'] || rowData['height']) || 10;
      const width = Number(rowData['eni'] || rowData['width']) || 10;
      const length = Number(rowData['uzunligi'] || rowData['uzunlik'] || rowData['length']) || 10;

      const cat = categories.find(c => c.name.toLowerCase() === catName.toLowerCase());
      const wh = warehouses.find(w => w.name.toLowerCase() === whName.toLowerCase());
      const un = units.find(u => u.name.toLowerCase() === unitName.toLowerCase());

      newProducts.push({
        name, brand, sku, stock, year, image, height, width, length,
        categoryId: cat ? cat.id : (categories[0]?.id || 1),
        warehouseId: wh ? wh.id : (warehouses[0]?.id || 1),
        unitId: un ? un.id : (units[0]?.id || 1),
      });
    }

    if (newProducts.length > 0) {
      await Product.bulkCreate(newProducts);
    }

    res.status(201).json({ message: `${newProducts.length} ta mahsulot muvaffaqiyatli qo'shildi!`, count: newProducts.length });
  } catch (error) {
    console.error("Bulk Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const data = await Product.findByPk(req.params.id); // Ulanishlar olib tashlandi
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.removeAll = async (req, res) => {
  try {
    await Product.destroy({ where: {} });
    res.status(200).json({ message: "Barcha mahsulotlar o'chirildi" });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
