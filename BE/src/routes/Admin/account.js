import { Router } from "express";
import AccountController from "../../controllers/User/Account.controller.js";
const router = Router();

router.get('/', AccountController.getAllAcount)

export default router