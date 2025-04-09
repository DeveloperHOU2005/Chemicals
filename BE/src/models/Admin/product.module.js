import db from '../../utils/db.js';

const getAllProduct = async (params = {}) => {
  const result = {
    status: true,
    category: {},
    product: {}
  };

  try {
    const limit = params.limit || 20;
    const page = params.page || 1;
    const offset = (page - 1) * limit;

    // --- Xử lý truy vấn danh mục ---
    let categoryQuery = "SELECT * FROM dm WHERE 1=1";
    let totalCategoryQuery = "SELECT COUNT(*) AS total FROM dm WHERE 1=1";

    if (params.categories) {
      if (params.categories.all) {
        categoryQuery += ` ${params.categories.all}`;
      }
      if (params.categories.total) {
        totalCategoryQuery += ` ${params.categories.total}`;
      }
    }

    // --- Xử lý truy vấn sản phẩm ---
    let productQuery = "SELECT * FROM sp WHERE 1=1";
    let totalProductQuery = "SELECT COUNT(*) AS total FROM sp WHERE 1=1";
    let productImageQuery = "SELECT * FROM sp_hinh WHERE 1=1";

    if (params.product) {
      if (params.product.name) {
        productQuery += ` AND ${params.product.name}`;
      }
      if (params.product.total) {
        totalProductQuery += ` AND ${params.product.total}`;
      }
      if (params.product.image) {
        productImageQuery += ` AND ${params.product.image}`;
      }
    }

    // Phân trang và sắp xếp sản phẩm
    productQuery += ` ORDER BY id DESC LIMIT $1 OFFSET $2`;

    // Truy vấn đồng thời
    const [
      totalCategoryRes,
      categoryDataRes,
      totalProductRes,
      productDataRes,
      imageDataRes
    ] = await Promise.all([
      db.query(totalCategoryQuery),
      db.query(categoryQuery),
      db.query(totalProductQuery),
      db.query(productQuery, [limit, offset]),
      db.query(productImageQuery)
    ]);

    result.category = {
      total: parseInt(totalCategoryRes.rows[0].total),
      data: categoryDataRes.rows
    };

    result.product = {
      total: parseInt(totalProductRes.rows[0].total),
      data: productDataRes.rows,
      image: imageDataRes.rows
    };

  } catch (error) {
    result.status = false;
    result.errMessage = error.message;
    console.error("Lỗi truy vấn:", error);
  } finally {
    return result;
  }
};

// Hàm chỉnh sửa sản phẩm (chưa cài đặt)
const edit = async (params = {}) => {
  return {
    success: false,
    message: 'Chưa triển khai tính năng chỉnh sửa'
  };
};

const getByCategoryId = async (categoryId) => {
  let result = [];

  try {
      const query = `
          SELECT sp.*, sp_hinh.hinh AS imageUrl
          FROM sp
          LEFT JOIN sp_hinh ON sp.id = sp_hinh.sp_id
          WHERE sp.dm = $1
      `;
      const res = await db.query(query, [categoryId]);
      result = res.rows
  } catch (error) {
      throw new Error("Lỗi truy vấn sản phẩm theo danh mục: " + error.message);
  }

  return result;
};
const addProduct = async (params)=>{

  const query = `
    INSERT INTO sp 
      (tenSP, moTa, khoiLuong, TrangThai, danh_gia, ngay_tao, ngay_cap_nhat, gia, da_ban, dm)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id
  `;
  // Chú ý: chúng ta sắp xếp các trường theo đúng thứ tự trong câu lệnh INSERT
  const values = [
    params.tensp,
    params.mota,
    params.khoiluong,
    params.trangthai,
    params.danhGia,
    params.ngayTao,
    params.ngayCapNhat,
    params.gia,
    params.daBan,
    params.dm
  ];

  try {
    const result = (await db.query(query, values)).rows[0];
    const querys = await db.query(`
      INSERT INTO sp_hinh 
      (sp_id, hinh)
      VALUES 
      ($1, $2)
      `,
      [result.id,params.image]
    )
    return { success: true, product: result.rows[0] };
  } catch (error) {
    return { success: false, errMessage: error.message };
  }
}
const editProduct = async (params = {}) => {
  const result = { success: true, message: '' };

  // Kiểm tra ID sản phẩm
  if (!params.id) {
    return { success: false, message: 'Thiếu ID sản phẩm' };
  }

  // Tạo mảng các trường cần cập nhật động
  const fields = [];
  const values = [];
  let idx = 1;

  if (params.tensp !== undefined) {
    fields.push(`"tensp" = $${idx++}`);
    values.push(params.tensp);
  }
  if (params.mota !== undefined) {
    fields.push(`"mota" = $${idx++}`);
    values.push(params.mota);
  }
  if (params.khoiluong !== undefined) {
    fields.push(`"khoiluong" = $${idx++}`);
    values.push(params.khoiluong);
  }
  if (params.trangthai !== undefined) {
    fields.push(`"trangthai" = $${idx++}`);
    values.push(params.trangthai);
  }
  if (params.danhGia !== undefined) {
    fields.push(`"danh_gia" = $${idx++}`);
    values.push(params.danhGia);
  }
  // Note: nếu ngàyTao không đổi, thường không cập nhật
  if (params.ngayCapNhat !== undefined) {
    fields.push(`"ngay_cap_nhat" = $${idx++}`);
    values.push(params.ngayCapNhat);
  }
  if (params.gia !== undefined) {
    fields.push(`"gia" = $${idx++}`);
    values.push(params.gia);
  }
  if (params.daBan !== undefined) {
    fields.push(`"da_ban" = $${idx++}`);
    values.push(params.daBan);
  }
  if (params.dm !== undefined) {
    fields.push(`"dm" = $${idx++}`);
    values.push(params.dm);
  }

  // Nếu không có trường nào cần cập nhật
  if (fields.length === 0) {
    return { success: false, message: 'Không có dữ liệu nào để cập nhật' };
  }

  // Thêm ID sản phẩm vào cuối mảng giá trị
  values.push(params.id);
  const query = `UPDATE sp SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;

  try {
    // Cập nhật thông tin sản phẩm
    const productRes = await db.query(query, values);
    const updatedProduct = productRes.rows[0];

    return { success: true, product: updatedProduct };
  } catch (error) {
    return { success: false, errMessage: error.message };
  }
};
const deleteProduct = async (id) => {
  const result = {
      success: true,
      message: 'Xóa sản phẩm thành công'
  };

  try {
      await db.query("DELETE FROM sp WHERE id = $1", [id]);
  } catch (error) {
      result.success = false;
      result.message = error.message;
  } finally {
      return result;
  }
};

export default { 
  getAllProduct, 
  edit, 
  getByCategoryId,
  addProduct,
  editProduct,
  deleteProduct
};
