const { Warehouse } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const data = await Warehouse.findAll(); // Ulanish (include) olib tashlandi
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.search = async (req, res) => {
  try {
    const { name, regionId } = req.query;
    let whereCondition = {};
    if (name) {
      whereCondition.name = { [Op.iLike]: `%${name}%` };
    }
    if (regionId) {
      whereCondition.regionId = regionId;
    }
    const data = await Warehouse.findAll({ 
      where: whereCondition 
      // Ulanish olib tashlandi
    });
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const data = await Warehouse.findByPk(req.params.id); // Ulanish olib tashlandi
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const data = await Warehouse.create(req.body);
    res.status(201).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Warehouse.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const data = await Warehouse.findByPk(req.params.id); // Ulanish olib tashlandi
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Warehouse.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: error.message }); }
};
