import db from '../../utils/db.js';

const getAllCategory = async (params = {}) => {
    const result = {
        status: true,
        category: {},
        product: {}
    };

    try {
        const categories = {};
        const product = {};

        const limit = 20;
        const page = params.page || 1;
        const offset = (page - 1) * limit;

        let categoryQuery = `SELECT * FROM dm WHERE 1=1`;
        let totalQuery = `SELECT COUNT(*) FROM dm WHERE 1=1`;

        const queryValues = [];
        let i = 1;

        if (params.categories) {
            if (params.categories.name !== undefined) {
                categoryQuery += ` AND tenDanhMuc ILIKE $${i}`;
                totalQuery += ` AND tenDanhMuc ILIKE $${i}`;
                queryValues.push(`%${params.categories.name}%`);
                i++;
            }

            if (params.categories.all !== undefined) {
                categoryQuery += ` ${params.categories.all}`;
            }
            if (params.categories.total !== undefined) {
                totalQuery += ` ${params.categories.total}`;
            }
        }

        // Truy vấn tổng
        const totalRes = await db.query(totalQuery, queryValues);

        // Truy vấn dữ liệu có phân trang
        queryValues.push(limit);
        queryValues.push(offset);
        const categoryRes = await db.query(`${categoryQuery} LIMIT $${i} OFFSET $${i + 1}`, queryValues);

        categories.total = parseInt(totalRes.rows[0].count);
        categories.data = categoryRes.rows;

        result.category = categories;

    } catch (error) {
        result.status = false;
        result.errMessage = error.message;
        console.error("Lỗi truy vấn:", error);
    } finally {
        return result;
    }
};
const Find = async (param) => {
    const result = {
        status: true,
        category: {}
    };

    try {
        const categories = {};

        const query = `SELECT * FROM dm WHERE tenDanhMuc ILIKE $1`; // ILIKE: không phân biệt hoa thường
        const values = [`%${param}%`]; // thêm wildcard ở đây

        const categoryRes = await db.query(query, values);

        categories.data = categoryRes.rows;
        result.category = categories;

    } catch (error) {
        result.status = false;
        result.errMessage = error.message;
        console.error("Lỗi truy vấn:", error);
    } finally {
        return result;
    }
};


const getACategory = async (param)=>{
    const result = {
        status: true,
        category: {}
    };

    try {
        const categories = {};

        let categoryQuery = `SELECT * FROM dm WHERE id=$1`;

        const categoryRes = await db.query(categoryQuery, [param]);

        categories.data = categoryRes.rows[0];

        result.category = categories;

    } catch (error) {
        result.status = false;
        result.errMessage = error.message;
        console.error("Lỗi truy vấn:", error);
    } finally {
        return result;
    }
}

const edit = async (params = {}) => {
    const result = {
        success: true,
        message: ''
    };

    const { id, tenDanhMuc, moTa, danhMucCha } = params;

    if (!id) {
        result.success = false;
        result.message = 'Thiếu ID danh mục để cập nhật';
        return result;
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (tenDanhMuc !== undefined) {
        fields.push(`"tendanhmuc" = $${idx++}`);
        values.push(tenDanhMuc);
    }

    if (moTa !== undefined) {
        fields.push(`"mota" = $${idx++}`);
        values.push(moTa);
    }

    if (danhMucCha !== undefined) {
        fields.push(`"danhmuccha" = $${idx++}`);
        values.push(danhMucCha);
    }

    if (fields.length === 0) {
        result.success = false;
        result.message = 'Không có dữ liệu nào để cập nhật';
        return result;
    }

    values.push(id);

    const query = `UPDATE dm SET ${fields.join(', ')} WHERE id = $${idx}`;

    try {
        await db.query(query, values);
    } catch (error) {
        result.success = false;
        result.message = error.message;
    } finally {
        return result;
    }
};

const deleteCategory = async (id) => {
    const result = {
        success: true,
        message: 'Xóa danh mục thành công'
    };

    try {
        await db.query("DELETE FROM dm WHERE id = $1", [id]);
    } catch (error) {
        result.success = false;
        result.message = error.message;
    } finally {
        return result;
    }
};

const addCategory = async (param = {}) => {
    const result = -1
    try {
        result = (await db.query('INSERT INTO dm(tendanhmuc, mota, danhmuccha) VALUES ($1, $2, $3)', [param.name, param.description, param.paren || 0])).rowCount
    } catch (error) {
        result = 1;
    }finally {
        return result
    }
}

const statistic = async () => {
    const result = {
        totalCategory: 0,
        totalProduct: 0,
        productPerCategory: []
    };

    try {
        // Tổng số danh mục
        const categoryCount = await db.query("SELECT COUNT(*) AS total FROM dm");
        result.totalCategory = parseInt(categoryCount.rows[0].total);

        // Tổng số sản phẩm
        const productCount = await db.query("SELECT COUNT(*) AS total FROM sp");
        result.totalProduct = parseInt(productCount.rows[0].total);

        // Số lượng sản phẩm theo từng danh mục
        const perCategory = await db.query(`
            SELECT dm.id, dm.tenDanhMuc, COUNT(sp.id) AS totalProduct
            FROM dm
            LEFT JOIN sp ON sp.dm = dm.id
            GROUP BY dm.id, dm.tenDanhMuc
            ORDER BY totalProduct DESC
        `);
        result.productPerCategory = perCategory.rows;

    } catch (error) {
        throw new Error("Lỗi thống kê: " + error.message);
    }

    return result;
};


const getPopularCategories = async () => {
    const result = {
        status: true,
        categories: []
    };

    try {
        const query = `
            SELECT dm.id, dm.tenDanhMuc, COUNT(sp.id) AS soLuongSanPham
            FROM dm
            JOIN sp ON sp.danhMucID = dm.id
            GROUP BY dm.id
            ORDER BY soLuongSanPham DESC
            LIMIT 10
        `;
        const res = await db.query(query);
        result.categories = res.rows;
    } catch (error) {
        result.status = false;
        result.message = error.message;
    }

    return result;
};

const getEmptyCategories = async () => {
    const result = {
        status: true,
        categories: []
    };

    try {
        const query = `
            SELECT dm.id, dm.tenDanhMuc
            FROM dm
            LEFT JOIN sp ON sp.danhMucID = dm.id
            WHERE sp.id IS NULL
        `;
        const res = await db.query(query);
        result.categories = res.rows;
    } catch (error) {
        result.status = false;
        result.message = error.message;
    }

    return result;
};

// Stub (có thể bổ sung sau)
const backUpCateGory = async (params = {}) => {
    return { status: true, message: "Chưa triển khai chức năng backup" };
};



export default { 
    getAllCategory, 
    getACategory, 
    edit, 
    deleteCategory, 
    backUpCateGory, 
    addCategory, 
    Find,
    statistic,
    getPopularCategories,
    getEmptyCategories
 };
