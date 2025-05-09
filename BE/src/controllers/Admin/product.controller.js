import productModule from "../../models/Admin/product.module.js";

const getProductList = async (req, res) => {
    const result = {
        status: true,
        message: "Thành công!",
        data: {}
    };    
    const list = await productModule.getAllProduct();
    result.status = list.status
    result.total = list.product.total || 0; 
    result.data = list.product.data || [];
    res.status(result.status ? 200 : 500).json(result);
};

const find = async (req, res)=>{


    const param = {
        product :{
             name:  `tenSP LIKE '%${req.query.name}%'`
        }
    }
    const list = await productModule.getAllProduct(param);

    if (!list.status) {
        return res.json({ status: 500, data: list.errMessage });
    }

    // Đảm bảo dữ liệu không bị undefined
    const categoryData = list.category?.data || [];
    const productData = list.product?.data || [];
    const imageData = list.product?.image || [];

    // Gọi hàm xử lý sản phẩm
    const processedProducts = convertProduct({
        categories: categoryData, 
        product: productData, 
        image: imageData
    });

    // Kết quả trả về
    const result = {
        status: 200,
        category: list.category,
        product: {
            total: list.product.total,
            data: processedProducts
        }
    };

    res.json({ data: result });
}


const getProductsByCategory = async (req, res) => {
    const result = {
        status: true,
        message: 'Success',
        data: []
    };

    const categoryId = req.params.id;

    if (!categoryId) {
        result.status = false;
        result.message = 'Thiếu ID danh mục';
        return res.status(400).json({ data: result });
    }

    try {
        const products = await productModule.getByCategoryId(categoryId);
        result.data = products.data || []; // Đảm bảo dữ liệu không bị undefined
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    return res.status(result.status ? 200 : 500).json( result);
};


const deleteProduct = async (req, res) => {
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
        const deleteResult = await productModule.deleteProduct(id);
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

const addProduct = async (req, res)=>{
    const result = {
        status: true,
        message: 'Success'
    };

    const values = req.body || null
    console.log(values)
    if (values.tensp === undefined) {
        result.status = false;
        result.message = 'Thông tin trống!';
        return res.status(400).json({ data: result });
    }

    try {
        const query = productModule.addProduct(values)
        if(query === -1)
        {
            result.status = false
            result.message = 'Thêm thất bại!'
        }
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    return res.status(result.status ? 200 : 500).json({ data: result });
}
const editProduct = async (req, res) => {
    // Giả sử các thông tin cập nhật được gửi trong req.body, bao gồm các field cần cập nhật và id sản phẩm
    const params = req.body;
  
    const result = await productModule.editProduct(params);
    return res.status(result.success ? 200 : 500).json({ data: result });
};




const statistics = async (req, res) => {
    const result = {
        status: true,
        data: {},
        message: ""
    };

    try {
        const data = await productModule.statistics(); // Đợi kết quả trả về

        if (data.status) {
            result.status = true;
            result.data = { ...data };
            delete result.data.status;
            result.message = "Thành công!";
        } else {
            result.status = false;
            result.message = "Thất bại! " + (data.err || "Lỗi không xác định");
        }
    } catch (err) {
        result.status = false;
        result.message = "Lỗi hệ thống: " + err.message;
    }

    res.status(result.status ? 200 : 500).json(result);
};

const rateProduct = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}

// dữ liệu tổng quan cho đánh giá gồm có nội dung đánh giá, sản phẩm được đánh giá, độ hữu ích 
const getReviews = async (req, res)=>{
    const result = {
        status: true, 
        message: "Thành công!", 

    }
}
const getTopSellingProducts = async (req, res)=>{
    const result = {
        status: true,
        data: {},
        message: ""
    };

    try {
        const data = await productModule.getTopSellingProducts(); // Đợi kết quả trả về

        if (data.status) {
            result.status = true;
            result.data = { ...data };
            delete result.data.status;
            result.message = "Thành công!";
        } else {
            result.status = false;
            result.message = "Thất bại! " + (data.err || "Lỗi không xác định");
        }
    } catch (err) {
        result.status = false;
        result.message = "Lỗi hệ thống: " + err.message;
    }

    res.status(result.status ? 200 : 500).json(result);
}
const getLowStockProducts = async (req, res)=>{
    const result = {
        status: true,
        data: {},
        message: ""
    };

    try {
        const data = await productModule.getLowStockProducts(); // Đợi kết quả trả về

        if (data.status) {
            result.status = true;
            result.data = { ...data };
            delete result.data.status;
            result.message = "Thành công!";
        } else {
            result.status = false;
            result.message = "Thất bại! " + (data.err || "Lỗi không xác định");
        }
    } catch (err) {
        result.status = false;
        result.message = "Lỗi hệ thống: " + err.message;
    }

    res.status(result.status ? 200 : 500).json(result);
}
const getProductHistory = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const getRecommendations = async (req, res)=>{
    const param = {
        page : req.query.page, 
        limit : req.query.limit
    }
    const list = await productModule.getRecommendations(param);

    if (!list.status) {
        return res.json({ status: 500, data: list.errMessage });
    }

    // Đảm bảo dữ liệu không bị undefined
    const categoryData = list.category?.data || [];
    const productData = list.product?.data || [];
    const imageData = list.product?.image || [];

    // Gọi hàm xử lý sản phẩm
    const processedProducts = convertProduct({
        categories: categoryData, 
        product: productData, 
        image: imageData
    });

    // Kết quả trả về
    const result = {
        status: 200,
        // category: list.category,
        product: {
            total: list.product.total,
            data: processedProducts
        }
    };

    res.json({ data: result });
}
const getTrendingProducts = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const filterProducts = async (req, res)=>{
    const result = {
        status: true, 
        message: "Thành công!"
    }
    const params = req.query
    if(params === undefined){
        result.status = false
        result.message = 'Danh mục lọc trống!'
        return res.status(result.status ? 200 : 500).json(result)
    }
    try {
        const data = await productModule.filterProducts(params)
        if(data.success){
            result.total = data.total
            result.data = data.data
        }else{
            result.status = false
            result.message = 'Truy vấn thất bại'
            result.err = data.message
        }
    } catch (error) {
        result.status = false
        result.message = 'Thất bại'
        result.err = error.message
    }finally{
        return res.status(result.status ? 200 : 500).json(result)
    }
}




export default { 
    getProductList, 
    find, 
    deleteProduct, 
    addProduct, 
    editProduct, 
    getProductsByCategory,
    statistics,
    rateProduct,
    getReviews,
    getTopSellingProducts,
    getLowStockProducts,
    getProductHistory,
    getRecommendations,
    getTrendingProducts,
    filterProducts
};
