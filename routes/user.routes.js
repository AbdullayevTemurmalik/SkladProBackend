const { Router } = require("express");
const router = Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
  loginUser,
} = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Foydalanuvchi boshqaruvi
 */

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Yangi Foydalanuvchi yaratish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Foydalanuvchi yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       500:
 *         description: Server xatosi
 */
router.post("/createUser", createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Tizimga kirish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Kirish muvaffaqiyatli
 *       401:
 *         description: Parol noto'g'ri
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/getUsers:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/getUsers", getUsers);

/**
 * @swagger
 * /users/getUser/{id}:
 *   get:
 *     summary: ID bo'yicha foydalanuvchini olish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Foydalanuvchi topildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/getUser/:id", getUserById);

/**
 * @swagger
 * /users/updateUser/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/updateUser/:id", updateUser);

/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Foydalanuvchi o'chirildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/deleteUser/:id", deleteUser);

/**
 * @swagger
 * /users/searchUser:
 *   get:
 *     summary: Foydalanuvchini username bo'yicha qidirish
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: admin
 *     responses:
 *       200:
 *         description: Qidirilgan foydalanuvchilar
 *       400:
 *         description: Query talab qilinadi
 *       500:
 *         description: Server xatosi
 */
router.get("/searchUser", searchUser);

module.exports = router;
