import cloudinary from '../config/cloudinary.js';

/**
 * Upload hình ảnh lên Cloudinary.
 * @param {String} filePath - Đường dẫn đến file ảnh trên hệ thống máy chủ.
 * @returns {Object} Kết quả upload bao gồm URL của ảnh.
 */
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'my_products', // tùy chọn: chia thư mục lưu trữ trên Cloudinary
      use_filename: true,    // sử dụng tên file gốc làm tên ảnh
      unique_filename: false,
      overwrite: true
    });
    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export default uploadImage;
