const { Op } = require("sequelize");
const { Product } = require("../models");
const { ValidateProduct } = require("../validation/product.validation");

// ---------- Post product ---------
exports.createProduct = async (req, res) => {
  const { error } = ValidateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Get product ---------
exports.getProducts = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GetById product ---------
exports.getProductById = async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Update product ---------
exports.updateProduct = async (req, res) => {
  const { error } = ValidateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await Product.findByPk(req.params.id);
    if (!data)
      return res.status(404).json({ message: "Product not found" });

    await data.update(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Delete product ---------
exports.deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id);
    if (!data) return res.status(404).send("Product not found");

    const recordData = data.toJSON();
    await data.destroy();
    res.status(204).send(recordData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ---------- Search product ---------
exports.searchProduct = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json("Search query is required");
    }

    const data = await Product.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
