const { Router } = require("express");
const router = Router();

const {
  createUnit,
  getUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
  searchUnit,
} = require("../controllers/unit.controller");

/**
 * @swagger
 * tags:
 *   - name: Units
 *     description: O'lchov birligi boshqaruvi
 */

/**
 * @swagger
 * /units/createUnit:
 *   post:
 *     summary: Yangi O'lchov birligi yaratish
 *     tags: [Units]
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
 *                 example: kg
 *     responses:
 *       201:
 *         description: O'lchov birligi yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       500:
 *         description: Server xatosi
 */
router.post("/createUnit", createUnit);

/**
 * @swagger
 * /units/getUnits:
 *   get:
 *     summary: Barcha o'lchov birliklarini olish
 *     tags: [Units]
 *     responses:
 *       200:
 *         description: O'lchov birliklari ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/getUnits", getUnits);

/**
 * @swagger
 * /units/getUnit/{id}:
 *   get:
 *     summary: ID bo'yicha o'lchov birligi olish
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
 *         description: O'lchov birligi topildi
 *       404:
 *         description: O'lchov birligi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/getUnit/:id", getUnitById);

/**
 * @swagger
 * /units/updateUnit/{id}:
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
 *                 example: dona
 *     responses:
 *       200:
 *         description: O'lchov birligi yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: O'lchov birligi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/updateUnit/:id", updateUnit);

/**
 * @swagger
 * /units/deleteUnit/{id}:
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
 *         description: O'lchov birligi o'chirildi
 *       404:
 *         description: O'lchov birligi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/deleteUnit/:id", deleteUnit);

/**
 * @swagger
 * /units/searchUnit:
 *   get:
 *     summary: O'lchov birligi nom bo'yicha qidirish
 *     tags: [Units]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: kg
 *     responses:
 *       200:
 *         description: Qidirilgan o'lchov birliklari
 *       400:
 *         description: Query talab qilinadi
 *       500:
 *         description: Server xatosi
 */
router.get("/searchUnit", searchUnit);

module.exports = router;
