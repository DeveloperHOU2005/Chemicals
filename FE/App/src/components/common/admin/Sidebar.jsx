// src/components/common/admin/Sidebar.jsx
import { useState, useImperativeHandle, forwardRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Users, ShoppingBag, Package, Truck, Gift, MessageSquare, BarChart2,
  Settings, ChevronDown, LogOut, Layers
} from 'lucide-react';

import { UserContext } from '../../../context/AdminContext';

const AdminSidebar = () => {
  const { collapsed,
    setCollapsed,
    activeMenu,
    setActiveMenu} = useContext(UserContext)
  const [expandedMenus, setExpandedMenus] = useState([]);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleSubmenu = (menu) => {
    if (expandedMenus.includes(menu)) {
      setExpandedMenus(expandedMenus.filter(item => item !== menu));
    } else {
      setExpandedMenus([...expandedMenus, menu]);
    }
  };

  // Hàm xử lý click menu:
  // Nếu menu không có submenu thì thực hiện chuyển hướng (navigate)
  // Nếu có submenu thì mở rộng/dóng submenu
  const handleMenuClick = (menu, path, hasSubmenu) => {
    setActiveMenu(menu);
    if (!hasSubmenu) {
      navigate(path);
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <Home size={20} />,
      path: '/admin'
    },
    {
      id: 'customers',
      title: 'Khách hàng',
      icon: <Users size={20} />,
      path: '/admin/customer'
    },
    {
      id: 'products',
      title: 'Sản phẩm',
      icon: <Package size={20} />,
      path: '/admin/products',
      submenu: [
        { id: 'product-list', title: 'Danh sách sản phẩm', path: '/admin/products' },
        { id: 'categories', title: 'Danh mục', path: '/admin/category' },
        { id: 'inventory', title: 'Kho hàng', path: '/admin/inventory' }
      ]
    },
    {
      id: 'orders',
      title: 'Đơn hàng',
      icon: <ShoppingBag size={20} />,
      path: '/admin/orderManagement'
    },
    {
      id: 'shipping',
      title: 'Vận chuyển',
      icon: <Truck size={20} />,
      path: '/admin/ShippingManagementDashboard'
    },
    {
      id: 'vouchers',
      title: 'Mã giảm giá',
      icon: <Gift size={20} />,
      path: '/admin/voucher'
    },
    {
      id: 'feedback',
      title: 'Phản hồi',
      icon: <MessageSquare size={20} />,
      path: '/admin/feedback'
    },
    {
      id: 'accounts',
      title: 'Tài khoản',
      icon: <Users size={20} />,
      path: '/admin/account'
    },
    {
      id: 'reports',
      title: 'Báo cáo & Thống kê',
      icon: <BarChart2 size={20} />,
      path: '/admin/reports',
      submenu: [
        { id: 'sales-report', title: 'Báo cáo doanh thu', path: '/admin/reports/sales' },
        { id: 'product-report', title: 'Báo cáo sản phẩm', path: '/admin/reports/products' },
        { id: 'customer-report', title: 'Báo cáo khách hàng', path: '/admin/reports/customers' }
      ]
    },
    {
      id: 'settings',
      title: 'Cài đặt',
      icon: <Settings size={20} />,
      path: '/admin/settings'
    }
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-gray-800 text-white z-50 ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out flex flex-col`}>
      {/* Header/Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center">
            <Layers className="text-blue-400" size={24} />
            <span className="ml-2 font-bold text-xl">Admin Panel</span>
          </div>
        )}
        {collapsed && <Layers className="text-blue-400 mx-auto" size={24} />}
        <button onClick={toggleCollapse} className={`rounded-full hover:bg-gray-700 ${collapsed ? 'mx-auto' : ''}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Profile Area */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-4 border-b border-gray-700`}>
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          A
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="font-medium">Admin</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-grow overflow-y-auto py-2">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => {
                  handleMenuClick(item.id, item.path, !!item.submenu);
                  if (item.submenu) toggleSubmenu(item.id);
                }}
                className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} w-full px-4 py-3 text-sm ${
                  activeMenu === item.id ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700'
                } rounded-lg transition-colors`}
              >
                <div className="flex items-center">
                  <div className={collapsed ? 'mx-auto' : ''}>{item.icon}</div>
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </div>
                {!collapsed && item.submenu && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`}
                  />
                )}
              </button>
              
              {/* Submenu */}
              {!collapsed && item.submenu && expandedMenus.includes(item.id) && (
                <ul className="pl-12 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id}>
                      <a
                        href={subItem.path}
                        onClick={() => setActiveMenu(subItem.id)}
                        className={`block px-4 py-2 text-sm rounded-lg ${
                          activeMenu === subItem.id
                            ? 'bg-gray-700 text-blue-400'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                        }`}
                      >
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer (Logout) */}
      <div className="p-4 border-t border-gray-700">
        <button className={`flex items-center ${collapsed ? 'justify-center w-full' : ''} text-red-400 hover:text-red-300`}>
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
