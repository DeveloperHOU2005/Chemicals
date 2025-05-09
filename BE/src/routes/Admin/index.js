import { Router } from "express";
import product from './product.js'
import account from './account.js'
import category from './category.js'
const router = Router();

router.use('/products', product)
router.use('/category', category)
router.use('/account', account)
export default router