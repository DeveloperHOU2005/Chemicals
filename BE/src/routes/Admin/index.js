import { Router } from "express";
import product from './product.js'
import category from './category.js'
const router = Router();

router.use('/products', product)
router.use('/category', category)

export default router