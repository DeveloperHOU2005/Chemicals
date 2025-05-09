import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Filter, Search, ArrowUpDown, PieChart, TrendingUp } from 'lucide-react';

// Dữ liệu mẫu
const generateSampleData = () => {
  const chemicals = ['Axit Sulfuric', 'Natri Hidroxit', 'Metanol', 'Etanol', 'Amoniac', 'Axeton'];
  const data = [];
  
  // Tạo dữ liệu cho 6 tháng gần đây
  for (let month = 1; month <= 6; month++) {
    const monthData = {
      name: `Tháng ${month}`,
      doanhThu: Math.floor(Math.random() * 50000000) + 20000000,
      loiNhuan: Math.floor(Math.random() * 20000000) + 10000000,
    };
    data.push(monthData);
  }

  // Tạo dữ liệu sản phẩm
  const productData = chemicals.map(chemical => ({
    ten: chemical,
    soLuong: Math.floor(Math.random() * 1000) + 100,
    doanhThu: Math.floor(Math.random() * 10000000) + 5000000,
    loiNhuan: Math.floor(Math.random() * 5000000) + 1000000,
  }));

  return { revenueData: data, productData };
};

export default function ChemicalSalesDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('6Months');
  const [data, setData] = useState({ revenueData: [], productData: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'doanhThu', direction: 'desc' });

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setData(generateSampleData());
  }, [dateRange]);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const filteredProducts = data.productData.filter(product => 
    product.ten.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] - b[sortConfig.key];
    }
    return b[sortConfig.key] - a[sortConfig.key];
  });

  const totalRevenue = data.productData.reduce((sum, product) => sum + product.doanhThu, 0);
  const totalProfit = data.productData.reduce((sum, product) => sum + product.loiNhuan, 0);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HóaChất Pro - Quản Lý Doanh Thu</h1>
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
        <div className="flex border-b mb-6">
          <button 
            className={`py-2 px-4 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Tổng quan
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('products')}
          >
            Sản phẩm
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'reports' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reports')}
          >
            Báo cáo chi tiết
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <select 
                className="bg-transparent focus:outline-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="1Month">1 tháng gần đây</option>
                <option value="3Months">3 tháng gần đây</option>
                <option value="6Months">6 tháng gần đây</option>
                <option value="1Year">1 năm gần đây</option>
              </select>
            </div>
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select className="bg-transparent focus:outline-none">
                <option>Tất cả sản phẩm</option>
                <option>Hóa chất công nghiệp</option>
                <option>Hóa chất thí nghiệm</option>
                <option>Hóa chất tinh khiết</option>
              </select>
            </div>
          </div>

          <div className="flex items-center bg-white border rounded px-3 py-2">
            <Search size={16} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
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
                  <h3 className="text-gray-500 font-medium">Tổng doanh thu</h3>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp size={20} className="text-blue-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <div className="text-green-500 text-sm mt-2">+12.5% so với kỳ trước</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-medium">Tổng lợi nhuận</h3>
                  <div className="bg-green-100 p-2 rounded-full">
                    <PieChart size={20} className="text-green-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(totalProfit)}</div>
                <div className="text-green-500 text-sm mt-2">+8.3% so với kỳ trước</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-medium">Tỷ suất lợi nhuận</h3>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <TrendingUp size={20} className="text-purple-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{totalRevenue > 0 ? (totalProfit / totalRevenue * 100).toFixed(1) : 0}%</div>
                <div className="text-green-500 text-sm mt-2">+2.1% so với kỳ trước</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Doanh thu theo tháng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="doanhThu" name="Doanh thu" fill="#3B82F6" />
                    <Bar dataKey="loiNhuan" name="Lợi nhuận" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Xu hướng doanh thu</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data.revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="doanhThu" name="Doanh thu" stroke="#3B82F6" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="loiNhuan" name="Lợi nhuận" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Sản phẩm bán chạy</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('soLuong')}>
                        <div className="flex items-center">
                          Số lượng bán
                          <ArrowUpDown size={14} className="ml-1" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('doanhThu')}>
                        <div className="flex items-center">
                          Doanh thu
                          <ArrowUpDown size={14} className="ml-1" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('loiNhuan')}>
                        <div className="flex items-center">
                          Lợi nhuận
                          <ArrowUpDown size={14} className="ml-1" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.slice(0, 5).map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.ten}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.soLuong}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.doanhThu)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.loiNhuan)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Danh sách sản phẩm</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('soLuong')}>
                      <div className="flex items-center">
                        Số lượng bán
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('doanhThu')}>
                      <div className="flex items-center">
                        Doanh thu
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('loiNhuan')}>
                      <div className="flex items-center">
                        Lợi nhuận
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.ten}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.soLuong}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.doanhThu)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.loiNhuan)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Báo cáo doanh thu chi tiết</h3>
              <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                <Download size={16} className="mr-2" />
                Xuất báo cáo
              </button>
            </div>
            
            <div className="mb-8">
              <h4 className="text-md font-medium text-gray-700 mb-4">Thông số tổng hợp</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="text-gray-500 mb-1">Tổng doanh thu</div>
                  <div className="text-xl font-bold">{formatCurrency(totalRevenue)}</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-gray-500 mb-1">Tổng lợi nhuận</div>
                  <div className="text-xl font-bold">{formatCurrency(totalProfit)}</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-gray-500 mb-1">Số lượng sản phẩm bán ra</div>
                  <div className="text-xl font-bold">{data.productData.reduce((sum, product) => sum + product.soLuong, 0)}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">Chi tiết theo sản phẩm</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số lượng bán
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doanh thu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lợi nhuận
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tỷ suất lợi nhuận
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.ten}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.soLuong}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.doanhThu)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.loiNhuan)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(product.loiNhuan / product.doanhThu * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 border-t">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © 2025 HóaChất Pro - Hệ thống quản lý bán hàng hóa chất chuyên nghiệp
        </div>
      </footer>
    </div>
  );
}