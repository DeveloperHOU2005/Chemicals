import { useState, useEffect, useContext } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

import SearchBar from '../SearchBar.jsx'
import context from '../../../context/userContext.jsx'
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Ví dụ có 3 sản phẩm trong giỏ hàng
  const [isLogin, setIsLogin] = useState(false); // Trạng thái đăng nhập
  const navigate = useNavigate();
  const Context = useContext(context.UserContext);
  // Danh sách danh mục sản phẩm
  const categories = [
    { name: "Hóa chất công nghiệp", count: 125 },
    { name: "Hóa chất phòng thí nghiệm", count: 87 },
    { name: "Dung môi", count: 64 },
    { name: "Acid và bazơ", count: 42 },
    { name: "Thuốc thử phân tích", count: 56 },
    { name: "Chất chỉ thị", count: 31 }
  ];

  useEffect(()=>{
    setIsLogin(true)
  }, [])

  const handleClick = (url) => {
    navigate(url);
  };
  return (
    <>
    {/* Footer */}
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ChemTech</h3>
              <p className="text-gray-400 mb-4">Nhà cung cấp hóa chất hàng đầu cho nghiên cứu và công nghiệp</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm2.5 15.6c-2.068.14-3.72-.42-5.05-1.47-.12.23-.24.46-.36.7-.42.77-.68 1.52-1.22 2.2h-.04c-.42-.57-.28-1.23-.34-1.86-.06-.59-.68-3.27-.94-3.97-.28.05-1.01.18-1.48.25-.17.08-.34-.04-.42-.23-.1-.2 0-.4.18-.5 1.3-.5 2.47-1.7 3.1-2.9.31-.6 1.52-2.4 1.17-3.22-.19-.5-.9-.52-1.37-.66.13-.2.33-.33.57-.37 1.54-.08 3.94.74 2.17 3.22-.2.33-.52.62-.72.92-.14.23-.25.46-.34.7.71 1.02 1.43 2 2.1 3.1.61-.53 1-1.27 1.76-1.52.91-.38 2 .22 1.79 1.3-.38 2.41-3.03 2.34-4.2 3.24.4.31.88.59 1.4.83 1.18.52 2.73.33 3.6-.56.38-.38.61-.9.7-1.45.55-2.82-1.94-4.7-3.7-6.45l-.11-.11c-.21-.18-.21-.52-.04-.73.3-.38.63-.81.91-1.38.22-.42 1.12-2.32-.04-2.63-1.56-.37-2.63 1.62-3.25 2.69.03-.69-.18-1.35-.43-1.95.5-.22 1-.41 1.52-.53 2.96-.58 6.48.77 7.8 3.58 1.44 3.02.19 6.67-2.42 8.56-.78.56-1.67.96-2.66 1.15z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Thông tin</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog hóa học</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Dịch vụ khách hàng</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Hướng dẫn an toàn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Phương thức thanh toán</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Chính sách đổi trả</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Hỗ trợ kỹ thuật</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>123 Đường Khoa học, Q.1, TP.HCM</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>(028) 1234 5678</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>info@chemtech.vn</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Thứ 2 - Thứ 6: 8:00 - 17:00</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 ChemTech. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex space-x-4">
                <img src="image/pay1.jpg" alt="Thanh toán" className="h-8" />
                <img src="image/pay2.jpg" alt="Thanh toán" className="h-8" />
                <img src="image/pay3.jpg" alt="Thanh toán" className="h-8" />
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="Thanh toán" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}