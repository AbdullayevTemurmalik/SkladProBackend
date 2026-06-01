const { Op } = require("sequelize");
const { Category } = require("../models");
const { ValidateCategory } = require("../validation/category.validation");

// ---------- Post category ---------
exports.createCategory = async (req, res) => {
  const { error } = ValidateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Category.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Get category ---------
exports.getCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GetById category ---------
exports.getCategoryById = async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Update category ---------
exports.updateCategory = async (req, res) => {
  const { error } = ValidateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Category.findByPk(req.params.id);
    if (!data)
      return res.status(404).json({ message: "Category not found" });

    await data.update(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Delete category ---------
exports.deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id);
    if (!data) return res.status(404).send("Category not found");

    const recordData = data.toJSON();
    await data.destroy();
    res.status(204).send(recordData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ---------- Search category ---------
exports.searchCategory = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json("Search query is required");
    }

    const data = await Category.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
