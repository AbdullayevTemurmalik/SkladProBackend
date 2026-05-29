const express = require('express');
const router = express.Router();
const controller = require('../controllers/unit.controller');

/**
 * @swagger
 * tags:
 *   name: Units
 *   description: Unit management API
 */

/**
 * @swagger
 * /api/units:
 *   post:
 *     summary: Yangi o'lchov birligi yaratish
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "dona"
 *     responses:
 *       201:
 *         description: Yaratildi
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/units:
 *   get:
 *     summary: Barcha o'lchov birliklarini olish (filtrlarsiz)
 *     tags: [Units]
 *     responses:
 *       200:
 *         description: O'lchov birliklari ro'yxati
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/units/search:
 *   get:
 *     summary: O'lchov birliklarini qidirish
 *     tags: [Units]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: "dona"
 *         description: Nomi bo'yicha qidiruv
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
router.get('/search', controller.search);

/**
 * @swagger
 * /api/units/{id}:
 *   get:
 *     summary: ID bo'yicha o'lchov birligini olish
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: O'lchov birligi ma'lumotlari
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/units/{id}:
 *   put:
 *     summary: O'lchov birligini yangilash
 *     tags: [Units]
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
 *                 example: "kg"
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/units/{id}:
 *   delete:
 *     summary: O'lchov birligini o'chirish
 *     tags: [Units]
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
