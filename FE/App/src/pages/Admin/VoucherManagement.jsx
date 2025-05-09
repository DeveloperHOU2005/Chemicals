import { useState, useEffect } from 'react';
import { Search, Filter, PlusCircle, Trash2, Edit, Save, X, ChevronDown, ChevronUp, User, Settings, Home, LogOut, Bell, Calendar, Copy, CheckCircle, AlertCircle, XCircle, BarChart, Tag, PercentSquare, Clock, Calendar as CalendarIcon, Users, Gift, Percent } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
export default function VoucherManagement() {
  const [vouchers, setVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('list');

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    code: '',
    type: 'percent',
    value: 0,
    minPurchase: 0,
    maxDiscount: 0,
    quantity: 0,
    used: 0,
    startDate: '',
    endDate: '',
    status: 'active',
    userLimit: 1,
    userGroup: 'all',
    description: '',
    createdAt: '',
    createdBy: '',
  });

  // Initialize with mock data
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    const mockVouchers = [
      {
        id: 1,
        code: 'GIAMGIA20',
        type: 'percent',
        value: 20,
        minPurchase: 200000,
        maxDiscount: 50000,
        quantity: 100,
        used: 45,
        startDate: formatDate(lastMonth),
        endDate: formatDate(nextWeek),
        status: 'active',
        userLimit: 1,
        userGroup: 'all',
        description: 'Giảm 20% cho đơn hàng từ 200.000đ, tối đa 50.000đ',
        createdAt: formatDate(lastMonth),
        createdBy: 'admin',
      },
      {
        id: 2,
        code: 'FREESHIP',
        type: 'fixed',
        value: 30000,
        minPurchase: 300000,
        maxDiscount: 30000,
        quantity: 200,
        used: 150,
        startDate: formatDate(lastMonth),
        endDate: formatDate(yesterday),
        status: 'expired',
        userLimit: 1,
        userGroup: 'all',
        description: 'Miễn phí vận chuyển 30.000đ cho đơn hàng từ 300.000đ',
        createdAt: formatDate(lastMonth),
        createdBy: 'admin',
      },
      {
        id: 3,
        code: 'NEWUSER50',
        type: 'percent',
        value: 50,
        minPurchase: 0,
        maxDiscount: 100000,
        quantity: 50,
        used: 23,
        startDate: formatDate(today),
        endDate: formatDate(nextMonth),
        status: 'active',
        userLimit: 1,
        userGroup: 'new',
        description: 'Giảm 50% cho đơn hàng đầu tiên, tối đa 100.000đ',
        createdAt: formatDate(today),
        createdBy: 'admin',
      },
      {
        id: 4,
        code: 'SUMMER2025',
        type: 'percent',
        value: 30,
        minPurchase: 500000,
        maxDiscount: 150000,
        quantity: 300,
        used: 0,
        startDate: formatDate(nextWeek),
        endDate: formatDate(nextMonth),
        status: 'scheduled',
        userLimit: 1,
        userGroup: 'all',
        description: 'Giảm 30% cho đơn hàng từ 500.000đ, tối đa 150.000đ',
        createdAt: formatDate(today),
        createdBy: 'marketing',
      },
      {
        id: 5,
        code: 'VIP100K',
        type: 'fixed',
        value: 100000,
        minPurchase: 1000000,
        maxDiscount: 100000,
        quantity: 30,
        used: 12,
        startDate: formatDate(lastMonth),
        endDate: formatDate(nextWeek),
        status: 'active',
        userLimit: 1,
        userGroup: 'vip',
        description: 'Giảm 100.000đ cho khách hàng VIP, đơn hàng từ 1.000.000đ',
        createdAt: formatDate(lastMonth),
        createdBy: 'admin',
      },
      {
        id: 6,
        code: 'FLASH25',
        type: 'percent',
        value: 25,
        minPurchase: 300000,
        maxDiscount: 70000,
        quantity: 50,
        used: 50,
        startDate: formatDate(lastMonth),
        endDate: formatDate(yesterday),
        status: 'used_up',
        userLimit: 1,
        userGroup: 'all',
        description: 'Giảm 25% cho đơn hàng từ 300.000đ, tối đa 70.000đ',
        createdAt: formatDate(lastMonth),
        createdBy: 'marketing',
      },
      {
        id: 7,
        code: 'BIRTHDAY',
        type: 'percent',
        value: 15,
        minPurchase: 100000,
        maxDiscount: 30000,
        quantity: 1000,
        used: 242,
        startDate: formatDate(lastMonth),
        endDate: formatDate(nextMonth),
        status: 'active',
        userLimit: 1,
        userGroup: 'birthday',
        description: 'Giảm 15% cho khách hàng có sinh nhật trong tháng, đơn hàng từ 100.000đ, tối đa 30.000đ',
        createdAt: formatDate(lastMonth),
        createdBy: 'admin',
      },
      {
        id: 8,
        code: 'WELCOME10',
        type: 'percent',
        value: 10,
        minPurchase: 0,
        maxDiscount: 20000,
        quantity: 500,
        used: 123,
        startDate: formatDate(lastMonth),
        endDate: formatDate(nextMonth),
        status: 'active',
        userLimit: 1,
        userGroup: 'all',
        description: 'Giảm 10% cho tất cả đơn hàng, tối đa 20.000đ',
        createdAt: formatDate(lastMonth),
        createdBy: 'admin',
      },
    ];
    
    const mockNotifications = [
      { id: 1, message: 'Voucher FLASH25 đã hết lượt sử dụng', time: '3 giờ trước' },
      { id: 2, message: 'Voucher FREESHIP đã hết hạn', time: '1 ngày trước' },
      { id: 3, message: 'Voucher SUMMER2025 đã được tạo', time: '2 ngày trước' },
    ];
    
    setVouchers(mockVouchers);
    setFilteredVouchers(mockVouchers);
    setNotifications(mockNotifications);
  }, []);

  // Filter vouchers based on search term and status
  useEffect(() => {
    let results = vouchers.filter(voucher => 
      (voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       voucher.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    if (statusFilter !== 'all') {
      results = results.filter(voucher => voucher.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      results = results.filter(voucher => voucher.type === typeFilter);
    }
    
    // Sort results
    const sorted = [...results].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle string comparisons
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredVouchers(sorted);
  }, [searchTerm, vouchers, sortField, sortDirection, statusFilter, typeFilter]);

  // Prepare chart data
  const prepareChartData = () => {
    // Status distribution chart
    const statusCounts = {
      'active': 0,
      'expired': 0,
      'scheduled': 0,
      'used_up': 0,
      'disabled': 0
    };
    
    vouchers.forEach(voucher => {
      if (statusCounts[voucher.status] !== undefined) {
        statusCounts[voucher.status] += 1;
      }
    });
    
    const statusData = Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
      value: statusCounts[key]
    }));
    
    // Type distribution chart
    const typeCounts = {
      'percent': 0,
      'fixed': 0
    };
    
    vouchers.forEach(voucher => {
      if (typeCounts[voucher.type] !== undefined) {
        typeCounts[voucher.type] += 1;
      }
    });
    
    const typeData = Object.keys(typeCounts).map(key => ({
      name: key === 'percent' ? 'Phần trăm' : 'Số tiền cố định',
      value: typeCounts[key]
    }));
    
    // User group distribution chart
    const userGroupCounts = {};
    
    vouchers.forEach(voucher => {
      if (!userGroupCounts[voucher.userGroup]) {
        userGroupCounts[voucher.userGroup] = 0;
      }
      userGroupCounts[voucher.userGroup] += 1;
    });
    
    const userGroupData = Object.keys(userGroupCounts).map(key => {
      let name = key;
      if (key === 'all') name = 'Tất cả';
      if (key === 'new') name = 'Khách hàng mới';
      if (key === 'vip') name = 'Khách hàng VIP';
      if (key === 'birthday') name = 'Sinh nhật';
      
      return {
        name: name,
        value: userGroupCounts[key]
      };
    });
    
    // Usage data
    const usageData = vouchers.map(voucher => ({
      name: voucher.code,
      total: voucher.quantity,
      used: voucher.used,
      remaining: voucher.quantity - voucher.used
    })).sort((a, b) => b.used - a.used).slice(0, 5);
    
    // Usage percentage
    const totalVouchers = vouchers.reduce((sum, voucher) => sum + voucher.quantity, 0);
    const usedVouchers = vouchers.reduce((sum, voucher) => sum + voucher.used, 0);
    const usagePercentage = totalVouchers > 0 ? Math.round((usedVouchers / totalVouchers) * 100) : 0;
    
    return {
      statusData,
      typeData,
      userGroupData,
      usageData,
      usagePercentage
    };
  };
  
  const chartData = prepareChartData();

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(value)
      .replace('₫', 'đ');
  };
  
  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle number input changes
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  // Open modal for adding new voucher
  const handleAddVoucher = () => {
    // Get today's and next month's date
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    setFormData({
      id: null,
      code: '',
      type: 'percent',
      value: 0,
      minPurchase: 0,
      maxDiscount: 0,
      quantity: 1,
      used: 0,
      startDate: formatDate(today),
      endDate: formatDate(nextMonth),
      status: 'active',
      userLimit: 1,
      userGroup: 'all',
      description: '',
      createdAt: formatDate(today),
      createdBy: 'admin',
    });
    setEditMode(false);
    setIsModalOpen(true);
  };

  // Open modal for editing voucher
  const handleEditVoucher = (voucher) => {
    setFormData({ ...voucher });
    setCurrentVoucher(voucher);
    setEditMode(true);
    setIsModalOpen(true);
  };

  // Copy voucher code to clipboard
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    addNotification(`Đã sao chép mã: ${code}`);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing voucher
      const updatedVouchers = vouchers.map(voucher => 
        voucher.id === formData.id ? formData : voucher
      );
      setVouchers(updatedVouchers);
      addNotification(`Đã cập nhật voucher: ${formData.code}`);
    } else {
      // Add new voucher
      const newVoucher = {
        ...formData,
        id: vouchers.length + 1,
      };
      setVouchers([...vouchers, newVoucher]);
      addNotification(`Đã thêm voucher mới: ${newVoucher.code}`);
    }
    
    setIsModalOpen(false);
  };

  // Delete voucher
  const handleDeleteVoucher = (voucherId) => {
    const voucherToDelete = vouchers.find(voucher => voucher.id === voucherId);
    const updatedVouchers = vouchers.filter(voucher => voucher.id !== voucherId);
    setVouchers(updatedVouchers);
    addNotification(`Đã xóa voucher: ${voucherToDelete.code}`);
  };

  // Add notification
  const addNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      time: 'Vừa xong'
    };
    setNotifications([newNotification, ...notifications]);
  };

  // Generate a random voucher code
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let colorClass = 'bg-gray-200 text-gray-800';
    let icon = null;
    
    if (status === 'active') {
      colorClass = 'bg-green-100 text-green-800';
      icon = <CheckCircle size={14} className="mr-1" />;
    } else if (status === 'expired') {
      colorClass = 'bg-red-100 text-red-800';
      icon = <XCircle size={14} className="mr-1" />;
    } else if (status === 'scheduled') {
      colorClass = 'bg-blue-100 text-blue-800';
      icon = <Clock size={14} className="mr-1" />;
    } else if (status === 'used_up') {
      colorClass = 'bg-yellow-100 text-yellow-800';
      icon = <AlertCircle size={14} className="mr-1" />;
    } else if (status === 'disabled') {
      colorClass = 'bg-gray-100 text-gray-800';
      icon = <XCircle size={14} className="mr-1" />;
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass} flex items-center`}>
        {icon}
        {status.replace('_', ' ')}
      </span>
    );
  };

  // Type badge component
  const TypeBadge = ({ type, value }) => {
    let colorClass = 'bg-purple-100 text-purple-800';
    let displayValue = type === 'percent' ? `${value}%` : formatCurrency(value);
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass} flex items-center`}>
        {type === 'percent' ? <Percent size={14} className="mr-1" /> : <Tag size={14} className="mr-1" />}
        {displayValue}
      </span>
    );
  };

  // User group badge component
  const UserGroupBadge = ({ group }) => {
    let colorClass = 'bg-gray-200 text-gray-800';
    let displayName = 'Không xác định';
    
    if (group === 'all') {
      colorClass = 'bg-blue-100 text-blue-800';
      displayName = 'Tất cả';
    } else if (group === 'new') {
      colorClass = 'bg-green-100 text-green-800';
      displayName = 'Khách hàng mới';
    } else if (group === 'vip') {
      colorClass = 'bg-purple-100 text-purple-800';
      displayName = 'Khách hàng VIP';
    } else if (group === 'birthday') {
      colorClass = 'bg-orange-100 text-orange-800';
      displayName = 'Sinh nhật';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {displayName}
      </span>
    );
  };

  // Usage progress component
  const UsageProgress = ({ used, total }) => {
    const percentage = total > 0 ? Math.round((used / total) * 100) : 0;
    let colorClass = 'bg-blue-500';
    
    if (percentage >= 80) {
      colorClass = 'bg-red-500';
    } else if (percentage >= 50) {
      colorClass = 'bg-yellow-500';
    } else if (percentage >= 25) {
      colorClass = 'bg-green-500';
    }
    
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{used} / {total} đã sử dụng</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-2 ${colorClass}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 ml-64">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top navbar */}
        <div className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Quản lý voucher</h1>
          <div className="flex items-center">
            <div className="relative">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {/* Dropdown notifications */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-20 border">
                  <h3 className="px-4 py-2 text-sm font-medium text-gray-700 border-b">Thông báo</h3>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-gray-500">Không có thông báo nào</p>
                    ) : (
                      notifications.map(note => (
                        <div key={note.id} className="px-4 py-2 border-b text-sm hover:bg-gray-50">
                          <p className="text-gray-800">{note.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{note.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="ml-4 flex items-center">
              <User className="h-8 w-8 bg-blue-100 p-1 rounded-full text-blue-600" />
              <span className="ml-2 text-gray-700 font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="flex">
            <button
              className={`px-4 py-3 font-medium text-sm ${currentTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setCurrentTab('list')}
            >
              Danh sách voucher
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center ${currentTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setCurrentTab('analytics')}
            >
              <BarChart size={16} className="mr-2" />
              Phân tích voucher
            </button>
          </div>
        </div>

        {/* Main container */}
        <div className="p-6">
          {currentTab === 'list' ? (
            <>
              {/* Tools bar */}
              <div className="mb-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Tìm kiếm voucher..."
                      className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      className="pl-4 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="active">Đang hoạt động</option>
                      <option value="expired">Hết hạn</option>
                      <option value="scheduled">Lên lịch</option>
                      <option value="used_up">Hết lượt dùng</option>
                      <option value="disabled">Vô hiệu hóa</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  
                  <div className="relative">
                    <select
                      className="pl-4 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="all">Tất cả loại</option>
                      <option value="percent">Phần trăm</option>
                      <option value="fixed">Cố định</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                
                <button
                  onClick={handleAddVoucher}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle size={18} className="mr-2" />
                  Thêm voucher mới
                </button>
              </div>

              {/* Vouchers table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          scope="col" 
                          className="cursor-pointer hover:bg-gray-100 text-gray-500 uppercase tracking-wider flex items-center"
                        >
                          Mã voucher
                          {sortField === 'code' && (
                            sortDirection === 'asc' 
                              ? <ChevronUp size={16} className="ml-1" /> 
                              : <ChevronDown size={16} className="ml-1" />
                          )}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại
                        </th>
                        <th 
                          scope="col" 
                          onClick={() => handleSort('status')}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center"
                        >
                          Trạng thái
                          {sortField === 'status' && (
                            sortDirection === 'asc' 
                              ? <ChevronUp size={16} className="ml-1" /> 
                              : <ChevronDown size={16} className="ml-1" />
                          )}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Đã sử dụng
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nhóm người dùng
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredVouchers.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                            Không tìm thấy voucher nào
                          </td>
                        </tr>
                      ) : (
                        filteredVouchers.map(voucher => (
                          <tr key={voucher.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-900">{voucher.code}</span>
                                  <button 
                                    onClick={() => handleCopyCode(voucher.code)}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                    title="Sao chép mã"
                                  >
                                    <Copy size={14} />
                                  </button>
                                </div>
                                <span className="text-xs text-gray-500 mt-1">{voucher.description.length > 60 ? voucher.description.substring(0, 60) + '...' : voucher.description}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <TypeBadge type={voucher.type} value={voucher.value} />
                              <div className="text-xs text-gray-500 mt-1">
                                {voucher.minPurchase > 0 && (
                                  <span>Tối thiểu: {formatCurrency(voucher.minPurchase)}</span>
                                )}
                                {voucher.maxDiscount > 0 && voucher.type === 'percent' && (
                                  <span className="block">Tối đa: {formatCurrency(voucher.maxDiscount)}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={voucher.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col text-sm">
                                <div className="flex items-center text-gray-700">
                                  <CalendarIcon size={14} className="mr-1 text-gray-400" />
                                  {voucher.startDate} - {voucher.endDate}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">Tạo: {voucher.createdAt}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <UsageProgress used={voucher.used} total={voucher.quantity} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <UserGroupBadge group={voucher.userGroup} />
                              <div className="text-xs text-gray-500 mt-1">
                                Giới hạn: {voucher.userLimit} lần/người
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEditVoucher(voucher)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteVoucher(voucher.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            // Analytics Tab
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Tổng quan voucher</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow flex items-center">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Tag className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Tổng số voucher</p>
                      <p className="text-2xl font-bold">{vouchers.length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Voucher đang hoạt động</p>
                      <p className="text-2xl font-bold">
                        {vouchers.filter(v => v.status === 'active').length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow flex items-center">
                    <div className="rounded-full bg-orange-100 p-3 mr-4">
                      <Gift className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Tổng lượt sử dụng</p>
                      <p className="text-2xl font-bold">
                        {vouchers.reduce((sum, v) => sum + v.used, 0)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow flex items-center">
                    <div className="rounded-full bg-purple-100 p-3 mr-4">
                      <PercentSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Tỷ lệ sử dụng</p>
                      <p className="text-2xl font-bold">{chartData.usagePercentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Status Distribution Chart */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Phân bố theo trạng thái</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={chartData.statusData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false}
                          outerRadius={80} 
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.statusData.map((entry, index) => {
                            const COLORS = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B', '#6B7280'];
                            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                          })}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Type Distribution Chart */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Phân bố theo loại voucher</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={chartData.typeData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false}
                          outerRadius={80} 
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.typeData.map((entry, index) => {
                            const COLORS = ['#8B5CF6', '#EC4899'];
                            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                          })}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Usage Chart */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Top 5 voucher theo lượt sử dụng</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={chartData.usageData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="used" name="Đã sử dụng" fill="#3B82F6" />
                        <Bar dataKey="remaining" name="Còn lại" fill="#E5E7EB" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* User Group Distribution Chart */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Phân bố theo nhóm người dùng</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={chartData.userGroupData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false}
                          outerRadius={80} 
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.userGroupData.map((entry, index) => {
                            const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];
                            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                          })}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">
                {editMode ? 'Chỉnh sửa voucher' : 'Thêm voucher mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="code">
                    Mã voucher
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      required
                      className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.code}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={generateRandomCode}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-r-md border border-l-0 hover:bg-gray-200"
                    >
                      Tạo mã
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">
                    Loại voucher
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="percent">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (VNĐ)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="value">
                    {formData.type === 'percent' ? 'Phần trăm giảm (%)' : 'Số tiền giảm (VNĐ)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    id="value"
                    name="value"
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.value}
                    onChange={handleNumberInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="minPurchase">
                    Giá trị đơn hàng tối thiểu (VNĐ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    id="minPurchase"
                    name="minPurchase"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.minPurchase}
                    onChange={handleNumberInputChange}
                  />
                </div>
                
                {formData.type === 'percent' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="maxDiscount">
                      Giảm tối đa (VNĐ)
                    </label>
                    <input
                      type="number"
                      min="0"
                      id="maxDiscount"
                      name="maxDiscount"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.maxDiscount}
                      onChange={handleNumberInputChange}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="quantity">
                    Số lượng voucher
                  </label>
                  <input
                    type="number"
                    min="1"
                    id="quantity"
                    name="quantity"
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.quantity}
                    onChange={handleNumberInputChange}
                  />
                </div>
                
                {editMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="used">
                      Số lượng đã sử dụng
                    </label>
                    <input
                      type="number"
                      min="0"
                      id="used"
                      name="used"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.used}
                      onChange={handleNumberInputChange}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endDate">
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
                    Trạng thái
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="scheduled">Lên lịch</option>
                    <option value="disabled">Vô hiệu hóa</option>
                    {editMode && (
                      <>
                        <option value="expired">Hết hạn</option>
                        <option value="used_up">Hết lượt dùng</option>
                      </>
                    )}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userLimit">
                    Giới hạn sử dụng/người
                  </label>
                  <input
                    type="number"
                    min="1"
                    id="userLimit"
                    name="userLimit"
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.userLimit}
                    onChange={handleNumberInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userGroup">
                    Nhóm người dùng
                  </label>
                  <select
                    id="userGroup"
                    name="userGroup"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.userGroup}
                    onChange={handleInputChange}
                  >
                    <option value="all">Tất cả</option>
                    <option value="new">Khách hàng mới</option>
                    <option value="vip">Khách hàng VIP</option>
                    <option value="birthday">Sinh nhật</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {editMode ? 'Cập nhật' : 'Thêm voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}