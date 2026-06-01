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
 *       400:
 *         description: Noto'g'ri so'rov
 *       404:
 *         description: Topilmadi
 *       500:
 *         description: Server xatosi
 */
router.post('/', seedController.seedData);

module.exports = router;
