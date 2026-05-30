const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Yangi tovar yaratish
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "IPhone 15 Pro Max"
 *               brand:
 *                 type: string
 *                 example: "Apple"
 *               sku:
 *                 type: string
 *                 example: "IPH-15-PRO"
 *               height:
 *                 type: number
 *                 example: 14.6
 *               width:
 *                 type: number
 *                 example: 7.0
 *               length:
 *                 type: number
 *                 example: 0.8
 *               year:
 *                 type: integer
 *                 example: 2023
 *               stock:
 *                 type: integer
 *                 example: 150
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               unitId:
 *                 type: integer
 *                 example: 1
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Yaratildi
 */
router.post('/', controller.create);
router.post('/bulk-upload', controller.bulkUpload);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Barcha tovarlarni olish (Filtrlarsiz)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Tovarlar ro'yxati
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Tovarlarni qidirish va filtrlash
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Viloyat bo'yicha filtr
 *       - in: query
 *         name: warehouseId
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Sklad bo'yicha filtr
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: "iPhone"
 *         description: Nomi bo'yicha qidiruv
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
router.get('/search', controller.search);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: ID bo'yicha tovarni olish
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tovar ma'lumotlari
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Tovarni yangilash
 *     tags: [Products]
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
 *                 example: "Samsung Galaxy S24"
 *               brand:
 *                 type: string
 *                 example: "Samsung"
 *               sku:
 *                 type: string
 *                 example: "SAM-S24"
 *               height:
 *                 type: number
 *                 example: 15.0
 *               width:
 *                 type: number
 *                 example: 7.2
 *               length:
 *                 type: number
 *                 example: 0.8
 *               year:
 *                 type: integer
 *                 example: 2024
 *               stock:
 *                 type: integer
 *                 example: 300
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               unitId:
 *                 type: integer
 *                 example: 1
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Tovarni o'chirish
 *     tags: [Products]
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
