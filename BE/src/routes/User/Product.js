import { Router } from "express";
import productController from "../../controllers/User/product.controller.js";
const router = Router();

// ----------------- User - Mua hàng -----------------
router.get('/', productController.getRecommendations); // ML: Gợi ý sản phẩm -- chưa làm
router.get('/trending', productController.getTrendingProducts); // Sản phẩm nổi bật -- chưa làm
// router.post('/rate-product', productController.rateProduct); // Đánh giá -- chưa làm
// // ----------------- Lọc, tìm kiếm -----------------
// router.get('/category/:id/products', productController.getProductsByCategory);
// router.get('/filter', productController.filterProducts);
// router.get('/find-product', productController.find);

export default router