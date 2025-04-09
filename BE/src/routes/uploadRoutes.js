// src/routes/upload.routes.js
import express from 'express'
import upload from '../middlewares/upload.js'
import uploadImage from '../controllers/upload.controller.js'

const router = express.Router()
// Định nghĩa route POST để upload
router.post('/upload', upload.single('image'), uploadImage);

export default router;
