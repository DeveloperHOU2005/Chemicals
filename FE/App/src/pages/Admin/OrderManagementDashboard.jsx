import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  Edit, 
  Trash2, 
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const OrderManagementDashboard = () => {
  // Dữ liệu mẫu
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const ordersPerPage = 5;

  // Dữ liệu cho biểu đồ
  const monthlyData = [
    { name: 'T1', value: 4000 },
    { name: 'T2', value: 3000 },
    { name: 'T3', value: 5000 },
    { name: 'T4', value: 2780 },
    { name: 'T5', value: 1890 },
    { name: 'T6', value: 2390 },
    { name: 'T7', value: 3490 },
    { name: 'T8', value: 4200 },
    { name: 'T9', value: 5300 },
    { name: 'T10', value: 4700 },
    { name: 'T11', value: 6100 },
    { name: 'T12', value: 7200 },
  ];

  const statusData = [
    { name: 'Hoàn thành', value: 58 },
    { name: 'Đang xử lý', value: 27 },
    { name: 'Đã hủy', value: 15 },
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#F44336'];

  // Tạo dữ liệu mẫu khi component được load
  useEffect(() => {
    const generateOrderData = () => {
      const statuses = ['Hoàn thành', 'Đang xử lý', 'Đã hủy'];
      const customers = [
        'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 
        'Phạm Thị D', 'Hoàng Văn E', 'Vũ Thị F',
        'Đặng Văn G', 'Bùi Thị H', 'Đỗ Văn I'
      ];
      
      const generatedOrders = Array(30).fill().map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 60));
        
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const total = Math.floor(Math.random() * 10000000) + 100000;
        
        return {
          id: `ORD-${String(i + 1).padStart(5, '0')}`,
          customer: customers[Math.floor(Math.random() * customers.length)],
          orderDate: date.toISOString(),
          total: total,
          status: status,
          items: Math.floor(Math.random() * 10) + 1,
          address: 'Số 123, Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
          paymentMethod: Math.random() > 0.5 ? 'Thẻ tín dụng' : 'COD',
          phone: `098${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`
        };
      });
      
      setOrders(generatedOrders);
      setFilteredOrders(generatedOrders);
      setLoading(false);
    };
    
    setTimeout(() => {
      generateOrderData();
    }, 1000); // Mô phỏng thời gian tải dữ liệu
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    const result = orders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    let filtered = result;
    if (filterStatus !== 'all') {
      filtered = result.filter(order => order.status === filterStatus);
    }
    
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, orders, filterStatus]);

  // Xử lý sắp xếp
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    const sortedData = [...filteredOrders].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredOrders(sortedData);
  };

  // Định dạng tiền tệ VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Định dạng ngày giờ
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Xử lý phân trang
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleCloseOrderDetail = () => {
    setShowOrderDetail(false);
  };

  const OrderDetailModal = () => {
    if (!selectedOrder) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ml-64">
        <div className="bg-white rounded-lg p-6 w-3/4 max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chi tiết đơn hàng #{selectedOrder.id}</h2>
            <button 
              onClick={handleCloseOrderDetail}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
              <p><span className="font-medium">Khách hàng:</span> {selectedOrder.customer}</p>
              <p><span className="font-medium">Điện thoại:</span> {selectedOrder.phone}</p>
              <p><span className="font-medium">Địa chỉ:</span> {selectedOrder.address}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
              <p><span className="font-medium">Ngày đặt:</span> {formatDate(selectedOrder.orderDate)}</p>
              <p><span className="font-medium">Trạng thái:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  selectedOrder.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                  selectedOrder.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedOrder.status}
                </span>
              </p>
              <p><span className="font-medium">Phương thức thanh toán:</span> {selectedOrder.paymentMethod}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Chi tiết sản phẩm</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Sản phẩm</th>
                    <th className="py-2 px-4 border-b text-center">Số lượng</th>
                    <th className="py-2 px-4 border-b text-right">Đơn giá</th>
                    <th className="py-2 px-4 border-b text-right">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(selectedOrder.items).fill().map((_, index) => {
                    const price = Math.floor(Math.random() * 5000000) + 100000;
                    const quantity = Math.floor(Math.random() * 5) + 1;
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">Sản phẩm {index + 1}</td>
                        <td className="py-2 px-4 text-center">{quantity}</td>
                        <td className="py-2 px-4 text-right">{formatCurrency(price)}</td>
                        <td className="py-2 px-4 text-right">{formatCurrency(price * quantity)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan="3" className="py-2 px-4 text-right font-semibold">Tổng cộng:</td>
                    <td className="py-2 px-4 text-right font-bold">{formatCurrency(selectedOrder.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              In đơn hàng
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Cập nhật trạng thái
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 ml-64">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        </div>
      </header>
      
      <main className="px-4 py-6 mx-auto max-w-7xl">
        {/* Thẻ thống kê */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-green-500 text-sm font-semibold flex items-center">
                <ArrowUp className="w-4 h-4 inline mr-1" />
                12%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đơn hoàn thành</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(order => order.status === 'Hoàn thành').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-green-500 text-sm font-semibold flex items-center">
                <ArrowUp className="w-4 h-4 inline mr-1" />
                8%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đơn đang xử lý</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(order => order.status === 'Đang xử lý').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-red-500 text-sm font-semibold flex items-center">
                <ArrowDown className="w-4 h-4 inline mr-1" />
                5%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đơn đã hủy</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(order => order.status === 'Đã hủy').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-red-500 text-sm font-semibold flex items-center">
                <ArrowUp className="w-4 h-4 inline mr-1" />
                2%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
        </div>
        
        {/* Biểu đồ */}
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Doanh số theo tháng</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Doanh số" 
                  stroke="#3B82F6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Trạng thái đơn hàng</h2>
            <div className="flex h-72">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center w-1/2">
                {statusData.map((entry, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div 
                      className="w-4 h-4 mr-2 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="mr-2">{entry.name}:</span>
                    <span className="font-semibold">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bảng đơn hàng */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row justify-between items-center md:space-y-0 space-y-4">
            <h2 className="text-lg font-semibold">Danh sách đơn hàng</h2>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Tìm kiếm đơn hàng..."
                  className="w-full px-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative w-full md:w-auto">
                <select
                  className="appearance-none w-full md:w-48 px-4 py-2 border rounded-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg w-full md:w-auto justify-center">
                <Download className="h-5 w-5 mr-2" />
                Xuất Excel
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('id')}
                    >
                      <div className="flex items-center">
                        Mã đơn hàng
                        {sortConfig.key === 'id' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('customer')}
                    >
                      <div className="flex items-center">
                        Khách hàng
                        {sortConfig.key === 'customer' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('orderDate')}
                    >
                      <div className="flex items-center">
                        Ngày đặt
                        {sortConfig.key === 'orderDate' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('total')}
                    >
                      <div className="flex items-center">
                        Tổng tiền
                        {sortConfig.key === 'total' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('status')}
                    >
                      <div className="flex items-center">
                        Trạng thái
                        {sortConfig.key === 'status' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(order.orderDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                          order.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleViewOrder(order)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            title="Xóa"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Phân trang */}
          {!loading && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{indexOfFirstOrder + 1}</span> đến <span className="font-medium">
                      {indexOfLastOrder > filteredOrders.length ? filteredOrders.length : indexOfLastOrder}
                    </span> trong số <span className="font-medium">{filteredOrders.length}</span> đơn hàng
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Modal chi tiết đơn hàng */}
      {showOrderDetail && <OrderDetailModal />}
    </div>
  );
};

export default OrderManagementDashboard;