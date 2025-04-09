import React, { useState, useEffect } from 'react';
import '../../assets/index.css';

const HeaderComponent = () => {
  // Quản lý trạng thái hiển thị mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Sử dụng useEffect nếu cần xử lý hiệu ứng phụ sau khi render
  useEffect(() => {
    // Bạn có thể thêm bất kỳ hiệu ứng phụ nào liên quan đến mobile menu tại đây
    // ví dụ: lắng nghe sự kiện resize window nếu cần
  }, []);

  return (
    <>
      <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 fixed">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            
            <nav>
                <ul className="space-y-2">
                    <li>
                        <a href="Dashboard.html" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="product.html" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            Sản phẩm
                        </a>
                    </li>
                    <li>
                        <a href="order.html" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            Đơn hàng
                        </a>
                    </li>
                    <li>
                        <a href="revenue.html" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h11M9 21V3M17 16l4-4m0 0l-4-4m4 4H9"></path>
                            </svg>
                            Doanh thu
                        </a>
                    </li>
                    <li>
                        <a href="revenue.html" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h11M9 21V3M17 16l4-4m0 0l-4-4m4 4H9"></path>
                            </svg>
                            Doanh thu
                        </a>
                    </li>
                    <li className="relative">
                        <button id="customerDropdownBtn" className="flex items-center p-2 w-full hover:bg-gray-700 rounded focus:outline-none">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Khách hàng
                            <svg id="dropdownIcon" className="w-4 h-4 ml-auto transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        <ul id="customerDropdownMenu" className="absolute left-0 mt-2 w-40 bg-gray-800 text-white rounded shadow-lg hidden">
                            <li>
                                <a href="customer.html" className="block px-4 py-2 hover:bg-gray-700 rounded">
                                    Tài khoản
                                </a>
                            </li>
                            <li>
                                <a href="feedback.html" className="block px-4 py-2 hover:bg-gray-700 rounded">
                                    Phản hồi
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="text-yellow-500">
                        <a href="setting.html" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Cài đặt
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    </>
  );
};

export default HeaderComponent;
