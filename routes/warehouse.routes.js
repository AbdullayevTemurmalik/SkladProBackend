const { Router } = require("express");
const router = Router();

const {
  createWarehouse,
  getWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
  searchWarehouse,
} = require("../controllers/warehouse.controller");

/**
 * @swagger
 * tags:
 *   - name: Warehouses
 *     description: Ombor boshqaruvi
 */

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Yangi Ombor yaratish
 *     tags: [Warehouses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - regionId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Asosiy Ombor
 *               regionId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Ombor yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       500:
 *         description: Server xatosi
 */
router.post("/", createWarehouse);

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Barcha omborlarni olish
 *     tags: [Warehouses]
 *     responses:
 *       200:
 *         description: Omborlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/", getWarehouses);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: ID bo'yicha ombor olish
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
 *         description: Ombor topildi
 *       404:
 *         description: Ombor topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/:id", getWarehouseById);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Omborni yangilash
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
 *                 example: Filial Ombor
 *               regionId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ombor yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Ombor topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/:id", updateWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Omborni o'chirish
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
 *         description: Ombor o'chirildi
 *       404:
 *         description: Ombor topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/:id", deleteWarehouse);

/**
 * @swagger
 * /api/warehouses/search:
 *   get:
 *     summary: Ombor nom bo'yicha qidirish
 *     tags: [Warehouses]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Asosiy Ombor
 *     responses:
 *       200:
 *         description: Qidirilgan omborlar
 *       400:
 *         description: Query talab qilinadi
 *       500:
 *         description: Server xatosi
 */
router.get("/search", searchWarehouse);

module.exports = router;
