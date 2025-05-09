import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Filter, Search, ArrowUpDown, User, Users, TrendingUp, Map, Activity, Shield, Eye, UserPlus, Edit, Trash2, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';

// Dữ liệu mẫu
const generateSampleData = () => {
  const userRoles = ['Quản trị viên', 'Nhân viên bán hàng', 'Nhân viên kho', 'Kế toán', 'Khách hàng', 'Đối tác'];
  const userStatus = ['Đang hoạt động', 'Không hoạt động', 'Tạm khóa'];
  const regions = ['Miền Bắc', 'Miền Trung', 'Miền Nam'];
  
  // Danh sách người dùng
  const users = [];
  const names = ['Nguyễn Văn', 'Trần Thị', 'Lê Minh', 'Phạm Thanh', 'Hoàng Anh', 'Vũ Quốc', 'Đặng Hồng', 'Bùi Quang'];
  const surnames = ['An', 'Bình', 'Cường', 'Dung', 'Hiếu', 'Linh', 'Mai', 'Nam', 'Phương', 'Quân', 'Thảo', 'Vân', 'Xuân'];
  
  for (let i = 1; i <= 50; i++) {
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = surnames[Math.floor(Math.random() * surnames.length)];
    const fullName = `${firstName} ${lastName}`;
    const registerDate = new Date(2024, Math.floor(Math.random() * 4), Math.floor(Math.random() * 28) + 1);
    const role = userRoles[Math.floor(Math.random() * userRoles.length)];
    
    users.push({
      id: i,
      maNguoiDung: `USR${String(i).padStart(3, '0')}`,
      ten: fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`,
      soDienThoai: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
      vaiTro: role,
      khuVuc: regions[Math.floor(Math.random() * regions.length)],
      ngayDangKy: registerDate.toISOString().split('T')[0],
      lanTruyCap: new Date(2025, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      trangThai: userStatus[Math.floor(Math.random() * userStatus.length)],
      donHang: Math.floor(Math.random() * 50),
      doanhSo: Math.floor(Math.random() * 100000000),
      hoatDong: role === 'Khách hàng' ? Math.floor(Math.random() * 30) : Math.floor(Math.random() * 100),
    });
  }
  
  // Tạo dữ liệu cho biểu đồ người dùng mới theo tháng
  const newUsersByMonth = [];
  for (let i = 1; i <= 6; i++) {
    newUsersByMonth.push({
      month: `Tháng ${i}`,
      'Người dùng mới': Math.floor(Math.random() * 100) + 50,
    });
  }
  
  // Tạo dữ liệu cho phân bổ người dùng theo vai trò
  const usersByRole = [];
  userRoles.forEach(role => {
    const count = users.filter(user => user.vaiTro === role).length;
    usersByRole.push({
      name: role,
      value: count
    });
  });
  
  // Tạo dữ liệu cho phân bổ người dùng theo khu vực
  const usersByRegion = [];
  regions.forEach(region => {
    const count = users.filter(user => user.khuVuc === region).length;
    usersByRegion.push({
      name: region,
      value: count
    });
  });
  
  // Tạo dữ liệu cho hoạt động người dùng theo tháng
  const userActivityByMonth = [];
  for (let i = 1; i <= 6; i++) {
    userActivityByMonth.push({
      month: `Tháng ${i}`,
      'Đăng nhập': Math.floor(Math.random() * 5000) + 1000,
      'Đơn hàng': Math.floor(Math.random() * 1000) + 200,
      'Tương tác': Math.floor(Math.random() * 3000) + 500,
    });
  }
  
  // Tạo dữ liệu nhật ký hoạt động
  const activityTypes = ['Đăng nhập', 'Đặt hàng', 'Cập nhật thông tin', 'Xem sản phẩm', 'Thanh toán', 'Liên hệ hỗ trợ', 'Đánh giá sản phẩm'];
  const activities = [];
  
  for (let i = 0; i < 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    activities.push({
      id: i + 1,
      userId: user.id,
      userName: user.ten,
      userRole: user.vaiTro,
      type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
      date: new Date(2025, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1, 
                    Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)).toISOString(),
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      device: Math.random() > 0.5 ? 'Mobile' : 'Desktop',
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
    });
  }
  activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return { users, newUsersByMonth, usersByRole, usersByRegion, userActivityByMonth, activities };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function UserReportsDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({ users: [], newUsersByMonth: [], usersByRole: [], usersByRegion: [], userActivityByMonth: [], activities: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dateRange, setDateRange] = useState('30d');
  const [selectedUser, setSelectedUser] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setData(generateSampleData());
  }, []);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const toggleExpand = (userId) => {
    setExpanded(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('vi-VN', options);
  };

  const filteredUsers = data.users.filter(user => {
    const matchesSearch = user.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.maNguoiDung.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.vaiTro === roleFilter;
    const matchesRegion = regionFilter === 'all' || user.khuVuc === regionFilter;
    const matchesStatus = statusFilter === 'all' || user.trangThai === statusFilter;
    
    return matchesSearch && matchesRole && matchesRegion && matchesStatus;
  }).sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      if (typeof a[sortConfig.key] === 'string') {
        return a[sortConfig.key].localeCompare(b[sortConfig.key]);
      }
      return a[sortConfig.key] - b[sortConfig.key];
    } else {
      if (typeof a[sortConfig.key] === 'string') {
        return b[sortConfig.key].localeCompare(a[sortConfig.key]);
      }
      return b[sortConfig.key] - a[sortConfig.key];
    }
  });

  const roles = [...new Set(data.users.map(user => user.vaiTro))];
  const regions = [...new Set(data.users.map(user => user.khuVuc))];
  const statuses = [...new Set(data.users.map(user => user.trangThai))];

  const getUserActivities = (userId) => {
    return data.activities.filter(activity => activity.userId === userId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang hoạt động': return 'bg-green-100 text-green-800';
      case 'Không hoạt động': return 'bg-gray-100 text-gray-800';
      case 'Tạm khóa': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const topActiveUsers = [...filteredUsers]
    .sort((a, b) => b.hoatDong - a.hoatDong)
    .slice(0, 5);

  const topCustomers = [...filteredUsers]
    .filter(user => user.vaiTro === 'Khách hàng')
    .sort((a, b) => b.doanhSo - a.doanhSo)
    .slice(0, 5);

  const totalActiveUsers = data.users.filter(user => user.trangThai === 'Đang hoạt động').length;
  const totalInactiveUsers = data.users.filter(user => user.trangThai === 'Không hoạt động').length;
  const newUsersThisMonth = data.users.filter(user => {
    const registerDate = new Date(user.ngayDangKy);
    const currentDate = new Date();
    return registerDate.getMonth() === currentDate.getMonth() && 
           registerDate.getFullYear() === currentDate.getFullYear();
  }).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HóaChất Pro - Báo Cáo Người Dùng</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded">
              Xuất báo cáo
            </button>
            <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
              QT
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col flex-grow p-4">
        {/* Navigation Tabs */}
        <div className="flex border-b mb-6 overflow-x-auto">
          <button 
            className={`py-2 px-4 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Tổng quan
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'users' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('users')}
          >
            Danh sách người dùng
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'activities' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('activities')}
          >
            Nhật ký hoạt động
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'analytics' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Phân tích chi tiết
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'reports' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reports')}
          >
            Báo cáo tổng hợp
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <select 
                className="bg-transparent focus:outline-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7d">7 ngày qua</option>
                <option value="30d">30 ngày qua</option>
                <option value="90d">90 ngày qua</option>
                <option value="6m">6 tháng qua</option>
                <option value="1y">1 năm qua</option>
              </select>
            </div>
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="bg-transparent focus:outline-none"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Tất cả vai trò</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="bg-transparent focus:outline-none"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="all">Tất cả khu vực</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="bg-transparent focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center bg-white border rounded px-3 py-2">
            <Search size={16} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm người dùng..." 
              className="bg-transparent focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-medium">Tổng người dùng</h3>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users size={20} className="text-blue-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{data.users.length}</div>
                <div className="text-green-500 text-sm mt-2">+{newUsersThisMonth} người dùng mới tháng này</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-medium">Đang hoạt động</h3>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Activity size={20} className="text-green-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{totalActiveUsers}</div>
                <div className="text-gray-500 text-sm mt-2">{totalInactiveUsers} người dùng không hoạt động</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-medium">Tỷ lệ hoạt động</h3>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <TrendingUp size={20} className="text-purple-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{(totalActiveUsers / data.users.length * 100).toFixed(1)}%</div>
                <div className="text-green-500 text-sm mt-2">+5.2% so với tháng trước</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Người dùng mới theo tháng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.newUsersByMonth}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Người dùng mới" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Phân bổ vai trò người dùng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.usersByRole}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.usersByRole.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Users */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Người dùng hoạt động nhiều nhất</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Người dùng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vai trò
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hoạt động
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Truy cập gần đây
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topActiveUsers.map((user, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-blue-200 rounded-full flex items-center justify-center">
                                {user.ten.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.ten}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.vaiTro}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.hoatDong} hoạt động</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lanTruyCap}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Khách hàng có doanh số cao nhất</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Khách hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Khu vực
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Đơn hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doanh số
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topCustomers.map((user, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-green-200 rounded-full flex items-center justify-center">
                                {user.ten.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.ten}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.khuVuc}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.donHang}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(user.doanhSo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Regional Distribution */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-medium mb-4">Phân bổ người dùng theo khu vực</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.usersByRegion.map((region, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-lg font-medium">{region.name}</div>
                      <div className="text-sm text-gray-500">{region.value} người dùng</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(region.value / data.users.length * 100)}%` }}></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">{(region.value / data.users.length * 100).toFixed(1)}% tổng người dùng</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Danh sách người dùng</h3>
              <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                <UserPlus size={16} className="mr-2" />
                Thêm người dùng mới
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('maNguoiDung')}>
                      <div className="flex items-center">
                        Mã ND
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('ten')}>
                      <div className="flex items-center">
                        Tên
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>
                      <div className="flex items-center">
                        Email
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('vaiTro')}>
                      <div className="flex items-center">
                        Vai trò
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('khuVuc')}>
                      <div className="flex items-center">
                        Khu vực
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('trangThai')}>
                      <div className="flex items-center">
                        Trạng thái
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.maNguoiDung}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ten}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.vaiTro}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.khuVuc}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.trangThai)}`}>
                          {user.trangThai}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              // Handle delete action
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}