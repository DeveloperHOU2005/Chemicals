import { useState } from 'react';
import { 
  User, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  CalendarDays, 
  ShieldCheck, 
  Wallet, 
  Package, 
  Clock, 
  AlertTriangle,
  CreditCard,
  ArrowLeft,
  Save
} from 'lucide-react';

// Dữ liệu mẫu cho tài khoản
const userData = {
  id: "ACC2023051",
  name: "Nguyễn Văn Anh",
  email: "nguyenvananh@gmail.com",
  phone: "0912345678",
  avatar: "/api/placeholder/80/80",
  role: "Khách hàng doanh nghiệp",
  status: "Đang hoạt động",
  createdAt: "12/03/2023",
  lastLogin: "05/05/2025 - 09:45",
  address: "72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
  company: "Công ty TNHH Hóa Chất XYZ",
  taxId: "0304987651",
  balance: "120.500.000 VNĐ",
  totalOrders: 47,
  lastOrder: "01/05/2025",
  notes: "Khách hàng VIP, ưu tiên giao hàng nhanh."
};

// Dữ liệu đơn hàng gần đây
const recentOrders = [
  { id: "ORD251023", date: "01/05/2025", items: 5, total: "15.200.000 VNĐ", status: "Đã giao" },
  { id: "ORD248921", date: "25/04/2025", items: 3, total: "8.750.000 VNĐ", status: "Đã giao" },
  { id: "ORD245682", date: "18/04/2025", items: 7, total: "23.400.000 VNĐ", status: "Đã giao" },
  { id: "ORD240193", date: "05/04/2025", items: 2, total: "4.300.000 VNĐ", status: "Đã giao" },
];

export default function UserAccountDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({...userData});
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    // Xử lý lưu thông tin tài khoản tại đây
    setIsEditing(false);
    // Cập nhật userData với editData
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case "Đã giao":
        return "bg-green-100 text-green-800";
      case "Đang xử lý":
        return "bg-blue-100 text-blue-800";
      case "Đang vận chuyển":
        return "bg-yellow-100 text-yellow-800";
      case "Hủy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Chi tiết tài khoản</h1>
          </div>
          
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save size={18} className="mr-2" />
              Lưu thay đổi
            </button>
          ) : (
            <button 
              onClick={handleEdit}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <Edit size={18} className="mr-2" />
              Chỉnh sửa thông tin
            </button>
          )}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thông tin cơ bản */}
          <div className="bg-white rounded-xl shadow-md p-6 col-span-1">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
                {userData.status === "Đang hoạt động" && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <h2 className="mt-4 text-xl font-semibold">{userData.name}</h2>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <ShieldCheck size={16} className="mr-1 text-blue-500" />
                {userData.role}
              </div>
              <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {userData.status}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.email}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <CalendarDays className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Ngày đăng ký</p>
                  <p className="text-gray-800">{userData.createdAt}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Đăng nhập gần đây</p>
                  <p className="text-gray-800">{userData.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thông tin chi tiết */}
          <div className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin chi tiết</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Mã tài khoản</label>
                <p className="text-gray-800 font-medium">{userData.id}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 mb-1">Tên công ty</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={editData.company}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  />
                ) : (
                  <p className="text-gray-800">{userData.company}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 mb-1">Mã số thuế</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="taxId"
                    value={editData.taxId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  />
                ) : (
                  <p className="text-gray-800">{userData.taxId}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 mb-1">Số dư tài khoản</label>
                <p className="text-gray-800 font-semibold">{userData.balance}</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-500 mb-1">Địa chỉ</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    rows="2"
                  ></textarea>
                ) : (
                  <p className="text-gray-800">{userData.address}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-500 mb-1">Ghi chú</label>
                {isEditing ? (
                  <textarea
                    name="notes"
                    value={editData.notes}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    rows="2"
                  ></textarea>
                ) : (
                  <p className="text-gray-800">{userData.notes}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê đơn hàng</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center text-blue-600 mb-2">
                    <Package className="w-5 h-5 mr-2" />
                    <span className="font-medium">Tổng đơn hàng</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userData.totalOrders}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center text-green-600 mb-2">
                    <Wallet className="w-5 h-5 mr-2" />
                    <span className="font-medium">Giá trị TB/đơn</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">2.5M VNĐ</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center text-purple-600 mb-2">
                    <CreditCard className="w-5 h-5 mr-2" />
                    <span className="font-medium">Đơn gần nhất</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userData.lastOrder}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Đơn hàng gần đây */}
          <div className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Đơn hàng gần đây</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số SP</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.items} sản phẩm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Xem tất cả đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}