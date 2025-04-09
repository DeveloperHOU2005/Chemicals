import fs from 'fs'
import cloudinary from '../../config/cloudinary.js';

import productModule from "../../models/Admin/product.module.js";

const convertProduct = ({ categories, product, image }) => {
    // Tạo Map để tra cứu nhanh hơn
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.tenDanhMuc]));
    const imageMap = new Map();

    // Gom nhóm ảnh theo sản phẩm
    image.forEach(img => {
        if (!imageMap.has(img.sp_id)) {
            imageMap.set(img.sp_id, []);
        }
        imageMap.get(img.sp_id).push(img.hinh);
    });

    // Xử lý danh sách sản phẩm
    return product.map(item => ({
        products: item,
        category: {
            categoryName: categoryMap.get(item.dm) || 'Không xác định'
        },
        image: imageMap.get(item.id) || []
    }));
}

const getProductList = async (req, res) => {
    const param = {
        page : req.query.page, 
        limit : req.query.limit
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
        result.data = products;
    } catch (error) {
        result.status = false;
        result.message = 'Lỗi: ' + error.message;
    }

    return res.status(result.status ? 200 : 500).json({ data: result });
};



const buy = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
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

    if (!values) {
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




const statistics = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const rateProduct = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const getReviews = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const getTopSellingProducts = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const getLowStockProducts = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const getProductHistory = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const getRecommendations = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const getTrendingProducts = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}
const filterProducts = async (req, res)=>{
    res.status(200).json( { status: true, message: "Chưa triển khai chức năng" } )
}




export default { 
    getProductList, 
    find, 
    buy, 
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
