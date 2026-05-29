const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seed.controller');

/**
 * @swagger
 * /api/seed:
 *   post:
 *     summary: Seed initial regions, warehouses, units, and categories
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', seedController.seedData);

module.exports = router;
