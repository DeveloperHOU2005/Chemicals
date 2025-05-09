import { Router } from "express";
import Home from './Home.js'
import Account from './Account.js'
import Product from './Product.js'
const router = Router();

router.use('/', Home)
router.use('/account', Account)
router.use('/product', Product)
export default router