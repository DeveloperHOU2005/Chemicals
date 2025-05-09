import { Router } from "express";

import Homepage from '../../controllers/User/Homepage.controller.js'

const router = Router();

router.get('/', Homepage.Homepage)

export default router