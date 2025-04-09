import axios from 'axios';

const dataAllProduct = async () => {
    try {
        const { data } = await axios.get('http://localhost:8080/v1/admin/products?limit=10');
        return data.data.product.data; 
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return { product: [] }; // Trả về mảng rỗng nếu lỗi
    }
};

export default { dataAllProduct };
