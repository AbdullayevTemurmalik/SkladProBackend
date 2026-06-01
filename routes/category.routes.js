const { Router } = require("express");
const router = Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  searchCategory,
} = require("../controllers/category.controller");

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Kategoriya boshqaruvi
 */

/**
 * @swagger
 * /categories/createCategory:
 *   post:
 *     summary: Yangi Category yaratish
 *     tags: [Categories]
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
 *                 example: Telefonlar
 *     responses:
 *       201:
 *         description: Category yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       500:
 *         description: Server xatosi
 */
router.post("/createCategory", createCategory);

/**
 * @swagger
 * /categories/getCategories:
 *   get:
 *     summary: Barcha kategoriyalarni olish
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Kategoriyalar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/getCategories", getCategories);

/**
 * @swagger
 * /categories/getCategory/{id}:
 *   get:
 *     summary: ID bo'yicha kategoriya olish
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
 *         description: Kategoriya topildi
 *       404:
 *         description: Kategoriya topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/getCategory/:id", getCategoryById);

/**
 * @swagger
 * /categories/updateCategory/{id}:
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
 *                 example: Noutbuklar
 *     responses:
 *       200:
 *         description: Kategoriya yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Kategoriya topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/updateCategory/:id", updateCategory);

/**
 * @swagger
 * /categories/deleteCategory/{id}:
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
 *         description: Kategoriya o'chirildi
 *       404:
 *         description: Kategoriya topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/deleteCategory/:id", deleteCategory);

/**
 * @swagger
 * /categories/searchCategory:
 *   get:
 *     summary: Kategoriya nom bo'yicha qidirish
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Telefonlar
 *     responses:
 *       200:
 *         description: Qidirilgan kategoriyalar
 *       400:
 *         description: Query talab qilinadi
 *       500:
 *         description: Server xatosi
 */
router.get("/searchCategory", searchCategory);

module.exports = router;
