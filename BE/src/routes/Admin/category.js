import express from 'express';
import categoryController from "../../controllers/Admin/category.controller.js";

const router = express.Router();

// ----------------- Danh mục - Admin CRUD -----------------
router.get('/', categoryController.getCategory); // Lấy danh sách danh mục
router.post('/', categoryController.addCategory); // Thêm danh mục
router.patch('/', categoryController.editCategory); // Chỉnh sửa danh mục
router.delete('/:id', categoryController.deleteCategory); // Xoá danh mục

// ----------------- Tìm kiếm & lọc -----------------
router.get('/search/find', categoryController.find); // Tìm kiếm theo tên

// ----------------- Thống kê -----------------
router.get('/statistics/overview', categoryController.statistics); // Thống kê tổng quan
router.get('/statistics/popular', categoryController.getPopularCategories); // Danh mục có nhiều sản phẩm
router.get('/statistics/empty', categoryController.getEmptyCategories); // Danh mục không có sản phẩm

export default router;
