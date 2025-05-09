// src/components/DashboardStats.jsx
import React, { useState } from 'react';
import { Box, BarChart2, ShoppingCart, Star, TrendingUp, AlertTriangle, TrendingDown, Brain, Calendar, Activity } from 'lucide-react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import * as math from 'mathjs';

// Dữ liệu mẫu cho biểu đồ doanh số theo tháng
const monthlyData = [
  { name: 'T1', value: 12000000 },
  { name: 'T2', value: 19000000 },
  { name: 'T3', value: 15000000 },
  { name: 'T4', value: 25000000 },
  { name: 'T5', value: 22000000 },
  { name: 'T6', value: 29000000 },
  { name: 'T7', value: 33000000 },
  { name: 'T8', value: 35000000 },
  { name: 'T9', value: 31000000 },
  { name: 'T10', value: 42000000 },
  { name: 'T11', value: 45000000 },
  { name: 'T12', value: 48000000 }
];

// Dữ liệu mẫu cho thống kê
const sampleStats = {
  data: {
    totalProducts: 256,
    totalSold: 1285,
    revenue: 650000000,
    topCategories: [
      { tendanhmuc: 'Hóa chất công nghiệp', daban: 520 },
      { tendanhmuc: 'Hóa chất phòng thí nghiệm', daban: 430 },
      { tendanhmuc: 'Dung môi', daban: 350 },
      { tendanhmuc: 'Hóa chất nông nghiệp', daban: 240 },
      { tendanhmuc: 'Hóa chất xử lý nước', daban: 190 }
    ]
  }
};

// Dữ liệu mẫu cho sản phẩm bán chạy
const sampleTopSelling = [
  { id: 1, tensp: 'Axit Sulfuric H2SO4', da_ban: 178 },
  { id: 2, tensp: 'Natri Hydroxit NaOH', da_ban: 156 },
  { id: 3, tensp: 'Methanol CH3OH', da_ban: 132 },
  { id: 4, tensp: 'Amoniac NH3', da_ban: 107 },
  { id: 5, tensp: 'Clorua Canxi CaCl2', da_ban: 89 }
];

// Dữ liệu mẫu cho sản phẩm sắp hết hàng
const sampleLowStock = [
  { id: 12, tensp: 'Axit Nitric HNO3', khoiluong: 8 },
  { id: 18, tensp: 'Ethanol C2H5OH', khoiluong: 5 },
  { id: 24, tensp: 'Kali Permanganat KMnO4', khoiluong: 12 },
  { id: 31, tensp: 'Natri Hypoclorit NaClO', khoiluong: 9 },
  { id: 42, tensp: 'Dung dịch đệm pH 7', khoiluong: 3 }
];

// Dữ liệu mẫu cho dự đoán nhu cầu
const sampleDemandData = [
  { month: 'T1', actual: 120, predicted: 115 },
  { month: 'T2', actual: 150, predicted: 140 },
  { month: 'T3', actual: 130, predicted: 135 },
  { month: 'T4', actual: 145, predicted: 150 },
  { month: 'T5', actual: 165, predicted: 160 },
  { month: 'T6', actual: 180, predicted: 175 },
  { month: 'T7', actual: 190, predicted: 195 },
  { month: 'T8', actual: 210, predicted: 205 },
  { month: 'T9', actual: 200, predicted: 210 },
  { month: 'T10', actual: 225, predicted: 220 },
  { month: 'T11', actual: 235, predicted: 240 },
  { month: 'T12', actual: 250, predicted: 255 }
];

// Dữ liệu mẫu cho phân tích tương quan
const sampleCorrelationData = [
  { x: 85, y: 15000000, z: 200, name: 'Axit Sulfuric' },
  { x: 75, y: 12000000, z: 180, name: 'Natri Hydroxit' },
  { x: 92, y: 20000000, z: 210, name: 'Methanol' },
  { x: 68, y: 8000000, z: 140, name: 'Amoniac' },
  { x: 78, y: 13000000, z: 190, name: 'Clorua Canxi' },
  { x: 71, y: 9500000, z: 160, name: 'Ethanol' },
  { x: 88, y: 17000000, z: 205, name: 'Axit Nitric' },
  { x: 65, y: 7000000, z: 130, name: 'Kali Permanganat' },
  { x: 82, y: 16000000, z: 195, name: 'Natri Hypoclorit' }
];

// Dữ liệu mẫu cho phân tích tuổi thọ
const sampleShelfLifeData = [
  { name: 'Dưới 1 năm', value: 85 },
  { name: '1-2 năm', value: 130 },
  { name: '2-3 năm', value: 95 },
  { name: '3-5 năm', value: 60 },
  { name: 'Trên 5 năm', value: 30 }
];

// Dữ liệu mẫu cho phân cụm sản phẩm theo đặc tính
const sampleClusterData = [
  { x: 30, y: 55, cluster: 0, name: 'Nhóm axit' },
  { x: 70, y: 63, cluster: 0, name: 'Nhóm axit' },
  { x: 45, y: 70, cluster: 0, name: 'Nhóm axit' },
  { x: 65, y: 25, cluster: 1, name: 'Nhóm bazơ' },
  { x: 80, y: 35, cluster: 1, name: 'Nhóm bazơ' },
  { x: 90, y: 20, cluster: 1, name: 'Nhóm bazơ' },
  { x: 30, y: 20, cluster: 2, name: 'Nhóm dung môi' },
  { x: 20, y: 40, cluster: 2, name: 'Nhóm dung môi' },
  { x: 45, y: 30, cluster: 2, name: 'Nhóm dung môi' },
  { x: 85, y: 85, cluster: 3, name: 'Nhóm muối' },
  { x: 95, y: 90, cluster: 3, name: 'Nhóm muối' },
  { x: 75, y: 95, cluster: 3, name: 'Nhóm muối' }
];

// Dữ liệu mẫu cho dự đoán giá
const samplePricePredictionData = [
  { month: 'T1', actual: 100, predicted: 98 },
  { month: 'T2', actual: 105, predicted: 104 },
  { month: 'T3', actual: 103, predicted: 106 },
  { month: 'T4', actual: 108, predicted: 110 },
  { month: 'T5', actual: 115, predicted: 112 },
  { month: 'T6', actual: 118, predicted: 116 },
  { month: 'T7', actual: 120, predicted: 120 },
  { month: 'T8', actual: 122, predicted: 124 },
  { month: 'T9', actual: 128, predicted: 128 },
  { month: 'T10', actual: 135, predicted: 132 },
  { month: 'T11', actual: 138, predicted: 136 },
  { month: 'T12', actual: 140, predicted: 141 }
];

// Màu sắc cho biểu đồ
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const CLUSTER_COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F033FF'];

const DashboardStats = ({ 
  stats = sampleStats, 
  topSelling = sampleTopSelling, 
  lowStock = sampleLowStock, 
  formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}) => {
  // State để theo dõi tab đang hiển thị trong phân tích ML
  const [activeTab, setActiveTab] = useState('demand');

  // Tính toán độ chính xác dự đoán của mô hình
  const calculateModelAccuracy = (actual, predicted) => {
    const meanSquaredError = actual.reduce((acc, val, idx) => {
      return acc + Math.pow(val - predicted[idx], 2);
    }, 0) / actual.length;
    
    // Chuyển đổi MSE thành % chính xác (đơn giản cho mục đích hiển thị)
    const maxError = Math.max(...actual.map((val, idx) => Math.abs(val - predicted[idx])));
    const accuracyPercentage = Math.round((1 - Math.sqrt(meanSquaredError) / Math.max(...actual)) * 100);
    
    return accuracyPercentage;
  };

  // Tính toán hệ số tương quan Pearson
  const calculateCorrelation = (xValues, yValues) => {
    return math.round(math.corr(xValues, yValues), 3);
  };

  // Lấy dữ liệu cho tính toán hệ số tương quan
  const salesQuantityData = sampleCorrelationData.map(item => item.x);
  const revenueData = sampleCorrelationData.map(item => item.y);
  const correlation = calculateCorrelation(salesQuantityData, revenueData);

  // Dữ liệu cho tính toán độ chính xác mô hình dự đoán nhu cầu
  const actualDemandValues = sampleDemandData.map(item => item.actual);
  const predictedDemandValues = sampleDemandData.map(item => item.predicted);
  const demandAccuracy = calculateModelAccuracy(actualDemandValues, predictedDemandValues);

  // Dữ liệu cho tính toán độ chính xác mô hình dự đoán giá
  const actualPriceValues = samplePricePredictionData.map(item => item.actual);
  const predictedPriceValues = samplePricePredictionData.map(item => item.predicted);
  const priceAccuracy = calculateModelAccuracy(actualPriceValues, predictedPriceValues);

  return (
    <div>
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Box className="text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Tổng sản phẩm</h3>
                <p className="text-2xl font-bold">{stats.data.totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <ShoppingCart className="text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Sản phẩm đã bán</h3>
                <p className="text-2xl font-bold">{stats.data.totalSold}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart2 className="text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Doanh thu</h3>
                <p className="text-2xl font-bold">{formatCurrency(stats.data.revenue)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Danh mục nổi bật</h3>
                <p className="text-base font-medium">
                  {stats.data.topCategories[0] ? stats.data.topCategories[0].tendanhmuc : 'Không xác định'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Biểu đồ doanh số theo tháng */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
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

      {/* Phân tích học máy */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <Brain className="text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold">Phân tích học máy</h2>
        </div>
        
        <div className="flex border-b mb-4">
          <button 
            className={`pb-2 px-4 ${activeTab === 'demand' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('demand')}
          >
            Dự đoán nhu cầu
          </button>
          <button 
            className={`pb-2 px-4 ${activeTab === 'correlation' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('correlation')}
          >
            Phân tích tương quan
          </button>
          <button 
            className={`pb-2 px-4 ${activeTab === 'cluster' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('cluster')}
          >
            Phân cụm sản phẩm
          </button>
          <button 
            className={`pb-2 px-4 ${activeTab === 'price' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('price')}
          >
            Dự đoán giá
          </button>
        </div>
        
        {activeTab === 'demand' && (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-md font-medium">Dự đoán nhu cầu sản phẩm</h3>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Activity size={16} className="mr-1" />
                Độ chính xác: {demandAccuracy}%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={sampleDemandData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Nhu cầu thực tế" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="predicted" name="Dự đoán" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Nhận định từ mô hình:</h4>
              <p className="text-blue-800">Dự đoán nhu cầu cho tháng tiếp theo: <span className="font-bold">265 đơn vị</span></p>
              <p className="text-blue-800 mt-1">Sản phẩm có khả năng tăng nhu cầu cao nhất: <span className="font-bold">Axit Sulfuric H2SO4</span></p>
            </div>
          </div>
        )}
        
        {activeTab === 'correlation' && (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-md font-medium">Phân tích tương quan giữa lượng bán và doanh thu</h3>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                <TrendingUp size={16} className="mr-1" />
                Hệ số tương quan: {correlation}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Số lượng bán" unit=" đơn vị" />
                <YAxis type="number" dataKey="y" name="Doanh thu" unit=" VNĐ" />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Giá bán" unit=" VNĐ" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name, props) => {
                  if (name === 'y') return formatCurrency(value);
                  return value;
                }} />
                <Legend />
                <Scatter name="Sản phẩm" data={sampleCorrelationData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Phân tích tương quan:</h4>
              <p className="text-blue-800">Nhóm sản phẩm có tương quan doanh thu-sản lượng cao nhất: <span className="font-bold">Hóa chất công nghiệp</span></p>
              <p className="text-blue-800 mt-1">Đề xuất: <span className="font-bold">Tăng cường sản phẩm có biên lợi nhuận cao (Methanol, Axit Sulfuric)</span></p>
            </div>
          </div>
        )}
        
        {activeTab === 'cluster' && (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-md font-medium">Phân cụm sản phẩm theo đặc tính</h3>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Box size={16} className="mr-1" />
                4 nhóm đặc tính
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Độ pH" />
                <YAxis type="number" dataKey="y" name="Độ ổn định" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                {Array.from({ length: 4 }).map((_, index) => (
                  <Scatter 
                    key={index}
                    name={sampleClusterData.find(item => item.cluster === index)?.name || `Nhóm ${index + 1}`}
                    data={sampleClusterData.filter(item => item.cluster === index)}
                    fill={CLUSTER_COLORS[index]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-700 mb-2">Phân tích cụm:</h4>
              <p className="text-purple-800">Nhóm sản phẩm có nhu cầu cao nhất: <span className="font-bold">Nhóm axit</span></p>
              <p className="text-purple-800 mt-1">Đề xuất: <span className="font-bold">Tối ưu hóa kho hàng cho nhóm sản phẩm có nhu cầu cao</span></p>
            </div>
          </div>
        )}
        
        {activeTab === 'price' && (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-md font-medium">Dự đoán biến động giá</h3>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Activity size={16} className="mr-1" />
                Độ chính xác: {priceAccuracy}%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={samplePricePredictionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Giá thực tế" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="predicted" name="Dự đoán" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-700 mb-2">Dự đoán giá:</h4>
              <p className="text-yellow-800">Dự đoán giá trung bình cho quý tiếp theo: <span className="font-bold">Tăng 5.2%</span></p>
              <p className="text-yellow-800 mt-1">Sản phẩm có xu hướng tăng giá mạnh nhất: <span className="font-bold">Natri Hydroxit NaOH</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Phân bổ hàng hóa theo danh mục */}
      {stats && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-4">Phân bổ hàng hóa theo danh mục</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart
              data={stats.data.topCategories.map(item => ({
                ...item,
                daban: Number(item.daban)
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tendanhmuc" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="daban" name="Đã bán" fill="#82ca9d" />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Phân tích tuổi thọ sản phẩm */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <Calendar className="text-teal-600 mr-2" />
          <h3 className="text-lg font-medium">Phân tích tuổi thọ sản phẩm</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sampleShelfLifeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {sampleShelfLifeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} sản phẩm`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center">
            <h4 className="font-medium text-gray-700 mb-4">Phân tích tuổi thọ:</h4>
            <ul className="space-y-2">
              <li className="bg-teal-50 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-teal-500 mr-2"></div>
                  <span className="text-teal-800">
                    <span className="font-medium">33.5%</span> sản phẩm có tuổi thọ từ 1-2 năm
                  </span>
                </div>
              </li>
              <li className="bg-teal-50 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-teal-800">
                    <span className="font-medium">21.3%</span> sản phẩm cần bảo quản đặc biệt
                  </span>
                </div>
              </li>
              <li className="bg-teal-50 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-teal-800">
                    <span className="font-medium">15.5%</span> sản phẩm có nguy cơ hết hạn trong tháng tới
                  </span>
                </div>
              </li>
              <li className="bg-teal-50 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-teal-800">
                    <span className="font-medium">30.0%</span> sản phẩm có tuổi thọ trên 5 năm
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
                  
        
        {/* Sản phẩm bán chạy */}   
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium mb-4">Sản phẩm bán chạy</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã bán</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topSelling.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.tensp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.da_ban}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        
        
        {/* Sản phẩm sắp hết hàng */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium mb-4">Sản phẩm sắp hết hàng</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lowStock.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.tensp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.khoiluong}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DashboardStats;