const express = require('express');
const router = express.Router();
const controller = require('../controllers/region.controller');

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: Region management API
 */

/**
 * @swagger
 * /api/regions:
 *   post:
 *     summary: Yangi viloyat yaratish
 *     tags: [Regions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Toshkent viloyati"
 *     responses:
 *       201:
 *         description: Yaratildi
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Barcha viloyatlarni olish (filtrlarsiz)
 *     tags: [Regions]
 *     responses:
 *       200:
 *         description: Viloyatlar ro'yxati
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/regions/search:
 *   get:
 *     summary: Viloyatlarni qidirish
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: "Toshkent"
 *         description: Nomi bo'yicha qidiruv
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
router.get('/search', controller.search);

/**
 * @swagger
 * /api/regions/{id}:
 *   get:
 *     summary: ID bo'yicha viloyatni olish
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Viloyat ma'lumotlari
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/regions/{id}:
 *   put:
 *     summary: Viloyatni yangilash
 *     tags: [Regions]
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
 *                 example: "Samarqand viloyati"
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/regions/{id}:
 *   delete:
 *     summary: Viloyatni o'chirish
 *     tags: [Regions]
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
