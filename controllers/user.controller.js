const { Op } = require("sequelize");
const { User } = require("../models");
const { ValidateUser } = require("../validation/user.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---------- Post user ---------
exports.createUser = async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let createData = { ...req.body };
    // Removed password hashing as requested
    const data = await User.create(createData);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Login user ---------
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    
    if (user.password !== password) return res.status(401).json({ message: 'Parol noto\'g\'ri' });
    
    res.status(200).json({ message: 'Tizimga muvaffaqiyatli kirdingiz', user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Get user ---------
exports.getUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GetById user ---------
exports.getUserById = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });

    if (!data)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Update user ---------
exports.updateUser = async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const data = await User.findByPk(req.params.id);
    if (!data)
      return res.status(404).json({ message: "User not found" });

    let updateData = { ...req.body };
    // Removed password hashing as requested
    await data.update(updateData);
    const returnData = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    res.status(200).json(returnData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Delete user ---------
exports.deleteUser = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);
    if (!data) return res.status(404).send("User not found");

    const recordData = data.toJSON();
    await data.destroy();
    res.status(204).send(recordData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ---------- Search user ---------
exports.searchUser = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json("Search query is required");
    }

    const data = await User.findAll({
      where: {
        username: { [Op.iLike]: `%${query}%` },
      },
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
