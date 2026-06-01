const { Router } = require("express");
const router = Router();

const {
  createRegion,
  getRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
  searchRegion,
} = require("../controllers/region.controller");

/**
 * @swagger
 * tags:
 *   - name: Regions
 *     description: Viloyat boshqaruvi
 */

/**
 * @swagger
 * /api/regions:
 *   post:
 *     summary: Yangi Viloyat yaratish
 *     tags: [Regions]
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
 *                 example: Toshkent
 *     responses:
 *       201:
 *         description: Viloyat yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       500:
 *         description: Server xatosi
 */
router.post("/", createRegion);

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Barcha viloyatlarni olish
 *     tags: [Regions]
 *     responses:
 *       200:
 *         description: Viloyatlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/", getRegions);

/**
 * @swagger
 * /api/regions/{id}:
 *   get:
 *     summary: ID bo'yicha viloyat olish
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
 *         description: Viloyat topildi
 *       404:
 *         description: Viloyat topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/:id", getRegionById);

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
 *                 example: Samarqand
 *     responses:
 *       200:
 *         description: Viloyat yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Viloyat topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/:id", updateRegion);

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
 *         description: Viloyat o'chirildi
 *       404:
 *         description: Viloyat topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/:id", deleteRegion);

/**
 * @swagger
 * /api/regions/search:
 *   get:
 *     summary: Viloyat nom bo'yicha qidirish
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Toshkent
 *     responses:
 *       200:
 *         description: Qidirilgan viloyatlar
 *       400:
 *         description: Query talab qilinadi
 *       500:
 *         description: Server xatosi
 */
router.get("/search", searchRegion);

module.exports = router;
