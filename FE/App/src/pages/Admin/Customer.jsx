import { useState } from 'react';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MoreHorizontal, Bell, User, Search, ArrowUp, ArrowDown, Users, UserPlus, Star, Filter, ChevronDown, Edit, Trash2, Mail, Phone, Clock, MapPin, DollarSign } from 'lucide-react';

// Dữ liệu mẫu cho khách hàng
const customersData = [
  { 
    id: 1, 
    name: 'Nguyễn Văn A', 
    email: 'nguyenvana@gmail.com', 
    phone: '0987654321', 
    address: 'Hà Nội', 
    registerDate: '12/04/2025',
    status: 'Hoạt động',
    totalSpent: 24500000,
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastPurchase: '08/04/2025',
    tier: 'Vàng'
  },
  { 
    id: 2, 
    name: 'Trần Thị B', 
    email: 'tranthib@gmail.com', 
    phone: '0912345678', 
    address: 'Hồ Chí Minh', 
    registerDate: '05/03/2025',
    status: 'Hoạt động',
    totalSpent: 15700000,
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastPurchase: '01/04/2025',
    tier: 'Bạc'
  },
  { 
    id: 3, 
    name: 'Lê Văn C', 
    email: 'levanc@gmail.com', 
    phone: '0976543210', 
    address: 'Đà Nẵng', 
    registerDate: '20/02/2025',
    status: 'Không hoạt động',
    totalSpent: 8900000,
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastPurchase: '12/03/2025',
    tier: 'Đồng'
  },
  { 
    id: 4, 
    name: 'Phạm Thị D', 
    email: 'phamthid@gmail.com', 
    phone: '0965432109', 
    address: 'Cần Thơ', 
    registerDate: '15/01/2025',
    status: 'Hoạt động',
    totalSpent: 32100000,
    avatar: 'https://i.pravatar.cc/150?img=4',
    lastPurchase: '05/04/2025',
    tier: 'Kim cương'
  },
  { 
    id: 5, 
    name: 'Hoàng Văn E', 
    email: 'hoangvane@gmail.com', 
    phone: '0954321098', 
    address: 'Hải Phòng', 
    registerDate: '02/03/2025',
    status: 'Hoạt động',
    totalSpent: 18300000,
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastPurchase: '03/04/2025',
    tier: 'Bạc'
  },
  { 
    id: 6, 
    name: 'Võ Thị F', 
    email: 'vothif@gmail.com', 
    phone: '0943210987', 
    address: 'Nha Trang', 
    registerDate: '23/02/2025',
    status: 'Tạm khóa',
    totalSpent: 5400000,
    avatar: 'https://i.pravatar.cc/150?img=6',
    lastPurchase: '28/02/2025',
    tier: 'Đồng'
  },
];

// Dữ liệu mẫu cho biểu đồ
const newCustomersData = [
  { name: 'T1', soLuong: 65 },
  { name: 'T2', soLuong: 78 },
  { name: 'T3', soLuong: 92 },
  { name: 'T4', soLuong: 105 },
  { name: 'T5', soLuong: 120 },
  { name: 'T6', soLuong: 135 },
  { name: 'T7', soLuong: 148 },
  { name: 'T8', soLuong: 160 },
  { name: 'T9', soLuong: 175 },
  { name: 'T10', soLuong: 190 },
  { name: 'T11', soLuong: 205 },
  { name: 'T12', soLuong: 220 },
];

const customerTiersData = [
  { name: 'Kim cương', value: 85 },
  { name: 'Vàng', value: 230 },
  { name: 'Bạc', value: 450 },
  { name: 'Đồng', value: 785 },
];

const customerRegionData = [
  { name: 'Miền Bắc', value: 420 },
  { name: 'Miền Trung', value: 310 },
  { name: 'Miền Nam', value: 520 },
];

const customerActivityData = [
  { name: 'T1', hoatDong: 320, khongHoatDong: 35 },
  { name: 'T2', hoatDong: 332, khongHoatDong: 42 },
  { name: 'T3', hoatDong: 341, khongHoatDong: 48 },
  { name: 'T4', hoatDong: 352, khongHoatDong: 53 },
  { name: 'T5', hoatDong: 368, khongHoatDong: 57 },
  { name: 'T6', hoatDong: 380, khongHoatDong: 62 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
const TIER_COLORS = {
  'Kim cương': '#b666d2',
  'Vàng': '#ffc658',
  'Bạc': '#a0a0a0',
  'Đồng': '#cd7f32'
};

// Format tiền tệ VND
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(value);
};

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [filterTier, setFilterTier] = useState('Tất cả');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Hoạt động',
    tier: 'Đồng'
  });

  // Lọc danh sách khách hàng theo các điều kiện
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'Tất cả' || customer.status === filterStatus;
    const matchesTier = filterTier === 'Tất cả' || customer.tier === filterTier;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const handleViewDetails = (customer) => {
    setCustomerDetails(customer);
  };

  const handleAddNewCustomer = () => {
    setShowCustomerForm(true);
    setCustomerDetails(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'Hoạt động',
      tier: 'Đồng'
    });
  };

  const handleEditCustomer = (customer) => {
    setShowCustomerForm(true);
    setCustomerDetails(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
      tier: customer.tier
    });
  };

  const handleCloseForm = () => {
    setShowCustomerForm(false);
    setCustomerDetails(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Xử lý lưu dữ liệu khách hàng (thêm mới hoặc cập nhật)
    alert(`${customerDetails ? 'Cập nhật' : 'Thêm mới'} khách hàng thành công!`);
    setShowCustomerForm(false);
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    // Xử lý xóa khách hàng
    alert(`Đã xóa khách hàng: ${customerToDelete.name}`);
    setShowDeleteConfirm(false);
    setCustomerToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setCustomerToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Quản lý Khách hàng</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm khách hàng..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-500 text-white p-2 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-col h-full">
        {/* Sidebar */}
        <aside className="w-full bg-white shadow-lg">
            <nav className="px-4 py-4">
                <ul className="flex space-x-4">
                <li>
                    <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                    <Users className="h-5 w-5 mr-2" />
                    <span className="font-medium">Thống kê KH</span>
                    </button>
                </li>
                <li>
                    <button 
                    onClick={() => setActiveTab('customers')}
                    className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'customers' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">Danh sách</span>
                    </button>
                </li>
                <li>
                    <button 
                    onClick={() => setActiveTab('new')}
                    className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'new' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                    <UserPlus className="h-5 w-5 mr-2" />
                    <span className="font-medium">Thêm KH</span>
                    </button>
                </li>
                <li>
                    <button 
                    onClick={() => setActiveTab('loyalty')}
                    className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'loyalty' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                    <Star className="h-5 w-5 mr-2" />
                    <span className="font-medium">Ưu đãi KH</span>
                    </button>
                </li>
                </ul>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Thống kê khách hàng</h2>
                <p className="text-gray-600">Tổng quan về khách hàng và hoạt động của họ.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tổng khách hàng</p>
                      <p className="text-2xl font-bold">1,550</p>
                    </div>
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <Users className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-500">8.5%</span>
                    <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Khách hàng mới</p>
                      <p className="text-2xl font-bold">220</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <UserPlus className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-500">12.3%</span>
                    <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tỷ lệ giữ chân</p>
                      <p className="text-2xl font-bold">78.6%</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Star className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-500">3.2%</span>
                    <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Chi tiêu trung bình</p>
                      <p className="text-2xl font-bold">{formatCurrency(8500000)}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm font-medium text-red-500">1.5%</span>
                    <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Khách hàng mới theo tháng</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={newCustomersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="soLuong" fill="#6366f1" name="Khách hàng mới" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Hoạt động khách hàng</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={customerActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="hoatDong" stroke="#10b981" strokeWidth={2} name="Hoạt động" />
                      <Line type="monotone" dataKey="khongHoatDong" stroke="#f43f5e" strokeWidth={2} name="Không hoạt động" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Phân bố cấp độ khách hàng</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={customerTiersData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerTiersData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Phân bố khách hàng theo khu vực</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={customerRegionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerRegionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeTab === 'customers' && (
            <>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Danh sách khách hàng</h2>
                  <p className="text-gray-600">Quản lý tất cả khách hàng của bạn.</p>
                </div>
                <button 
                  onClick={handleAddNewCustomer}
                  className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Thêm khách hàng
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div className="relative mb-4 md:mb-0 flex-grow">
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm theo tên, email, số điện thoại..." 
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    <div className="relative mb-4 md:mb-0">
                      <div className="flex items-center">
                        <Filter className="h-5 w-5 mr-2 text-gray-500" />
                        <select 
                          className="pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="Tất cả">Tất cả trạng thái</option>
                          <option value="Hoạt động">Hoạt động</option>
                          <option value="Không hoạt động">Không hoạt động</option>
                          <option value="Tạm khóa">Tạm khóa</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 mr-2 text-gray-500" />
                        <select 
                          className="pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={filterTier}
                          onChange={(e) => setFilterTier(e.target.value)}
                        >
                          <option value="Tất cả">Tất cả cấp độ</option>
                          <option value="Kim cương">Kim cương</option>
                          <option value="Vàng">Vàng</option>
                          <option value="Bạc">Bạc</option>
                          <option value="Đồng">Đồng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredCustomers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Khách hàng</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Liên hệ</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Cấp độ</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Tổng chi tiêu</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Ngày đăng ký</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Trạng thái</th>
                          <th className="py-3 px-4 text-center font-medium text-gray-500">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map((customer) => (
                          <tr key={customer.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                                    {customer.name.charAt(0)}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{customer.name}</div>
                                  <div className="text-sm text-gray-500">{customer.address}</div>
                                </div>
                              </div>
                              </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-900">{customer.email}</div>
                              <div className="text-sm text-gray-500">{customer.phone}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                                style={{ 
                                  backgroundColor: `${TIER_COLORS[customer.tier]}20`, 
                                  color: TIER_COLORS[customer.tier] 
                                }}
                              >
                                {customer.tier}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-medium">{formatCurrency(customer.totalSpent)}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">{customer.registerDate}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                customer.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 
                                customer.status === 'Không hoạt động' ? 'bg-gray-100 text-gray-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {customer.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center space-x-3">
                                <button 
                                  onClick={() => handleViewDetails(customer)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  Xem
                                </button>
                                <button 
                                  onClick={() => handleEditCustomer(customer)}
                                  className="text-indigo-600 hover:text-indigo-800"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteClick(customer)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">Không tìm thấy khách hàng.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'new' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Thêm khách hàng mới</h2>
                <p className="text-gray-600">Nhập thông tin để tạo khách hàng mới.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmitForm} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                      <select 
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Không hoạt động">Không hoạt động</option>
                        <option value="Tạm khóa">Tạm khóa</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ khách hàng</label>
                      <select 
                        name="tier"
                        value={formData.tier}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Đồng">Đồng</option>
                        <option value="Bạc">Bạc</option>
                        <option value="Vàng">Vàng</option>
                        <option value="Kim cương">Kim cương</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button 
                      type="button"
                      onClick={() => setActiveTab('customers')} 
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Lưu khách hàng
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {activeTab === 'loyalty' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Chương trình khách hàng thân thiết</h2>
                <p className="text-gray-600">Quản lý và thiết lập các cấp độ khách hàng thân thiết.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-bold mb-2">Cấp độ khách hàng</h3>
                  <p className="text-gray-600">Thiết lập các cấp độ khách hàng và quyền lợi tương ứng.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-purple-200 bg-purple-50">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Star className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-purple-800">Kim cương</h4>
                          <p className="text-sm text-gray-600">Chi tiêu trên 30 triệu VNĐ</p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Star className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-yellow-800">Vàng</h4>
                          <p className="text-sm text-gray-600">Chi tiêu từ 20 đến 30 triệu VNĐ</p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Star className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-800">Bạc</h4>
                          <p className="text-sm text-gray-600">Chi tiêu từ 10 đến 20 triệu VNĐ</p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg border border-orange-200 bg-orange-50">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Star className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-orange-800">Đồng</h4>
                          <p className="text-sm text-gray-600">Chi tiêu dưới 10 triệu VNĐ</p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                      <span className="mr-2">+</span> Thêm cấp độ mới
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-bold mb-2">Quyền lợi thành viên</h3>
                  <p className="text-gray-600">Thiết lập các quyền lợi đặc biệt cho từng cấp độ khách hàng.</p>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Quyền lợi</th>
                          <th className="py-3 px-4 text-center font-medium text-gray-500">Đồng</th>
                          <th className="py-3 px-4 text-center font-medium text-gray-500">Bạc</th>
                          <th className="py-3 px-4 text-center font-medium text-gray-500">Vàng</th>
                          <th className="py-3 px-4 text-center font-medium text-gray-500">Kim cương</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Ưu đãi sinh nhật</td>
                          <td className="py-3 px-4 text-center">5%</td>
                          <td className="py-3 px-4 text-center">10%</td>
                          <td className="py-3 px-4 text-center">15%</td>
                          <td className="py-3 px-4 text-center">20%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Tích điểm mua hàng</td>
                          <td className="py-3 px-4 text-center">1%</td>
                          <td className="py-3 px-4 text-center">2%</td>
                          <td className="py-3 px-4 text-center">3%</td>
                          <td className="py-3 px-4 text-center">5%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Miễn phí vận chuyển</td>
                          <td className="py-3 px-4 text-center">-</td>
                          <td className="py-3 px-4 text-center">1 lần/tháng</td>
                          <td className="py-3 px-4 text-center">3 lần/tháng</td>
                          <td className="py-3 px-4 text-center">Không giới hạn</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Ưu tiên hỗ trợ</td>
                          <td className="py-3 px-4 text-center">-</td>
                          <td className="py-3 px-4 text-center">-</td>
                          <td className="py-3 px-4 text-center">✓</td>
                          <td className="py-3 px-4 text-center">✓</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Quà tặng đặc biệt</td>
                          <td className="py-3 px-4 text-center">-</td>
                          <td className="py-3 px-4 text-center">-</td>
                          <td className="py-3 px-4 text-center">-</td>
                          <td className="py-3 px-4 text-center">✓</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                      <span className="mr-2">+</span> Thêm quyền lợi mới
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      
      {/* Customer Details Modal */}
      {customerDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-xl font-bold">Chi tiết khách hàng</h3>
              <button onClick={() => setCustomerDetails(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold mb-4 sm:mb-0 sm:mr-6">
                  {customerDetails.name.charAt(0)}
                </div>
                
                <div>
                  <h4 className="text-xl font-bold">{customerDetails.name}</h4>
                  <div className="flex items-center mt-2">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2" 
                      style={{ 
                        backgroundColor: `${TIER_COLORS[customerDetails.tier]}20`, 
                        color: TIER_COLORS[customerDetails.tier] 
                      }}
                    >
                      {customerDetails.tier}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      customerDetails.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 
                      customerDetails.status === 'Không hoạt động' ? 'bg-gray-100 text-gray-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customerDetails.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-500 mb-3">Thông tin liên hệ</h5>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span>{customerDetails.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <span>{customerDetails.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <span>{customerDetails.address}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-500 mb-3">Thông tin khách hàng</h5>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <span>Đăng ký: {customerDetails.registerDate}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                      <span>Tổng chi tiêu: {formatCurrency(customerDetails.totalSpent)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <span>Mua hàng gần nhất: {customerDetails.lastPurchase}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <h5 className="font-medium text-gray-500 mb-3">Lịch sử giao dịch gần đây</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Đơn hàng #12345</p>
                      <p className="text-sm text-gray-500">07/04/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(3500000)}</p>
                      <p className="text-sm text-green-600">Hoàn thành</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Đơn hàng #12338</p>
                      <p className="text-sm text-gray-500">01/04/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(1200000)}</p>
                      <p className="text-sm text-green-600">Hoàn thành</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Đơn hàng #12289</p>
                      <p className="text-sm text-gray-500">24/03/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(2800000)}</p>
                      <p className="text-sm text-green-600">Hoàn thành</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => setCustomerDetails(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button 
                  onClick={() => {
                    handleEditCustomer(customerDetails);
                    setCustomerDetails(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Customer Form Modal */}
      {showCustomerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-xl font-bold">{customerDetails ? 'Chỉnh sửa thông tin khách hàng' : 'Thêm khách hàng mới'}</h3>
              <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Không hoạt động">Không hoạt động</option>
                      <option value="Tạm khóa">Tạm khóa</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ khách hàng</label>
                    <select 
                      name="tier"
                      value={formData.tier}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Đồng">Đồng</option>
                      <option value="Bạc">Bạc</option>
                      <option value="Vàng">Vàng</option>
                      <option value="Kim cương">Kim cương</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                <button 
                    type="button"
                    onClick={handleCloseForm} 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Hủy
                </button>
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    {customerDetails ? 'Lưu thay đổi' : 'Thêm khách hàng'}
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận xóa</h3>
              <p className="text-gray-700 mb-6">
                Bạn có chắc chắn muốn xóa khách hàng "{customerToDelete?.name}"? Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={handleCancelDelete} 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleConfirmDelete} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}