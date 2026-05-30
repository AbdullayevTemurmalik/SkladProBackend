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
    if (lines.length === 0) return res.status(400).json({ error: "Fayl bo'sh" });

    let separator = ',';
    if (lines[0].includes('\t')) separator = '\t';
    else if (lines[0].includes(';')) separator = ';';
    const headers = lines[0].split(separator).map(h => h.trim().toLowerCase());
    
    // Sarlavha (Header) bor yo'qligini aniqlaymiz
    const hasHeaders = headers.some(h => ['nomi', 'name', 'mahsulot', 'brend', 'brand', 'sku', 'kategoriya', 'qoldiq', 'yili', 'ombor', 'birlik', 'rasm'].includes(h));

    const categories = await Category.findAll();
    const warehouses = await Warehouse.findAll();
    const units = await Unit.findAll();

    const newProducts = [];
    const startIndex = hasHeaders ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const cols = lines[i].split(separator);
      
      let name, brand, sku, stock, year, image, catName, whName, unitName, height, width, length;

      if (hasHeaders) {
        const rowData = {};
        headers.forEach((h, index) => {
          rowData[h] = cols[index]?.trim() || '';
        });

        name = rowData['nomi'] || rowData['name'] || rowData['mahsulot'];
        brand = rowData['brend'] || rowData['brand'];
        sku = rowData['sku'] || rowData['kod'];
        stock = rowData['qoldiq'] || rowData['stock'] || rowData['soni'];
        year = rowData['yili'] || rowData['yil'] || rowData['year'];
        image = rowData['rasm'] || rowData['image'] || rowData['img'] || rowData['rasmurl'];
        catName = rowData['kategoriya'] || rowData['category'];
        whName = rowData['ombor'] || rowData['warehouse'] || rowData['sklad'];
        unitName = rowData['birlik'] || rowData['unit'] || rowData['ulchov'];
        height = rowData['boyi'] || rowData['height'];
        width = rowData['eni'] || rowData['width'];
        length = rowData['uzunligi'] || rowData['uzunlik'] || rowData['length'];
      } else {
        // Agar sarlavha umuman bo'lmasa, standart index orqali o'qiymiz
        name = cols[0];
        brand = cols[1];
        sku = cols[2];
        stock = cols[3];
        year = cols[4];
        catName = cols[5];
        whName = cols[6];
        unitName = cols[7];
        image = cols[8];
        height = cols[9];
        width = cols[10];
        length = cols[11];
      }

      name = name?.toString().trim() || 'Nomsiz';
      if (!name || name === 'Nomsiz') continue;

      brand = brand?.toString().trim() || 'Brendsiz';
      sku = sku?.toString().trim() || `SKU-${Date.now()}-${i}`;
      stock = Number(stock) || 0;
      year = Number(year) || 2024;
      image = image?.toString().trim() || 'https://picsum.photos/400/400';
      
      height = Number(height) || 10;
      width = Number(width) || 10;
      length = Number(length) || 10;

      const cat = categories.find(c => c.name.toLowerCase() === (catName?.toString().trim().toLowerCase() || ''));
      const wh = warehouses.find(w => w.name.toLowerCase() === (whName?.toString().trim().toLowerCase() || ''));
      const un = units.find(u => u.name.toLowerCase() === (unitName?.toString().trim().toLowerCase() || ''));

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
