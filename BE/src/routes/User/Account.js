import { Router } from "express";

import AccountController from "../../controllers/User/Account.controller.js";

const router = Router();

router.post('/login',AccountController.loginController)
router.post('/register', AccountController.registerController)
router.post('/verify-account', AccountController.verifyAccount)

export default router