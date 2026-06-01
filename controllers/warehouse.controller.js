const { Op } = require("sequelize");
const { Warehouse } = require("../models");
const { ValidateWarehouse } = require("../validation/warehouse.validation");

// ---------- Post warehouse ---------
exports.createWarehouse = async (req, res) => {
  const { error } = ValidateWarehouse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Warehouse.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Get warehouse ---------
exports.getWarehouses = async (req, res) => {
  try {
    const data = await Warehouse.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GetById warehouse ---------
exports.getWarehouseById = async (req, res) => {
  try {
    const data = await Warehouse.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Warehouse not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Update warehouse ---------
exports.updateWarehouse = async (req, res) => {
  const { error } = ValidateWarehouse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Warehouse.findByPk(req.params.id);
    if (!data)
      return res.status(404).json({ message: "Warehouse not found" });

    await data.update(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Delete warehouse ---------
exports.deleteWarehouse = async (req, res) => {
  try {
    const data = await Warehouse.findByPk(req.params.id);
    if (!data) return res.status(404).send("Warehouse not found");

    const recordData = data.toJSON();
    await data.destroy();
    res.status(204).send(recordData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ---------- Search warehouse ---------
exports.searchWarehouse = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json("Search query is required");
    }

    const data = await Warehouse.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
