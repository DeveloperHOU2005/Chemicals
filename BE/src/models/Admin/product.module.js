import db from '../../utils/db.js';

const getAllProduct = async () => {
  const result = {
    status: true,
    product: {}
  };

  try {
    const query = `
      SELECT sp.*,  
        i.total_weight as khoiluong, 
        i.unit_of_measure as dv,
        dm.tenDanhMuc as tenDanhMuc, 
        dm.id as dm_id
      FROM sp
      JOIN public.sp_dm_relations r ON sp.id = r.sp_id
      JOIN public.dm ON r.dm_id = dm.id
      JOIN public.warehouse_inventory i on sp.id = i.product_id
      ORDER BY sp.id DESC
    `;
    const imageQuery = `
      SELECT sp_hinh.sp_id, sp_hinh.hinh
      FROM sp_hinh
      JOIN sp ON sp_hinh.sp_id = sp.id 
      ORDER BY sp_hinh.id ASC
    `;
    const res = await db.query(query);
    const imageRes = await db.query(imageQuery);
    const images = imageRes.rows;
    const products = res.rows;
    products.forEach((product) => {
      const productImages = images.filter((image) => image.sp_id === product.id ? image.hinh : null);
      product.imageUrl = productImages.map((image) => image.hinh);  
    })
    result.product.data = products;
    result.product.total = res.rowCount;
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
  let result = {};

  try {
      const query = `
          SELECT sp.*, (
              SELECT hinh
              FROM sp_hinh
              WHERE sp_hinh.sp_id = sp.id
              ORDER BY id ASC
              LIMIT 1
          ) AS imageUrl, i.total_weight as khoiluong, i.unit_of_measure as dv
          FROM sp
          JOIN public.sp_dm_relations r ON sp.id = r.sp_id
          JOIN public.warehouse_inventory i on sp.id = i.product_id
          WHERE r.dm_id = $1
          ORDER BY sp.id DESC
      `;
      const res = await db.query(query, [categoryId]);
      result.data = res.rows
      result.total = res.rowCount
  } catch (error) {
      throw new Error("Lỗi truy vấn sản phẩm theo danh mục: " + error.message);
  }

  return result;
};
const addProduct = async (params) => {
  // Kiểm tra các trường bắt buộc
  const requiredFields = ['tensp', 'mota', 'gia', 'dm'];
  for (const field of requiredFields) {
    if (params[field] === undefined) {
      return { 
        success: false, 
        errMessage: `Trường ${field} không được để trống` 
      };
    }
  }

  // Thiết lập giá trị mặc định cho các trường không bắt buộc
  const defaultValues = {
    khoiluong: 0,
    trangthai: 'Còn hàng',
    danhGia: 0,
    ngayTao: new Date(),
    ngayCapNhat: new Date(),
    daBan: 5,
    image: null
  };

  // Kết hợp giá trị từ params với giá trị mặc định
  const finalParams = {
    ...defaultValues,
    ...Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    )
  };

  const query = `
    INSERT INTO sp 
      (tenSP, moTa, khoiLuong, TrangThai, danh_gia, ngay_tao, ngay_cap_nhat, gia, da_ban, dm)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;

  // Sắp xếp các giá trị theo đúng thứ tự trong câu lệnh INSERT
  const values = [
    finalParams.tensp,
    finalParams.mota,
    finalParams.khoiluong || defaultValues.khoiluong,
    finalParams.trangthai || defaultValues.trangthai,
    finalParams.danhGia || defaultValues.danhGia,
    finalParams.ngayTao || defaultValues.ngayTao,
    finalParams.ngayCapNhat || defaultValues.ngayCapNhat,
    finalParams.gia || defaultValues.daBan,
    finalParams.daBan,
    finalParams.dm
  ];

  try {
    const result = await db.query(query, values);
    const productId = result.rows[0].id;
    
    // Chỉ chèn hình ảnh nếu có
    if (finalParams.image !== null) {
      await db.query(`
        INSERT INTO sp_hinh 
        (sp_id, hinh)
        VALUES 
        ($1, $2)
        `,
        [productId, finalParams.image]
      );
     }else{
      await db.query(`
        INSERT INTO sp_hinh 
        (sp_id, hinh)
        VALUES 
        ($1, $2)
        `,
        [productId, "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"]
      );
    }
    
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

const filterProducts = async (params) => {
  const data = {};
  const query = [];
  const param = [];
  let idx = 0; // Sử dụng let để có thể tăng biến

  // Xử lý từng điều kiện: đảm bảo tham số được chuyển thành mảng nếu cần
  if (params.tinh_chat_hoa_hoc != undefined) {
    idx++;
    query.push(`AND tinh_chat_hoa_hoc = ANY($${idx})`);
    param.push(Array.isArray(params.tinh_chat_hoa_hoc) ? params.tinh_chat_hoa_hoc : [params.tinh_chat_hoa_hoc]);
  }
  if (params.nguon_goc != undefined) {
    idx++;
    query.push(`AND nguon_goc = ANY($${idx})`);
    param.push(Array.isArray(params.nguon_goc) ? params.nguon_goc : [params.nguon_goc]);
  }
  if (params.cong_dung != undefined) {
    idx++;
    query.push(`AND cong_dung = ANY($${idx})`);
    param.push(Array.isArray(params.cong_dung) ? params.cong_dung : [params.cong_dung]);
  }
  if (params.muc_do_nguy_hiem != undefined) {
    idx++;
    query.push(`AND muc_do_nguy_hiem = ANY($${idx})`);
    param.push(Array.isArray(params.muc_do_nguy_hiem) ? params.muc_do_nguy_hiem : [params.muc_do_nguy_hiem]);
  }
  if (params.trang_thai != undefined) {
    idx++;
    query.push(`AND trang_thai = ANY($${idx})`);
    param.push(Array.isArray(params.trang_thai) ? params.trang_thai : [params.trang_thai]);
  }

  try {
    // Dùng join(' ') để nối các mệnh đề AND thành chuỗi truy vấn hợp lệ
    const query2 = `
      SELECT sp.* FROM sp 
      LEFT JOIN public.chemical c ON c.spid = sp.id
      WHERE 1=1 ${query.join(' ')}
    `;
    const result = await db.query(query2, param);
    data.data = result.rows;
    data.total = result.rowCount;
    data.success = true;
  } catch (error) {
    data.success = false;
    data.message = error.message;
  } finally {
    return data;
  }
};

const statistics = async ()=>{
    const result = {
      totalProducts: 0,
      totalSold: 0,
      revenue: 0,
      topCategories: [], 
      topSelling: [],
      lowStock: [],
      status: true
    }

    try {
      const totalProductsQuery = "SELECT COUNT(*) FROM sp"
      const totalSoldQuery = "SELECT SUM(da_ban) FROM sp"
      const revenueQuery = "SELECT SUM(tongtien) FROM orders"
      const topCategoriesQuery = `
          SELECT 
              sp.dm,
              MAX(dm.tenDanhMuc) AS tenDanhMuc,
              SUM(sp.da_ban) AS daban
          FROM sp
          LEFT JOIN sp_hinh ON sp.id = sp_hinh.sp_id
          LEFT JOIN dm ON dm.id = sp.dm 
          GROUP BY sp.dm
          ORDER BY daban DESC
          LIMIT 5 OFFSET 0
          `
      const topSellingQuery = `
                  SELECT 
                    sp.id, 
                    sp.tensp,
                    sp.da_ban
                  FROM sp
                  LEFT JOIN sp_hinh ON sp.id = sp_hinh.sp_id
                  ORDER BY sp.da_ban DESC
                  LIMIT 5 OFFSET 0
                `
        const lowStockQuery = `
                  SELECT 
                    sp.id, 
                    sp.tensp,
                    sp.khoiluong
                  FROM sp
                  LEFT JOIN sp_hinh ON sp.id = sp_hinh.sp_id
                  WHERE sp.khoiluong < 100
                  ORDER BY sp.khoiluong ASC
                  LIMIT 5 OFFSET 0
                `
        const [
          totalProducts,
          totalSold,
          revenue,
          topCategories,
          topSelling,
          lowStock
        ] = await Promise.all([
            db.query(totalProductsQuery),
            db.query(totalSoldQuery),
            db.query(revenueQuery),
            db.query(topCategoriesQuery),
            db.query(topSellingQuery),
            db.query(lowStockQuery)
            ]);
        result.lowStock = lowStock.rows
        result.revenue = revenue.rows[0].sum
        result.topCategories = topCategories.rows
        result.topSelling = topSelling.rows
        result.totalProducts = totalProducts.rows[0].count 
        result.totalSold = totalSold.rows[0].sum

    } catch (error) {
      result.status = false
      result.err = error.message
    }finally{
      return result
    }
}
const getTopSellingProducts = async ()=>{
  const result = {
    topSelling: [],
    status: true
  }

  try {
    const topSellingQuery = `
                SELECT 
                  sp.id, 
                  sp.tensp,
                  sp.da_ban
                FROM sp
                LEFT JOIN sp_hinh ON sp.id = sp_hinh.sp_id
                ORDER BY sp.da_ban DESC
              `
      const topSelling = await  db.query(topSellingQuery)
      result.topSelling = topSelling.rows

  } catch (error) {
    result.status = false
    result.err = error.message
  }finally{
    return result
  }
}
const getLowStockProducts = async ()=>{
  const result = {
    lowStock: [],
    status: true
  }

  try {
      const lowStockQuery = `
                SELECT 
                  sp.id, 
                  sp.tensp,
                  sp.khoiluong
                FROM sp
                LEFT JOIN sp_hinh ON sp.id = sp_hinh.sp_id
                WHERE sp.khoiluong < 100
                ORDER BY sp.khoiluong ASC
              `
      const lowStock = await db.query(lowStockQuery)
      result.lowStock = lowStock.rows

  } catch (error) {
    result.status = false
    result.err = error.message
  }finally{
    return result
  }
}


export default { 
  getAllProduct, 
  edit, 
  getByCategoryId,
  addProduct,
  editProduct,
  deleteProduct,
  filterProducts,
  statistics,
  getTopSellingProducts,
  getLowStockProducts,
};
