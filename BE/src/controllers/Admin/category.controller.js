import category from '../../models/Admin/category.module.js'


// danh mục 
const getCategory = async (req, res)=>{
    const param = {
        page : req.query.page, 
        limit : req.query.limit
    }
    const list = await category.getAllCategory();
    
    if (!list.status) {
        return res.json({ status: 500, data: list.errMessage });
    }
    
    // Đảm bảo dữ liệu không bị undefined
    const categoryData = list.category?.data || [];

    // Kết quả trả về
    const result = {
        status: 200,
        category: list.category
    };
    
    res.json({ data: result });
}

const edit = async (req, res)=>{
    let result = {
        status: true,
        message: 'Success'
    };

    const id = parseInt(req.query.id) || 0;

    if (id === 0) {
        result.status = false;
        result.message = 'Dữ liệu không được bỏ trống!';
        return res.status(400).json({ data: result }); // dùng 400 cho lỗi người dùng
    }

    try {
        const data = await category.getACategory(id);
        result.data = data.category.data
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    return res.status(result.status ? 200 : 500).json({ data: result });
}

const find = async (req, res)=> {
    let result = {
        status: true,
        message: 'Success'
    };

    const name = req.query.name || null;
    if (!name) {
        result.status = false;
        result.message = 'Dữ liệu không được bỏ trống!';
        return res.status(400).json({ data: result });
    }

    try {
        const data = await category.Find(name);
        result.data = data;
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    return res.status(result.status ? 200 : 500).json({ data: result });
};


const deleteCategory = async (req, res) => {
    let result = {
        status: true,
        message: 'Success'
    };

    const id = parseInt(req.query.id) || 0;

    if (id === 0) {
        result.status = false;
        result.message = 'Dữ liệu không được bỏ trống!';
        return res.status(400).json({ data: result }); // dùng 400 cho lỗi người dùng
    }

    try {
        const deleteResult = await category.deleteCategory(id);
        result = {
            status: deleteResult.success,
            message: deleteResult.message
        };
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    return res.status(result.status ? 200 : 500).json({ data: result });
};


const addCategory = async (req, res)=>{
    const result = {
        status: true, 
        message: 'Success', 
        
    }
    const data = req.body || null
    if(data === null){
        result.status = false
        result.message = 'Dữ liệu không được bỏ trống!'
        res.status(404).json({data: result})
    }else{
        try {
            const query = category.addCategory(data)
            if(query !== 0)
            {
                result.message = 'Thành công!'            
            }else{
                result.message = 'Thất bại!'
                result.status = false
            }
        } catch (error) {
            result.status = false
            result.message = 'Lỗi: ' + error.message
        }finally{
            res.status((result.status === true ? 200 : 500)).json({data: result})
        }
    }
}

const editCategory = async (req, res) => {
    let result = {
        status: true,
        message: 'Success'
    };

    const data = req.body || null;

    if (!data || !data.id) {
        result.status = false;
        result.message = 'Thiếu ID hoặc dữ liệu không được bỏ trống!';
        return res.status(400).json({ data: result });
    }

    try {
        // Lấy dữ liệu cũ
        const oldDataRes = await category.getACategory(data.id);
        const oldData = oldDataRes.category.data;

        if (!oldData) {
            result.status = false;
            result.message = 'Không tìm thấy danh mục với ID đã cung cấp';
            return res.status(404).json({ data: result });
        }

        // So sánh và tạo param cập nhật
        const updates = { id: data.id };

        if (data.tenDanhMuc !== undefined && data.tenDanhMuc !== oldData.tenDanhMuc) {
            updates.tenDanhMuc = data.tenDanhMuc;
        }

        if (data.moTa !== undefined && data.moTa !== oldData.moTa) {
            updates.moTa = data.moTa;
        }

        if (data.danhMucCha !== undefined && data.danhMucCha !== oldData.danhMucCha) {
            updates.danhMucCha = data.danhMucCha;
        }

        const editResult = await category.edit(updates);
        result = {
            ...result,
            ...editResult
        };
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    return res.status(result.success ? 200 : 500).json({ data: result });
};


const statistics = async (req, res) => {
    const result = {
        status: true,
        message: 'Success',
        data: {}
    };

    try {
        const stats = await category.statistic();
        result.data = stats;
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    res.status(result.status ? 200 : 500).json({ data: result });
}

const getPopularCategories = async (req, res) => {
    const result = {
        status: true,
        message: "Thành công"
    };

    try {
        const data = await category.getPopularCategories();
        result.data = data;
    } catch (error) {
        result.status = false;
        result.message = "Lỗi: " + error.message;
    }

    return res.status(result.status ? 200 : 500).json({ data: result });
};

const getEmptyCategories = async (req, res) => {
    const result = {
        status: true,
        message: "Thành công"
    };

    try {
        const data = await category.getEmptyCategories();
        result.data = data;
    } catch (error) {
        result.status = false;
        result.message = "Lỗi: " + error.message;
    }

    return res.status(result.status ? 200 : 500).json({ data: result });
};


export default {
    getCategory, 
    edit, 
    find, 
    deleteCategory, 
    addCategory, 
    editCategory, 
    statistics, 
    getPopularCategories,
    getEmptyCategories
 };
