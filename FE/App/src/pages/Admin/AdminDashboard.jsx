import { useState } from 'react';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MoreHorizontal, Bell, User, Search, ArrowUp, ArrowDown, DollarSign, Users, ShoppingBag, Activity } from 'lucide-react';

import adminApi from '../../services/adminApi';
// Dữ liệu mẫu cho biểu đồ và bảng
const lineChartData = [
  { name: 'T1', doanhthu: 4000, loinhuan: 2400 },
  { name: 'T2', doanhthu: 3000, loinhuan: 1398 },
  { name: 'T3', doanhthu: 2000, loinhuan: 9800 },
  { name: 'T4', doanhthu: 2780, loinhuan: 3908 },
  { name: 'T5', doanhthu: 1890, loinhuan: 4800 },
  { name: 'T6', doanhthu: 2390, loinhuan: 3800 },
  { name: 'T7', doanhthu: 3490, loinhuan: 4300 },
];

const barChartData = [
  { name: 'Sản phẩm A', doanhthu: 4000 },
  { name: 'Sản phẩm B', doanhthu: 3000 },
  { name: 'Sản phẩm C', doanhthu: 5000 },
  { name: 'Sản phẩm D', doanhthu: 2500 },
  { name: 'Sản phẩm E', doanhthu: 3500 },
];

const pieChartData = [
  { name: 'Miền Bắc', value: 400 },
  { name: 'Miền Trung', value: 300 },
  { name: 'Miền Nam', value: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const tableData = [
  { id: 1, sanpham: 'Laptop Dell XPS', gia: 28000000, soluong: 12, trangthai: 'Còn hàng' },
  { id: 2, sanpham: 'iPhone 14 Pro Max', gia: 35000000, soluong: 8, trangthai: 'Còn hàng' },
  { id: 3, sanpham: 'Samsung Galaxy S23', gia: 25000000, soluong: 15, trangthai: 'Còn hàng' },
  { id: 4, sanpham: 'MacBook Pro M2', gia: 42000000, soluong: 5, trangthai: 'Sắp hết' },
  { id: 5, sanpham: 'iPad Pro 12.9', gia: 22000000, soluong: 0, trangthai: 'Hết hàng' },
];

// Format tiền tệ VND
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(value);
};

const account = adminApi.getAccount()

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Dashboard Quản lý</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white p-2 rounded-full">
                {account.avatar === undefined ? <User className="h-5 w-5" /> : <img src={account.avatar} className='max-w-10 rounded-full'/>}
              </div>
              <span className="font-medium">{account.UserName}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex h-full">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Tổng quan</h2>
            <p className="text-gray-600">Xin chào {account.fullName}, đây là báo cáo của bạn hôm nay.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Doanh thu</p>
                  <p className="text-2xl font-bold">{formatCurrency(356000000)}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">12.5%</span>
                <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Đơn hàng</p>
                  <p className="text-2xl font-bold">854</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">8.2%</span>
                <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Khách hàng</p>
                  <p className="text-2xl font-bold">2,543</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">5.3%</span>
                <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tỷ lệ chuyển đổi</p>
                  <p className="text-2xl font-bold">3.6%</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-500">1.8%</span>
                <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Doanh thu & Lợi nhuận</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="doanhthu" stroke="#3b82f6" strokeWidth={2} name="Doanh thu" />
                  <Line type="monotone" dataKey="loinhuan" stroke="#10b981" strokeWidth={2} name="Lợi nhuận" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Top sản phẩm bán chạy</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="doanhthu" fill="#3b82f6" name="Doanh thu" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Phân bố doanh thu theo khu vực</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Danh sách sản phẩm</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Xem tất cả
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-gray-500">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Sản phẩm</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Giá</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Số lượng</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{item.id}</td>
                        <td className="py-3 px-4 font-medium">{item.sanpham}</td>
                        <td className="py-3 px-4">{formatCurrency(item.gia)}</td>
                        <td className="py-3 px-4">{item.soluong}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            item.trangthai === 'Còn hàng' ? 'bg-green-100 text-green-800' : 
                            item.trangthai === 'Sắp hết' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.trangthai}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}