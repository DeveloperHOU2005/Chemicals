import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from 'recharts';
import adminServices from '../../services/adminServices';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyCategories, setEmptyCategories] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    data: { productPerCategory: [] },
    totalCategory: 0,
    totalProduct: 0
  });
  const [popularCategories, setPopularCategories] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all required data in parallel
        const [overview, popular, empty] = await Promise.all([
          adminServices.getStatistics(),
          adminServices.getPopularCategories(),
          adminServices.getEmptyCategories()
        ]);

        console.log(overview)
        console.log( popular)
        console.log( empty)
        
        setDashboardData(overview.data);
        setPopularCategories(popular.data);
        setEmptyCategories(empty.result.categories);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare pie data for category distribution
  const pieData = [
    { name: "Có sản phẩm", value: dashboardData.data.totalCategory - (emptyCategories?.length || 0) },
    { name: "Không có sản phẩm", value: emptyCategories?.length || 0 }
  ];

  // Prepare data for product distribution chart
  const productDistributionData = dashboardData.data?.productPerCategory?.map(item => ({
    name: item.tendanhmuc?.length > 15 ? item.tendanhmuc.substring(0, 15) + '...' : item.tendanhmuc,
    fullName: item.tendanhmuc,
    value: parseInt(item.totalproduct, 10)
  })).sort((a, b) => b.value - a.value) || [];

  // Colors for charts
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF',
    '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
    '#073B4C', '#7B68EE'
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-md">
          <p className="font-semibold">{payload[0].payload.fullName || label}</p>
          <p>{`Số lượng sản phẩm: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom active shape for pie chart
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="font-semibold">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333">
          {`${value} danh mục (${(percent * 100).toFixed(0)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 15}
          outerRadius={outerRadius + 20}
          fill={fill}
        />
      </g>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Tải lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      {/* Overview information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Tổng quan danh mục</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-500">Tổng số danh mục</p>
              <p className="text-3xl font-bold text-blue-700">{dashboardData.data.totalCategory}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-500">Tổng số sản phẩm</p>
              <p className="text-3xl font-bold text-green-700">{dashboardData.data.totalProduct}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Phân bố danh mục</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart >
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product distribution chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Phân bố sản phẩm theo danh mục</h2>
        {productDistributionData.length > 0 ? (
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              data={productDistributionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Số lượng sản phẩm" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">Không có dữ liệu phân bố sản phẩm</p>
        )}
      </div>

      {/* Percentage distribution chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Tỷ lệ sản phẩm theo danh mục</h2>
        {productDistributionData.length > 0 ? (
          <ResponsiveContainer width="100%" height={600}>
            <PieChart>
              <Pie
                data={productDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                nameKey="fullName"
                paddingAngle={5}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {productDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">Không có dữ liệu tỷ lệ sản phẩm</p>
        )}
      </div>

      {/* Empty categories */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Danh mục chưa có sản phẩm</h2>
        {emptyCategories && emptyCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emptyCategories.map(category => (
              <div key={category.id} className="bg-red-50 p-4 rounded-lg border border-red-100">
                <p className="text-red-600">{category.tendanhmuc}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-500 text-center py-4">Tất cả danh mục đều có sản phẩm</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;