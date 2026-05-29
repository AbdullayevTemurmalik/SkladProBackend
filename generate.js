const fs = require('fs');
const path = require('path');

const models = [
  { name: 'region', caps: 'Region', fields: { name: 'string' } },
  { name: 'category', caps: 'Category', fields: { name: 'string' } },
  { name: 'unit', caps: 'Unit', fields: { name: 'string' } },
  { name: 'warehouse', caps: 'Warehouse', fields: { name: 'string', regionId: 'integer' } }
];

const controllersDir = path.join(__dirname, 'controllers');
const routesDir = path.join(__dirname, 'routes');

models.forEach(m => {
  // Controller
  const controllerCode = `const { ${m.caps} } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const data = await ${m.caps}.findAll();
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const data = await ${m.caps}.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const data = await ${m.caps}.create(req.body);
    res.status(201).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await ${m.caps}.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const updatedData = await ${m.caps}.findByPk(req.params.id);
    res.status(200).json(updatedData);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ${m.caps}.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: error.message }); }
};
`;

  fs.writeFileSync(path.join(controllersDir, `${m.name}.controller.js`), controllerCode);

  // Route
  let props = Object.keys(m.fields).map(f => ` *               ${f}:\n *                 type: ${m.fields[f]}`).join('\n');
  
  const routeCode = `const express = require('express');
const router = express.Router();
const controller = require('../controllers/${m.name}.controller');

/**
 * @swagger
 * tags:
 *   name: ${m.caps}s
 *   description: API for ${m.caps}
 */

/**
 * @swagger
 * /api/${m.name}s:
 *   get:
 *     summary: Get all ${m.name}s
 *     tags: [${m.caps}s]
 *     responses:
 *       200:
 *         description: List of ${m.name}s
 *   post:
 *     summary: Create a ${m.name}
 *     tags: [${m.caps}s]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
${props}
 *     responses:
 *       201:
 *         description: Created ${m.name}
 */
router.route('/').get(controller.getAll).post(controller.create);

/**
 * @swagger
 * /api/${m.name}s/{id}:
 *   get:
 *     summary: Get a ${m.name} by ID
 *     tags: [${m.caps}s]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ${m.caps} data
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update a ${m.name}
 *     tags: [${m.caps}s]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
${props}
 *     responses:
 *       200:
 *         description: Updated ${m.name}
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a ${m.name}
 *     tags: [${m.caps}s]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.route('/:id').get(controller.getById).put(controller.update).delete(controller.remove);

module.exports = router;
`;

  fs.writeFileSync(path.join(routesDir, `${m.name}.routes.js`), routeCode);
});
