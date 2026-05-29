const express = require('express');
const router = express.Router();
const controller = require('../controllers/warehouse.controller');

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: Warehouse management API
 */

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Yangi sklad yaratish
 *     tags: [Warehouses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Markaziy Sklad"
 *               regionId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Yaratildi
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Barcha skladlarni olish (filtrlarsiz)
 *     tags: [Warehouses]
 *     responses:
 *       200:
 *         description: Skladlar ro'yxati
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/warehouses/search:
 *   get:
 *     summary: Skladlarni qidirish
 *     tags: [Warehouses]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: "Markaziy"
 *         description: Nomi bo'yicha qidiruv
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Viloyat bo'yicha qidiruv
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
router.get('/search', controller.search);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: ID bo'yicha skladni olish
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Sklad ma'lumotlari
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Skladni yangilash
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangi Sklad"
 *               regionId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Skladni o'chirish
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: O'chirildi
 */
router.delete('/:id', controller.remove);

module.exports = router;
