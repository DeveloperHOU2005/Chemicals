import fs from 'fs'
import env from 'dotenv'

import cloudinary from '../config/cloudinary.js'

env.config()

const uploadImage = async (req, res) => {
  try {
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      upload_preset: process.env.UPLOAD_PRESS, // Phải khớp tên preset đã tạo trên Cloudinary
    });

    res.status(200).json({
      success: true,
      message: 'Upload thành công!',
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload thất bại!',
      error: error.message,
    });
  }
};

export default  uploadImage
