const { Product, Warehouse } = require('../models');
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
