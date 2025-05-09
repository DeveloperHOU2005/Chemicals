import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  Tag, 
  Shield, 
  X, 
  MoreHorizontal,
  Trash2,
  Eye,
  Clock,
} from "lucide-react";
import { UserContext } from "../../context/AdminContext";

export default function Notification() {
  const [unreadCount, setUnreadCount] = useState(0);

  const {
    nofiticals,
    setNofiticals,
    detailNofitical, 
    setDetailNofitical
  } = useContext(UserContext);

  useEffect(() => {  
    // Chỉ khởi tạo dữ liệu mẫu nếu chưa có dữ liệu
    if (nofiticals.length === 0) {
      // Dữ liệu thông báo mẫu
      const notificationData = [
        {
          id: 1,
          type: 'info',               // loại: info, warning, success, promo, alert
          title: 'Sản phẩm mới',
          message: 'Sodium Hydroxide 99% đã có mặt trong kho. Xem ngay để đặt hàng!',
          link: '/products/naoh-99',  // đường dẫn khi click
          timestamp: '2025-05-08T09:30:00Z',
          read: false
        },
        {
          id: 2,
          type: 'warning',
          title: 'Cảnh báo tồn kho thấp',
          message: 'H₂SO₄ 98% chỉ còn 10kg trong kho. Vui lòng đặt thêm để tránh gián đoạn đơn hàng.',
          link: '/products/h2so4-98',
          timestamp: '2025-05-07T15:45:00Z',
          read: false
        },
        {
          id: 3,
          type: 'success',
          title: 'Đơn hàng đã được xử lý',
          message: 'Đơn hàng #12345 của bạn đã được đóng gói và giao cho đối tác vận chuyển.',
          link: '/orders/12345',
          timestamp: '2025-05-06T11:20:00Z',
          read: true
        },
        {
          id: 4,
          type: 'promo',
          title: 'Khuyến mãi tháng 5',
          message: 'Giảm 10% cho tất cả mặt hàng Perchloric Acid khi đặt từ 100kg trở lên. Áp dụng đến 31/05.',
          link: '/promotions/may-sale',
          timestamp: '2025-05-01T08:00:00Z',
          read: false
        },
        {
          id: 5,
          type: 'alert',
          title: 'Thông báo an toàn',
          message: 'Vui lòng tuân thủ quy trình an toàn khi sử dụng Chlorine Gas. Xem hướng dẫn tại đây.',
          link: '/safety-guidelines/chlorine',
          timestamp: '2025-04-30T17:30:00Z',
          read: true
        }
      ];
      
      setNofiticals(notificationData);
    }
  }, []);

  // Cập nhật số lượng thông báo chưa đọc khi nofiticals thay đổi
  useEffect(() => {
    setUnreadCount(nofiticals.filter(item => !item.read).length);
  }, [nofiticals]);

  const toggleNotification = () => {
    setDetailNofitical(!detailNofitical);
  };

  const markAsRead = (id) => {
    const updatedNotifications = nofiticals.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    setNofiticals(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = nofiticals.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNofiticals(updatedNotifications);
  };

  const deleteNotification = (id) => {
    const filteredNotifications = nofiticals.filter(notification => notification.id !== id);
    setNofiticals(filteredNotifications);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffTime = Math.abs(now - notificationTime);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} ngày trước`;
    } else if (diffHours > 0) {
      return `${diffHours} giờ trước`;
    } else {
      return `${diffMinutes} phút trước`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'promo':
        return <Tag className="w-5 h-5 text-purple-500" />;
      case 'alert':
        return <Shield className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50';
      case 'warning':
        return 'border-l-4 border-amber-500 bg-amber-50';
      case 'success':
        return 'border-l-4 border-green-500 bg-green-50';
      case 'promo':
        return 'border-l-4 border-purple-500 bg-purple-50';
      case 'alert':
        return 'border-l-4 border-red-500 bg-red-50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="relative">
      {/* Panel thông báo */}
      {detailNofitical && (
        <div className="fixed top-16 right-4 w-80 max-h-[80vh] bg-white rounded-xl shadow-xl z-40 border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-800">Thông báo</h2>
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {unreadCount} mới
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Đánh dấu đã đọc
                </button>
              )}
              <button onClick={toggleNotification} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-grow">
            {nofiticals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 p-4 text-gray-500">
                <Bell className="w-12 h-12 mb-2 text-gray-300" />
                <p className="text-center">Không có thông báo nào</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {nofiticals.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50 transition-colors duration-150 relative group`}
                  >
                    <div className={`p-4 ${getNotificationColor(notification.type)}`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-800' : 'text-gray-900 font-semibold'}`}>
                              {notification.title}
                            </h3>
                            <div className="relative">
                              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 hidden group-hover:block z-50">
                                <div className="py-1">
                                  {!notification.read && (
                                    <button 
                                      onClick={() => markAsRead(notification.id)}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      Đánh dấu đọc
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => deleteNotification(notification.id)}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <a 
                              href={notification.link} 
                              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Xem chi tiết
                            </a>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatTime(notification.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 text-center border-t border-gray-200">
            <Link to="/admin/all-notifications" className="text-sm text-blue-600 hover:text-blue-800">
              Xem tất cả thông báo
            </Link>
          </div>
        </div>
      )}

      {/* Overlay để đóng notification khi click ra ngoài */}
      {detailNofitical && (
        <div 
          className="fixed inset-0 bg-transparent z-20"
          onClick={toggleNotification}
        />
      )}
    </div>
  );
}