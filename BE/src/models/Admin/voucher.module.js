import db from '../../utils/db.js';

const getAllVoucher = async (params = {}) => {
    const result = {
        status: true,
        Voucher: {},
        product: {}
    };

    try {
        const categories = {};
        const product = {};

        const limit = 20;
        const page = params.page || 1;
        const offset = (page - 1) * limit;

        let VoucherQuery = `SELECT * FROM voucher WHERE 1=1`;
        let totalQuery = `SELECT COUNT(*) FROM voucher WHERE 1=1`;

        if (params.categories) {
            if (params.categories.all !== undefined) {
                VoucherQuery += ` ${params.categories.all}`;
            }
            if (params.categories.total !== undefined) {
                totalQuery += ` ${params.categories.total}`;
            }
        }

        // Thực hiện truy vấn
        const totalRes = await db.query(totalQuery);
        const VoucherRes = await db.query(`${VoucherQuery} LIMIT $1 OFFSET $2`, [limit, offset]);

        categories.total = parseInt(totalRes.rows[0].count);
        categories.data = VoucherRes.rows;

        result.Voucher = categories;

    } catch (error) {
        result.status = false;
        result.errMessage = error.message;
        console.error("Lỗi truy vấn:", error);
    } finally {
        return result;
    }
};

const edit = async (params = {}) => {
    const result = {
        success: true,
        message: ''
    };

    const { id, tenDanhMuc, moTa, danhMucCha } = params;

    if (!id) {
        result.success = false;
        result.message = 'Thiếu ID voucher để cập nhật';
        return result;
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (tenDanhMuc !== undefined) {
        fields.push(`"tenDanhMuc" = $${idx++}`);
        values.push(tenDanhMuc);
    }

    if (moTa !== undefined) {
        fields.push(`"moTa" = $${idx++}`);
        values.push(moTa);
    }

    if (danhMucCha !== undefined) {
        fields.push(`"danhMucCha" = $${idx++}`);
        values.push(danhMucCha);
    }

    if (fields.length === 0) {
        result.success = false;
        result.message = 'Không có dữ liệu nào để cập nhật';
        return result;
    }

    values.push(id);

    const query = `UPDATE voucher SET ${fields.join(', ')} WHERE id = $${idx}`;

    try {
        await db.query(query, values);
    } catch (error) {
        result.success = false;
        result.message = error.message;
    } finally {
        return result;
    }
};

const deleteVoucher = async (params = {}) => {
    const result = {
        success: true,
        message: ''
    };

    try {
        const id = params.id;
        if (!id) {
            result.success = false;
            result.message = 'Thiếu ID để xoá danh mục';
            return result;
        }

        await db.query("DELETE FROM voucher WHERE id = $1", [id]);
    } catch (error) {
        result.success = false;
        result.message = error.message;
    } finally {
        return result;
    }
};

// Stub (có thể bổ sung sau)
const backUpVoucher = async (params = {}) => {
    return { status: true, message: "Chưa triển khai chức năng backup" };
};

export default { 
    getAllVoucher, 
    edit, 
    deleteVoucher, 
    backUpVoucher 
};
