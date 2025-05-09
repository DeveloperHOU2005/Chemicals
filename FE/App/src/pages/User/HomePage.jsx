import React, { useState, useEffect, useContext } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Heart } from 'lucide-react';


import RotatingBanner from '../../components/common/user/RotatingBanner.jsx'
import productApi from '../../services/productApi';
import categoryApi from '../../services/categoryApi.js'
import { Link, useNavigate  } from 'react-router-dom';

  
export default function ChemicalStore( {isLogin, account}) {
  const [categories, setCategories] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])

  const navigate = useNavigate();
  useEffect(()=>{
        const loadData = async ()=>{
            const category = await categoryApi.getAllCategories();
            const data = (category.category)
            const value = data.slice(0,10)
            setCategories(value)       
            
            const product = await productApi.getTrendingProducts();
            setFeaturedProducts(product.products)
        }
        loadData();
  }, [])

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleClickCategory = (id) => () => {
    navigate('/products/category/' + id);
  } 
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Banner */}
        <RotatingBanner />

        {/* Categories */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Danh mục sản phẩm</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(0, 4).map((categories) => (
                <div key={categories.id} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={handleClickCategory(categories.id)}>
                  <div className="bg-teal-100 w-max-[15vw] h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-teal-600 font-bold text-xl">{categories.tendanhmuc}</span>
                  </div>
                  <h3 className="font-medium">{categories.name}</h3>
                  <p className="text-sm text-gray-500">{categories.total} sản phẩm</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                className="border border-teal-600 text-teal-600 px-6 py-2 rounded-lg font-medium hover:bg-teal-50"
                to="/category"
              >
                Xem tất cả danh mục
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                      {product.imageUrl.length  > 0 ? 
                      <img src={product.imageUrl[0]} alt={product.tensp} className="w-full h-48 object-cover" /> :
                      <Image className="w-full h-48 object-cover text-gray-400"/>}<button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:text-red-500">
                      <Heart size={20} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-teal-600 font-medium mb-1">{product.tendanhmuc}</div>
                    <h3 className="font-medium text-lg mb-2">{product.tensp}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-500">Trạng thái: {product.trangthai}</div>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm">{product.danh_gia}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-bold text-lg text-teal-600">{formatPrice(product.gia)}</div>
                      <button 
                        onClick={addToCart}
                        className="bg-teal-600 text-white px-3 py-1 rounded-lg hover:bg-teal-700 text-sm"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                className="border bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-500"
                to="/products"
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Tại sao chọn ChemTech?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.309 48.309 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Chất lượng đảm bảo</h3>
                <p className="text-gray-600">Chúng tôi cung cấp hóa chất với độ tinh khiết cao, đạt tiêu chuẩn quốc tế</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Giao hàng nhanh chóng</h3>
                <p className="text-gray-600">Vận chuyển an toàn, đúng tiêu chuẩn với đội ngũ chuyên nghiệp</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Hỗ trợ chuyên nghiệp</h3>
                <p className="text-gray-600">Đội ngũ chuyên gia sẵn sàng tư vấn và hỗ trợ kỹ thuật</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Khách hàng nói gì về chúng tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
                <p className="text-gray-600 mb-4">
                  "Tôi rất hài lòng với chất lượng hóa chất từ ChemTech. Các sản phẩm luôn đạt độ tinh khiết cao và phù hợp cho các thí nghiệm nghiên cứu của chúng tôi."
                </p>
                <div className="flex items-center">
                  <img  className="w-12 h-12 bg-gray-200 rounded-full mr-4" src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="" />
                  <div>
                    <div className="font-medium">TS. Nguyễn Văn A</div>
                    <div className="text-sm text-gray-500">Viện Hóa học - Vật liệu</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
                <p className="text-gray-600 mb-4">
                  "Dịch vụ giao hàng nhanh chóng và đáng tin cậy. Đóng gói an toàn và đảm bảo chất lượng sản phẩm. Tôi sẽ tiếp tục sử dụng dịch vụ của ChemTech."
                </p>
                <div className="flex items-center">
                  <img  className="w-12 h-12 bg-gray-200 rounded-full mr-4" src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="" />
                  <div>
                    <div className="font-medium">KS. Trần Thị B</div>
                    <div className="text-sm text-gray-500">Công ty Dược phẩm XYZ</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
                <p className="text-gray-600 mb-4">
                  "Chất lượng tư vấn rất tốt, đội ngũ kỹ thuật đã giúp chúng tôi lựa chọn đúng loại hóa chất phù hợp cho quy trình sản xuất mới."
                </p>
                <div className="flex items-center">
                  <img  className="w-12 h-12 bg-gray-200 rounded-full mr-4" src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="" />
                  <div>
                    <div className="font-medium">Ông Lê Văn C</div>
                    <div className="text-sm text-gray-500">Giám đốc Nhà máy QRS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-12 bg-teal-600 text-white flex gap-2 px-10">
          <div className='p-5 bg-white rounded-lg border border-cyan-500 hover:border-sky-500'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77216.21333202411!2d105.44105948965361!3d21.137873868679133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345f2e11203e19%3A0xdd629cceaa0c04e7!2zVGjhuqNvIHZpw6puIFJlc29ydA!5e0!3m2!1svi!2s!4v1744441007381!5m2!1svi!2s" 
            width="600" 
            height="450" 
            style={{ marginRight: '1em' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className='border border-emerald-400 rounded-md'
            ></iframe>
          </div>
          <div className="container mx-auto px-4 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Đăng ký nhận tin</h2>
            <p className="mb-6 max-w-xl mx-auto">Nhận thông tin về sản phẩm mới, khuyến mãi và hướng dẫn sử dụng hóa chất an toàn</p>
            <div className="flex flex-col md:flex-row max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="flex-1 px-4 py-2 rounded-l-lg md:rounded-r-none mb-2 md:mb-0 text-gray-800"
              />
              <button className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-lg md:rounded-l-none font-medium">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Back to top button */}
      <button className="fixed bottom-6 right-6 bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-teal-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}