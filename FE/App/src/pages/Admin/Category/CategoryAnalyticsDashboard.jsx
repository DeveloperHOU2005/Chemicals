import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Treemap
} from 'recharts';
import { 
  TrendingUp, 
  Activity, 
  PieChart as PieChartIcon, 
  BarChart2, 
  Database, 
  Filter, 
  ChevronDown, 
  Download,
  Calendar,
  Search
} from 'lucide-react';

// Giả lập API service
const categoryAnalyticsApi = {
  getCategoryAnalytics: () => Promise.resolve({
    // Dữ liệu doanh số theo danh mục
    categorySales: [
      { id: 1, name: 'Axit hữu cơ', sales: 120000, growth: 15, products: 45, avgRating: 4.5 },
      { id: 2, name: 'Dung môi', sales: 95000, growth: -5, products: 32, avgRating: 4.2 },
      { id: 3, name: 'Hóa chất phòng thí nghiệm', sales: 150000, growth: 25, products: 60, avgRating: 4.7 },
      { id: 4, name: 'Hóa chất công nghiệp', sales: 200000, growth: 10, products: 25, avgRating: 4.0 },
      { id: 5, name: 'Chất xúc tác', sales: 75000, growth: 8, products: 18, avgRating: 4.3 },
      { id: 6, name: 'Hợp chất hữu cơ', sales: 110000, growth: 12, products: 40, avgRating: 4.4 },
      { id: 7, name: 'Phân bón', sales: 130000, growth: -2, products: 30, avgRating: 4.1 },
    ],
    
    // Dữ liệu xu hướng theo thời gian
    trendData: [
      { month: 'T1', 'Axit hữu cơ': 8500, 'Dung môi': 7200, 'Hóa chất phòng thí nghiệm': 12000 },
      { month: 'T2', 'Axit hữu cơ': 9000, 'Dung môi': 6800, 'Hóa chất phòng thí nghiệm': 13000 },
      { month: 'T3', 'Axit hữu cơ': 9500, 'Dung môi': 7000, 'Hóa chất phòng thí nghiệm': 12500 },
      { month: 'T4', 'Axit hữu cơ': 10000, 'Dung môi': 7500, 'Hóa chất phòng thí nghiệm': 13500 },
      { month: 'T5', 'Axit hữu cơ': 9800, 'Dung môi': 8000, 'Hóa chất phòng thí nghiệm': 14000 },
      { month: 'T6', 'Axit hữu cơ': 10500, 'Dung môi': 7800, 'Hóa chất phòng thí nghiệm': 14500 },
    ],
    
    // Dữ liệu phân cụm danh mục
    clusterData: [
      { name: 'Cụm 1: Sản phẩm bán chạy', value: 3200, categories: ['Axit hữu cơ', 'Hóa chất phòng thí nghiệm'] },
      { name: 'Cụm 2: Sản phẩm tiềm năng', value: 2100, categories: ['Chất xúc tác', 'Hợp chất hữu cơ'] },
      { name: 'Cụm 3: Cần cải thiện', value: 1200, categories: ['Dung môi', 'Phân bón'] },
      { name: 'Cụm 4: Sản phẩm đặc biệt', value: 900, categories: ['Hóa chất công nghiệp'] },
    ],
    
    // Dữ liệu mối quan hệ giữa các danh mục (Market Basket Analysis)
    associationData: [
      { source: 'Axit hữu cơ', target: 'Hóa chất phòng thí nghiệm', confidence: 0.85 },
      { source: 'Dung môi', target: 'Hợp chất hữu cơ', confidence: 0.72 },
      { source: 'Chất xúc tác', target: 'Hóa chất công nghiệp', confidence: 0.65 },
      { source: 'Axit hữu cơ', target: 'Chất xúc tác', confidence: 0.45 },
      { source: 'Hóa chất phòng thí nghiệm', target: 'Hợp chất hữu cơ', confidence: 0.55 },
    ],
    
    // Dữ liệu dự đoán
    predictionData: {
      growthPredictions: [
        { category: 'Axit hữu cơ', current: 15, prediction: 18, confidence: 0.85 },
        { category: 'Dung môi', current: -5, prediction: 2, confidence: 0.7 },
        { category: 'Hóa chất phòng thí nghiệm', current: 25, prediction: 22, confidence: 0.9 },
        { category: 'Hóa chất công nghiệp', current: 10, prediction: 12, confidence: 0.8 },
        { category: 'Chất xúc tác', current: 8, prediction: 10, confidence: 0.75 },
      ],
      recommendedActions: [
        { category: 'Dung môi', action: 'Cần tăng cường quảng cáo và giảm giá để cải thiện doanh số' },
        { category: 'Phân bón', action: 'Xem xét mở rộng phạm vi sản phẩm và tiếp cận thị trường mới' },
        { category: 'Axit hữu cơ', action: 'Duy trì chiến lược hiện tại, xem xét tăng giá nhẹ' },
      ]
    }
  })
};

// Component chính
export default function CategoryAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Màu sắc cho biểu đồ
  const COLORS = ['#4CAF50', '#2196F3', '#F44336', '#FF9800', '#9C27B0', '#3F51B5', '#E91E63'];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryAnalyticsApi.getCategoryAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu phân tích:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);
  
  // Filter data based on search term
  const filteredCategorySales = analyticsData?.categorySales.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Phân tích danh mục hóa chất</h1>
        <p className="text-gray-600 mt-2">
          Sử dụng machine learning để phân tích và trích xuất thông tin chi tiết về danh mục sản phẩm
        </p>
      </header>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="appearance-none w-48 px-4 py-2 border rounded-lg bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="30days">30 ngày qua</option>
              <option value="3months">3 tháng qua</option>
              <option value="6months">6 tháng qua</option>
              <option value="1year">1 năm qua</option>
            </select>
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              className="w-64 px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
          <Download className="h-5 w-5 mr-2" />
          Xuất báo cáo
        </button>
      </div>
      
      {/* Cards hiển thị tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng doanh số</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.categorySales.reduce((sum, cat) => sum + cat.sales, 0).toLocaleString()} VNĐ
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-green-500 text-sm font-medium">+12.5%</span>
              <span className="text-gray-500 text-sm ml-2">so với kỳ trước</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Số lượng danh mục</p>
              <p className="text-2xl font-semibold text-gray-900">{analyticsData.categorySales.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Database className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-green-500 text-sm font-medium">+2</span>
              <span className="text-gray-500 text-sm ml-2">danh mục mới</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Danh mục tăng trưởng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.categorySales.filter(cat => cat.growth > 0).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">
                {((analyticsData.categorySales.filter(cat => cat.growth > 0).length / 
                  analyticsData.categorySales.length) * 100).toFixed(0)}% tổng danh mục
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Danh mục giảm</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.categorySales.filter(cat => cat.growth < 0).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-red-500 text-sm font-medium">Cần chú ý</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs chuyển đổi giữa các phân tích */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="clustering">Phân cụm</TabsTrigger>
          <TabsTrigger value="association">Phân tích giỏ hàng</TabsTrigger>
          <TabsTrigger value="predictions">Dự đoán</TabsTrigger>
        </TabsList>
        
        {/* Tab Tổng quan */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Biểu đồ xu hướng doanh số */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Xu hướng doanh số theo danh mục</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Axit hữu cơ" stroke="#4CAF50" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Dung môi" stroke="#2196F3" />
                    <Line type="monotone" dataKey="Hóa chất phòng thí nghiệm" stroke="#F44336" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Phân tích trend cho thấy "Hóa chất phòng thí nghiệm" có xu hướng tăng mạnh nhất trong 6 tháng qua.
              </p>
            </div>
            
            {/* Biểu đồ danh mục theo doanh số */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Doanh số theo danh mục</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredCategorySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" name="Doanh số" fill="#3F51B5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                "Hóa chất công nghiệp" đang là danh mục có doanh số cao nhất, chiếm 26% tổng doanh số.
              </p>
            </div>
          </div>
          
          {/* Bảng danh mục với thông số chi tiết */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Chi tiết danh mục sản phẩm</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doanh số
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tăng trưởng
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng SP
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đánh giá
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategorySales.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{category.sales.toLocaleString()} VNĐ</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          category.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {category.growth > 0 ? '+' : ''}{category.growth}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {category.products}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-1">{category.avgRating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.round(category.avgRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.growth >= 10 ? 'bg-green-100 text-green-800' : 
                          category.growth >= 0 ? 'bg-blue-100 text-blue-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {category.growth >= 10 ? 'Tăng trưởng mạnh' : 
                           category.growth >= 0 ? 'Ổn định' : 'Cần cải thiện'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        {/* Tab Phân cụm */}
        <TabsContent value="clustering" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Treemap phân cụm */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Phân cụm danh mục (K-means clustering)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={analyticsData.clusterData}
                    dataKey="value"
                    stroke="#fff"
                    fill="#8884d8"
                    content={({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
                      return (
                        <g>
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            style={{
                              fill: COLORS[index % COLORS.length],
                              stroke: '#fff',
                              strokeWidth: 2 / (depth + 1e-10),
                              strokeOpacity: 1 / (depth + 1e-10),
                            }}
                          />
                          {depth === 1 ? (
                            <text
                              x={x + width / 2}
                              y={y + height / 2 + 7}
                              textAnchor="middle"
                              fill="#fff"
                              fontSize={14}
                            >
                              {name}
                            </text>
                          ) : null}
                        </g>
                      );
                    }}
                  />
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Bằng cách sử dụng K-means clustering, chúng tôi đã phân danh mục thành 4 nhóm dựa trên doanh số và tăng trưởng
              </p>
            </div>
            
            {/* Chi tiết phân cụm */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Chi tiết phân cụm</h2>
              <div className="space-y-6">
                {analyticsData.clusterData.map((cluster, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium text-lg">{cluster.name}</h3>
                    <p className="text-gray-600 mt-1">Danh mục: {cluster.categories.join(', ')}</p>
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Mức đóng góp</span>
                        <span className="text-sm font-medium text-gray-700">
                          {Math.round((cluster.value / analyticsData.clusterData.reduce((sum, c) => sum + c.value, 0)) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.round((cluster.value / analyticsData.clusterData.reduce((sum, c) => sum + c.value, 0)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">Đề xuất chiến lược:</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {index === 0 && "Tập trung đầu tư và mở rộng, đây là nhóm danh mục chủ lực"}
                        {index === 1 && "Đầu tư thêm vào marketing, nhóm này có tiềm năng tăng trưởng tốt"}
                        {index === 2 && "Cần xem xét lại chiến lược sản phẩm và giá, có thể cần tái cấu trúc"}
                        {index === 3 && "Duy trì ổn định, tập trung vào khách hàng chuyên biệt"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Phân tích dựa trên thời gian */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Phân tích theo thời gian</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {analyticsData.categorySales.map((cat, index) => (
                    <Line key={index} type="monotone" dataKey={cat.name} stroke={COLORS[index % COLORS.length]} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Xu hướng doanh số theo thời gian cho thấy "Hóa chất phòng thí nghiệm" có xu hướng tăng trưởng mạnh nhất.
            </p>
          </div>
        </TabsContent>
          
          {/* Tab Phân tích giỏ hàng */}
        <TabsContent value="association" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Biểu đồ mối quan hệ giữa các danh mục */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Mối quan hệ giữa các danh mục</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.associationData}
                      dataKey="confidence"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {analyticsData.associationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Phân tích giỏ hàng cho thấy "Axit hữu cơ" và "Hóa chất phòng thí nghiệm" thường được mua cùng nhau.
              </p>
            </div>
            
            {/* Bảng mối quan hệ giữa các danh mục */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Chi tiết mối quan hệ giữa các danh mục</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục 1
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục 2
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.associationData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.target}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(data.confidence * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            
            {/* Phân tích giỏ hàng */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Phân tích giỏ hàng</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.associationData}
                    dataKey="confidence"
                    nameKey="source"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {analyticsData.associationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Phân tích giỏ hàng cho thấy "Axit hữu cơ" và "Hóa chất phòng thí nghiệm" thường được mua cùng nhau.
            </p>
          </div>
        </TabsContent>
          
          {/* Tab Dự đoán */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Biểu đồ dự đoán tăng trưởng */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Dự đoán tăng trưởng danh mục</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.predictionData.growthPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Tăng trưởng hiện tại" fill="#4CAF50" />
                    <Bar dataKey="prediction" name="Dự đoán tăng trưởng" fill="#FF9800" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Dự đoán cho thấy "Axit hữu cơ" và "Hóa chất phòng thí nghiệm" có tiềm năng tăng trưởng tốt trong thời gian tới.
              </p>
            </div>
            
            {/* Bảng dự đoán */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Chi tiết dự đoán</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tăng trưởng hiện tại
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dự đoán tăng trưởng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.predictionData.growthPredictions.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.current}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.prediction}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            {/* Đề xuất hành động */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Đề xuất hành động chiến lược</h2>
            <div className="space-y-4">
              {analyticsData.predictionData.recommendedActions.map((action, index) => (
                <div key={index} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <h3 className="font-medium text-blue-800">{action.category}</h3>
                  <p className="text-sm text-blue-700 mt-1">{action.action}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
