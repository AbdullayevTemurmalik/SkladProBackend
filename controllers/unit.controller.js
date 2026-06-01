const { Op } = require("sequelize");
const { Unit } = require("../models");
const { ValidateUnit } = require("../validation/unit.validation");

// ---------- Post unit ---------
exports.createUnit = async (req, res) => {
  const { error } = ValidateUnit(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Unit.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Get unit ---------
exports.getUnits = async (req, res) => {
  try {
    const data = await Unit.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GetById unit ---------
exports.getUnitById = async (req, res) => {
  try {
    const data = await Unit.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Unit not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Update unit ---------
exports.updateUnit = async (req, res) => {
  const { error } = ValidateUnit(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Unit.findByPk(req.params.id);
    if (!data)
      return res.status(404).json({ message: "Unit not found" });

    await data.update(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Delete unit ---------
exports.deleteUnit = async (req, res) => {
  try {
    const data = await Unit.findByPk(req.params.id);
    if (!data) return res.status(404).send("Unit not found");

    const recordData = data.toJSON();
    await data.destroy();
    res.status(204).send(recordData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ---------- Search unit ---------
exports.searchUnit = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json("Search query is required");
    }

    const data = await Unit.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
