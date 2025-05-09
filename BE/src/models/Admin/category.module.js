import db from '../../utils/db.js';

const getAllCategory = async (params = {}) => {
    const result = {
        status: true,
        category: {}
    };

    try {
        const categories = {};

        let categoryQuery = `SELECT * FROM dm WHERE 1=1 AND id != 0`;
        let totalQuery = `SELECT COUNT(*) FROM dm WHERE 1=1 AND id != 0`;

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
        const categoryRes = await db.query(`${categoryQuery}`, queryValues);

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
        const query = `SELECT * FROM dm WHERE  tenDanhMuc ILIKE $1 AND id != 0`; // ILIKE: không phân biệt hoa thường
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
        message: 'Success'
    };

    const { id, name, description, paren, status,  total} = params;

    if (!id) {
        result.success = false;
        result.message = 'Thiếu ID danh mục để cập nhật';
        return result;
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (name !== undefined) {
        fields.push(`"tendanhmuc" = $${idx++}`);
        values.push(name);
    }
    if (status !== undefined) {
        fields.push(`"status" = $${idx++}`);
        values.push(status);
    }
    if (description !== undefined) {
        fields.push(`"mota" = $${idx++}`);
        values.push(description);
    }
    if (total !== undefined) {
        fields.push(`"total" = $${idx++}`);
        values.push(total);
    }

    if (paren !== undefined) {
        fields.push(`"danhmuccha" = $${idx++}`);
        values.push(paren);
    }
    fields.push(`"adddate" = $${idx++}`);
    values.push(new Date().toISOString());
    if (fields.length === 0) {
        result.success = false;
        result.message = 'Không có dữ liệu nào để cập nhật';
        return result;
    }

    values.push(id);

    const query = `UPDATE dm SET ${fields.join(', ')} WHERE id = $${idx}`;

    try {
        await db.query(query, values);
        if (status !== undefined && status === 'inactive') {
            await db.query("UPDATE sp_dm_relations SET dm_id = 0 WHERE dm_id = $1", [id]);
        }
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
        await db.query("UPDATE sp_dm_relations SET dm_id = 0 WHERE dm_id = $1", [id]);
        await db.query("DELETE FROM dm WHERE id = $1 AND id != 0", [id]);
    } catch (error) {
        result.success = false;
        result.message = error.message;
    } finally {
        return result;
    }
};

const addCategoryModule = async (param = {}) => {
    const result = {
        status: true,
        errMessage: 'Thêm danh mục thành công',
        data: {}
    }
    try {
        result.data = (await db.query('INSERT INTO dm(tendanhmuc, mota, danhmuccha, status, adddate) VALUES ($1, $2, $3, $4, $5) RETURNING *', [param.tenDanhMuc, param.mota, param.danhmuccha, param.status, new Date().toISOString()])).rows[0];
    } catch (error) {
        console.error("Lỗi thêm danh mục:", error);
        result.status = false;
        result.errMessage = error.message;
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
        const categoryCount = await db.query("SELECT COUNT(*) AS total FROM dm WHERE id != 0");
        result.totalCategory = parseInt(categoryCount.rows[0].total);

        // Tổng số sản phẩm
        const productCount = await db.query("SELECT COUNT(*) AS total FROM sp");
        result.totalProduct = parseInt(productCount.rows[0].total);

        // Số lượng sản phẩm theo từng danh mục
        const perCategory = await db.query(`
            SELECT dm.id, dm.tenDanhMuc, COUNT(sp.id) AS totalProduct
            FROM dm
            LEFT JOIN sp_dm_relations ON sp_dm_relations.dm_id = dm.id
            LEFT JOIN sp ON sp.id = sp_dm_relations.sp_id
            WHERE dm.id != 0
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
            JOIN sp_dm_relations r ON dm.id = r.dm_id
            JOIN sp ON sp.id = r.sp_id
            WHERE dm.id != 0
            GROUP BY dm.id
            ORDER BY soLuongSanPham DESC
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
            WHERE dm.total = 0
            ORDER BY dm.tenDanhMuc ASC
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
    addCategoryModule, 
    Find,
    statistic,
    getPopularCategories,
    getEmptyCategories
 };
