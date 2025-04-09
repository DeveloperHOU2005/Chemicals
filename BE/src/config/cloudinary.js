// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import env from 'dotenv'

env.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Ví dụ: 'my-cloud'
  api_key: process.env.CLOUDINARY_API_KEY,       // Ví dụ: '123456789012345'
  api_secret: process.env.CLOUDINARY_API_SECRET  // Ví dụ: 'mysecretkey'
});

export default cloudinary;