const { Op } = require("sequelize");
const { Region } = require("../models");
const { ValidateRegion } = require("../validation/region.validation");

// ---------- Post region ---------
exports.createRegion = async (req, res) => {
  const { error } = ValidateRegion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Region.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Get region ---------
exports.getRegions = async (req, res) => {
  try {
    const data = await Region.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GetById region ---------
exports.getRegionById = async (req, res) => {
  try {
    const data = await Region.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Region not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Update region ---------
exports.updateRegion = async (req, res) => {
  const { error } = ValidateRegion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Region.findByPk(req.params.id);
    if (!data)
      return res.status(404).json({ message: "Region not found" });

    await data.update(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Delete region ---------
exports.deleteRegion = async (req, res) => {
  try {
    const data = await Region.findByPk(req.params.id);
    if (!data) return res.status(404).send("Region not found");

    const recordData = data.toJSON();
    await data.destroy();
    res.status(204).send(recordData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ---------- Search region ---------
exports.searchRegion = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json("Search query is required");
    }

    const data = await Region.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
