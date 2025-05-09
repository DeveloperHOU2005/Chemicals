import db from "../../utils/db.js";

const getRecommendations =  async (params = {}) => {
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

const getTrendingProducts = async (params = {}) => {
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
      ORDER BY sp.da_ban DESC 
      LIMIT 12
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

export default {
    getRecommendations,
    getTrendingProducts
}
