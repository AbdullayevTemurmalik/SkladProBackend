const { Region } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const data = await Region.findAll();
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.search = async (req, res) => {
  try {
    const { name } = req.query;
    let whereCondition = {};
    if (name) {
      whereCondition.name = { [Op.iLike]: `%${name}%` };
    }
    const data = await Region.findAll({ where: whereCondition });
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const data = await Region.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const data = await Region.create(req.body);
    res.status(201).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Region.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const data = await Region.findByPk(req.params.id);
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Region.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: error.message }); }
};
