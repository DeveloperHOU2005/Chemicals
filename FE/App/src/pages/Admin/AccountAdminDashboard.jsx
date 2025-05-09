import React, {useState, useEffect} from "react";
import { Search, PlusCircle, Trash2, Edit, Save, X, ChevronDown, ChevronUp, User, Users, Settings, Home, LogOut, Bell } from 'lucide-react';

import AccountList from './Account/AccountList.jsx'
import AccoutDashboard from './Account/AccountDashboard.jsx'


export default function AccountAdminDashboard(){
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
      const mockNotifications = [
        { id: 1, message: 'Tài khoản mới đã được tạo', time: '10 phút trước' },
        { id: 2, message: 'Có 3 yêu cầu cấp quyền đang chờ xử lý', time: '1 giờ trước' },
        { id: 3, message: 'Đã cập nhật hệ thống phiên bản 2.1', time: '1 ngày trước' },
      ];
      
      setNotifications(mockNotifications);
    }, []);
  return (
    <div className="flex-1 h-screen bg-gray-200 ml-64">
       <div className="bg-white shadow-sm border-b">
        <div className="p-4 flex justify-between items-center mx-auto">
          <h1 className="text-xl font-semibold text-gray-800">Quản lý tài khoản</h1>
          <div className="flex items-center">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {notifications.filter(n => n.isUnread).length > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {notifications.filter(n => n.isUnread).length}
                  </span>
                )}
              </button>
              
              {/* Dropdown notifications */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-20 border">
                  <div className="px-4 py-2 flex justify-between items-center border-b">
                    <h3 className="font-medium text-gray-700">Thông báo</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Đánh dấu đã đọc</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-gray-500">Không có thông báo nào</p>
                    ) : (
                      notifications.map(note => (
                        <div key={note.id} className={`px-4 py-3 border-b text-sm hover:bg-gray-50 ${note.isUnread ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${note.isUnread ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <div className="ml-2 flex-1">
                              <p className={`text-gray-800 ${note.isUnread ? 'font-medium' : ''}`}>{note.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{note.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t">
                    <button className="text-sm text-center w-full text-blue-600 hover:text-blue-800">
                      Xem tất cả thông báo
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="ml-6 flex items-center">
              <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-500">admin@company.com</p>
              </div>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex px-4 border-b">
          <button 
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'dashboard' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Tổng quan
            </div>
          </button>
          
          <button 
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'accounts' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('accounts')}
          >
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Danh sách tài khoản
            </div>
          </button>
        </div>
      </div>
      {activeTab === 'dashboard' ? <AccoutDashboard/> : <AccountList />}
    </div>
  )
}
