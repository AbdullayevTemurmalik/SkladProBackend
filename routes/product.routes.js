const { Router } = require("express");
const router = Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/product.controller");

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Mahsulot boshqaruvi
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Yangi Mahsulot yaratish
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               brand:
 *                 type: string
 *                 example: Apple
 *               sku:
 *                 type: string
 *                 example: IPH-15-256
 *               stock:
 *                 type: integer
 *                 example: 100
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *               unitId:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mahsulot yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       500:
 *         description: Server xatosi
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Mahsulotlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: ID bo'yicha mahsulot olish
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
 *         description: Mahsulot topildi
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mahsulotni yangilash
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
 *               brand:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Mahsulot yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Mahsulotni o'chirish
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
 *         description: Mahsulot o'chirildi
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Mahsulot nom bo'yicha qidirish
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: iPhone
 *     responses:
 *       200:
 *         description: Qidirilgan mahsulotlar
 *       400:
 *         description: Query talab qilinadi
 *       500:
 *         description: Server xatosi
 */
router.get("/search", searchProduct);

module.exports = router;
