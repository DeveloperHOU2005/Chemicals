import React, { useState, useEffect, useContext } from 'react';
import { Bell, User, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AdminContext';

const Header = ({ title, description }) => {
  const navigate = useNavigate();
  const {
    collapsed,
    account,
    nofiticals,
    nofiticalState,
    detailNofitical,
    setDetailNofitical,
    detailAccount,
    setDetailAccount,
  } = useContext(UserContext);

  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleNofiticalClick = () => {
    setDetailNofitical(!detailNofitical);
  };

  const handleProfileClick = () => {
    setDetailAccount(true);
    setShowUserMenu(false);
    navigate(`/admin/profile/${account.id}`);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Đóng menu người dùng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      const userMenuElement = document.getElementById('user-menu');
      if (userMenuElement && !userMenuElement.contains(event.target) && showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Đếm số thông báo chưa đọc
  const unreadCount = nofiticals.filter(item => !item.read).length;

  return (
    <header className={`bg-white px-6 py-4 shadow-md fixed top-2 left-0 right-0 z-20 ${collapsed ? 'ml-24' : 'ml-72'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>

        <div className="flex items-center space-x-5">
          {/* Nút thông báo */}
          <button
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={handleNofiticalClick}
            aria-label="Thông báo"
          >
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && nofiticalState ? (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs font-bold rounded-full flex justify-center items-center text-white">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {/* Dropdown người dùng */}
          <div className="relative" id="user-menu">
            <button
              className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-lg py-2 px-3 transition-colors duration-200"
              onClick={toggleUserMenu}
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              <div className="relative w-8 h-8 overflow-hidden bg-blue-600 rounded-full flex items-center justify-center">
                {account.avatar ? (
                  <img 
                    src={account.avatar} 
                    alt={account.UserName || "Admin"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<User className="h-5 w-5 text-white" />';
                    }}
                  />
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="font-medium text-gray-800 text-sm">
                  {account.UserName || "Admin"}
                </span>
                <span className="text-xs text-gray-500">
                  {account.Role || "Quản trị viên"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {/* Menu dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-30 border border-gray-200">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <UserCircle className="h-4 w-4 mr-3 text-blue-600" />
                  Thông tin tài khoản
                </button>
                <Link
                  to="/admin/settings"
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4 mr-3 text-gray-600" />
                  Cài đặt hệ thống
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  to="/logout"
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;