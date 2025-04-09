import { Router } from "express";
import productController from "../../controllers/Admin/product.controller.js";
const router = Router();

// ----------------- Admin - CRUD -----------------
router.get('/', productController.getProductList); // Danh sách sản phẩm
router.post('/product', productController.addProduct); // Thêm sản phẩm
router.patch('/edit-product', productController.editProduct); // Cập nhật sản phẩm
router.delete('/delete-product', productController.deleteProduct); // Xóa sản phẩm

// ----------------- Admin - Thống kê -----------------
router.get('/product-statistics', productController.statistics); // Thống kê tổng quan
router.post('/rate-product', productController.rateProduct); // Đánh giá
router.get('/product/:id/reviews', productController.getReviews); // Lấy đánh giá
router.get('/stats/top-selling', productController.getTopSellingProducts); // Top bán chạy
router.get('/stats/low-stock', productController.getLowStockProducts); // Sản phẩm sắp hết
router.get('/audit/product-history/:id', productController.getProductHistory); // Lịch sử thay đổi

// ----------------- User - Mua hàng -----------------
router.post('/buy-product', productController.buy); // Mua hàng
router.get('/recommendations', productController.getRecommendations); // ML: Gợi ý sản phẩm
router.get('/trending', productController.getTrendingProducts); // Sản phẩm nổi bật

// // ----------------- Wishlist -----------------
// router.get('/wishlist', userController.getWishlist);
// router.post('/wishlist', userController.addToWishlist);
// router.delete('/wishlist/:id', userController.removeFromWishlist);

// ----------------- Lọc, tìm kiếm -----------------
router.get('/category/:id/products', productController.getProductsByCategory);
router.get('/filter', productController.filterProducts);
router.get('/find-product', productController.find);

export default router