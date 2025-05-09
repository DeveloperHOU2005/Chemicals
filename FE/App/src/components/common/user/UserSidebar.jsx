import { useState, useEffect, useContext } from 'react';
import { UserPlus , ShoppingCart, User, Menu, X, ChevronDown, LogIn  } from 'lucide-react';

import SearchBar from '../SearchBar.jsx'
import context from '../../../context/userContext.jsx'
import { Links, NavLink, useNavigate } from 'react-router-dom';
import categoryApi from '../../../services/categoryApi.js'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(3); // Ví dụ có 3 sản phẩm trong giỏ hàng
  const [isLogin, setIsLogin] = useState(false); // Trạng thái đăng nhập
  const navigate = useNavigate();
  
  useEffect(()=>{
    const loadData = async ()=>{
          const category = await categoryApi.getAllCategories();
          const data = (category.category)
          setCategories(data.slice(0,8))
          }
    loadData();
    setIsLogin(false)
  }, [])

  const handleClick = (url) => {
    navigate(url);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden mr-4"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-2xl font-bold text-teal-600" onClick={()=>{handleClick('/')}}>ChemTech</div>
          </div>
          
          <div className="hidden md:flex flex-1 mx-10">
            <SearchBar />
          </div>
          
          <div className="flex items-center space-x-4">
            
            
            {isLogin ? (
              <div>
                <div className="relative flex items-center text-gray-700 hover:text-teal-600 cursor-pointer" onClick={()=>{handleClick('/shopping-cart')}}>
                  <ShoppingCart size={20}/>
                  <span className="ml-1">Giỏ hàng</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </div>
                  <div className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-teal-600 cursor-pointer" onClick={()=>{handleClick('/account')}}>
                    <User size={20} />
                    <span>Tài khoản</span>
                  </div>
              </div>
              
            ) : (
              <div className="hidden md:flex items-center space-x-2 text-gray-700">
                <button className="bg-white flex items-center gap-2 border-[1px] border-teal-500 text-gray-800 px-4 py-2 rounded-lg hover:bg-teal-700 hover:text-white transition delay-150" onClick={()=>{handleClick('/login')}}>
                  <LogIn size={20}/>
                  Đăng nhập
                </button>
                <button className="bg-teal-600 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition delay-150" onClick={()=>{handleClick('/register')}}>
                  <UserPlus  size={20}/>
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:block py-4 border-t">
          <ul className="flex space-x-8">
            <NavLink className="text-gray-800 hover:text-teal-600 font-medium cursor-pointer" to={'/'}>Trang chủ</NavLink>
            <li className="group relative text-gray-800 hover:text-teal-600 font-medium cursor-pointer">
              <div className="flex items-center">
                Danh mục
                <ChevronDown size={16} className="ml-1" />
              </div>
              <div className="absolute left-0 top-full z-10 hidden group-hover:block bg-white border shadow-lg rounded-lg w-60 py-2">
                {categories.map((category) => (
                  <NavLink 
                    key={category.id} 
                    href="#" 
                    className="px-4 py-2 hover:bg-gray-100 flex justify-between"
                    to={`/category`}
                  >
                    <span>{category.tendanhmuc}</span>
                    <span className="text-gray-500 text-sm">{category.total}</span>
                  </NavLink>
                ))}
                <NavLink className="px-4 py-2 hover:bg-gray-100 flex justify-between" to={'/category'}><span>Xem tất cả danh mục</span></NavLink>
              </div>
            </li>
            <NavLink className="text-gray-800 hover:text-teal-600 font-medium cursor-pointer" to={'/voucher'}>Khuyến mãi</NavLink>
            <NavLink className="text-gray-800 hover:text-teal-600 font-medium cursor-pointer" to={'/SafetyGuidelines'}>Hướng dẫn an toàn</NavLink>
            <NavLink className="text-gray-800 hover:text-teal-600 font-medium cursor-pointer" to={'/about'}>Giới thiệu</NavLink>
            <NavLink className="text-gray-800 hover:text-teal-600 font-medium cursor-pointer" to={'/contact'}>Liên hệ</NavLink>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar />
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-50">
          <ul className="space-y-2">
            <NavLink className="p-2 hover:bg-gray-100 rounded" to={'/'}>Trang chủ</NavLink>
            <NavLink className="p-2 hover:bg-gray-100 rounded" to={'/categories'}>Danh mục</NavLink>
            <NavLink className="p-2 hover:bg-gray-100 rounded" to={'/voucher'}>Khuyến mãi</NavLink>
            <NavLink className="p-2 hover:bg-gray-100 rounded" to={'/SafetyGuidelines'}>Hướng dẫn an toàn</NavLink>
            <NavLink className="p-2 hover:bg-gray-100 rounded" to={'/about'}>Giới thiệu</NavLink>
            <NavLink className="p-2 hover:bg-gray-100 rounded" to={'/contact'}>Liên hệ</NavLink>
            <NavLink className="p-2 hover:bg-gray-100 rounded" to={'/account'}>Tài khoản</NavLink>
          </ul>
        </div>
      )}
    </header>
  );
}