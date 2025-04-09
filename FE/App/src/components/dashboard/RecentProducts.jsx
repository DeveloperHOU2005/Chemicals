import { useState, useEffect } from 'react';
import productData from '../../services/Admin/productData.js';

const RecentProduct = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const list = await productData.dataAllProduct();
                console.log("Dữ liệu API nhận được:", list);
                setData(list);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Sản phẩm mới</h3>

            {data.length === 0 ? (
                <h4 className="text-xl mb-4 text-gray-500 text-center">Không có dữ liệu</h4>
            ) : (
                <div className="grid grid-cols-5 gap-4">
                    {data.map((e) => (
                        <div key={e.products.id} className="border p-3 rounded-lg shadow">
                            <img 
                                src={e.image?.[0] || 'logo.svg'} 
                                alt={e.products.tenSP || "Sản phẩm"} 
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <p className="font-semibold">{e.products.tenSP || "Tên SP"}</p>
                            <p className="text-gray-600">{e.products.gia || "0đ"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentProduct;
