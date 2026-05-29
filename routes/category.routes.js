const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management API
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Yangi kategoriya yaratish
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Elektronika"
 *     responses:
 *       201:
 *         description: Yaratildi
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Barcha kategoriyalarni olish (filtrlarsiz)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Kategoriyalar ro'yxati
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/categories/search:
 *   get:
 *     summary: Kategoriyalarni qidirish
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: "Elektronika"
 *         description: Nomi bo'yicha qidiruv
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
router.get('/search', controller.search);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: ID bo'yicha kategoriyani olish
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Kategoriya ma'lumotlari
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Kategoriyani yangilash
 *     tags: [Categories]
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
 *                 example: "Kiyim-kechak"
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Kategoriyani o'chirish
 *     tags: [Categories]
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
