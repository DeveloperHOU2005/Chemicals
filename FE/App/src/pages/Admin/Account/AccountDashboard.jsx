import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, DollarSign, Users, TrendingUp } from 'lucide-react';

// Dữ liệu mẫu cho biểu đồ
const accountActivityData = [
  { name: 'T1', active: 400, inactive: 240, new: 140 },
  { name: 'T2', active: 450, inactive: 220, new: 180 },
  { name: 'T3', active: 520, inactive: 210, new: 220 },
  { name: 'T4', active: 580, inactive: 190, new: 250 },
  { name: 'T5', active: 620, inactive: 180, new: 270 },
  { name: 'T6', active: 700, inactive: 160, new: 300 },
];

const spendingData = [
  { name: 'T1', amount: 2400 },
  { name: 'T2', amount: 3600 },
  { name: 'T3', amount: 3200 },
  { name: 'T4', amount: 4500 },
  { name: 'T5', amount: 5200 },
  { name: 'T6', amount: 6100 },
];

const userTypeData = [
  { name: 'Thường xuyên', value: 540 },
  { name: 'Trung bình', value: 320 },
  { name: 'Ít hoạt động', value: 140 },
];

const categorySpendingData = [
  { name: 'Thực phẩm', value: 35 },
  { name: 'Công nghệ', value: 25 },
  { name: 'Dịch vụ', value: 20 },
  { name: 'Khác', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('6T');
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Bảng Điều Khiển Phân Tích</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            Dữ liệu thống kê hoạt động tài khoản và chi tiêu
          </div>
          <div>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="6T">6 tháng qua</option>
              <option value="12T">12 tháng qua</option>
              <option value="24T">24 tháng qua</option>
            </select>
          </div>
        </div>
        
        {/* Cards tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="text-blue-600" size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Tài khoản hoạt động</h3>
                <p className="text-xl font-bold">1,240</p>
                <p className="text-green-500 text-xs">+12% so với tháng trước</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Tổng chi tiêu</h3>
                <p className="text-xl font-bold">25,000,000₫</p>
                <p className="text-green-500 text-xs">+18% so với tháng trước</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Activity className="text-yellow-600" size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Mức hoạt động TB</h3>
                <p className="text-xl font-bold">86%</p>
                <p className="text-green-500 text-xs">+5% so với tháng trước</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Chi tiêu TB/tài khoản</h3>
                <p className="text-xl font-bold">2,400,000₫</p>
                <p className="text-green-500 text-xs">+8% so với tháng trước</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Biểu đồ chính */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Thống kê tài khoản hoạt động</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={accountActivityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" name="Hoạt động" fill="#0088FE" />
                <Bar dataKey="inactive" name="Không hoạt động" fill="#FFBB28" />
                <Bar dataKey="new" name="Mới" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Mức độ chi tiêu theo thời gian</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={spendingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()}₫`} />
                <Legend />
                <Line type="monotone" dataKey="amount" name="Chi tiêu" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Biểu đồ phụ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Phân bổ loại tài khoản</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} tài khoản`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Chi tiêu theo danh mục</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySpendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categorySpendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}