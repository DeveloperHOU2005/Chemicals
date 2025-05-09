import category from '../../models/Admin/category.module.js'


// danh mục 
const getCategory = async (req, res)=>{
    const list = await category.getAllCategory();
    list.category.data.forEach(element => {
        let name = 'không xác định'
        list.category.data.forEach(e => {
            if(e.id === element.danhmuccha){
                name = e.tendanhmuc
            }
        });
        element.idParent = element.danhmuccha
        element.danhmuccha = name
    });
    if (!list.status) {
        return res.json({ status: 500, data: list.errMessage });
    }
    
    // Đảm bảo dữ liệu không bị undefined
    const categoryData = list.category?.data || [];

    // Kết quả trả về
    const result = {
        status: 200,
        category: list.category.data,
        total: list.category.total
    };
    
    res.json(result);
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

    const id = parseInt(req.params.id) || 0;

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

const addCategory = async (req, res) => {
    const result = {
        status: true, 
        message: 'Success'
    }
    const data = req.body || null
    if(data === null){
        result.status = false
        result.message = 'Dữ liệu không được bỏ trống!'
        return res.status(404).json(result)
    }
    
    try {
        // Transform data fields to match your database field names if needed
        const categoryData = {
            tenDanhMuc: data.name,
            mota: data.description,
            danhmuccha: data.paren || 0,
            status: data.status || 'active'
        };
        
        const query = await category.addCategoryModule(categoryData)
        if(query.status) {
            result.data = query.data
            result.message = 'Thành công!'            
        } else {
            result.message = query.errMessage
            result.message = 'Thất bại!'
            result.status = false
        }
    } catch (error) {
        result.status = false
        result.message = 'Lỗi: ' + error.message
    }
    
    return res.status((result.status === true ? 200 : 500)).json({data: result})
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

        if (data.name !== undefined && data.name !== oldData.tenDanhMuc) {
            updates.name = data.name;
        }

        if (data.description !== undefined && data.description !== oldData.mota) {
            updates.description = data.description;
        }

        if (data.paren !== undefined && data.paren !== oldData.danhmuccha) {
            updates.paren = data.paren;
        }
        
        if (data.status !== undefined && data.status !== oldData.status) {
            updates.status = data.status;
        }
        
        if (data.total !== undefined && data.total !== oldData.total) {
            updates.total = data.total;
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

    return res.status(result.status ? 200 : 500).json({ data: result });
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
        result.data = data.categories;
        result.status = data.status;
        result.message = data.message || "Thành công";
    } catch (error) {
        result.status = false;
        result.message = "Lỗi: " + error.message;
    }

    return res.status(result.status ? 200 : 500).json(result);
};

const getEmptyCategories = async (req, res) => {
    let result = {
        status: true,
        message: "Thành công"
    };

    try {
        const data = await category.getEmptyCategories();
        result = data;
    } catch (error) {
        result.status = false;
        result.message = "Lỗi: " + error.message;
    }
    return res.status(result.status ? 200 : 500).json({ result });
};


export default {
    getCategory, 
    find, 
    deleteCategory, 
    addCategory, 
    editCategory, 
    statistics, 
    getPopularCategories,
    getEmptyCategories
 };
