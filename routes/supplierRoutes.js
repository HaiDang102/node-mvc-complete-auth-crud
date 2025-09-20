const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Lấy danh sách tất cả nhà cung cấp
 *     tags: [Supplier]
 *     responses:
 *       200:
 *         description: Danh sách nhà cung cấp
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router.get('/', supplierController.index);

/**
 * @swagger
 * /suppliers/new:
 *   get:
 *     summary: Form thêm nhà cung cấp mới
 *     tags: [Supplier]
 *     responses:
 *       200:
 *         description: Trả về form thêm nhà cung cấp
 */
router.get('/new', supplierController.newForm);

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Tạo nhà cung cấp mới
 *     tags: [Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Nhà cung cấp được tạo
 */
router.post('/', supplierController.create);

/**
 * @swagger
 * /suppliers/{id}/edit:
 *   get:
 *     summary: Form chỉnh sửa nhà cung cấp
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhà cung cấp
 *     responses:
 *       200:
 *         description: Trả về form chỉnh sửa nhà cung cấp
 */
router.get('/:id/edit', supplierController.editForm);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Cập nhật nhà cung cấp theo ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhà cung cấp
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Nhà cung cấp đã được cập nhật
 */
router.put('/:id', supplierController.update);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Xóa nhà cung cấp theo ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhà cung cấp
 *     responses:
 *       200:
 *         description: Nhà cung cấp đã bị xóa
 */
router.delete('/:id', supplierController.delete);

module.exports = router;