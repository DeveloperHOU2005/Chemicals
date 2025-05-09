import { useState, useEffect } from 'react';
import { categoryService } from '../../../services/categoryService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CategoryStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [popularCategories, setPopularCategories] = useState([]);
  const [emptyCategories, setEmptyCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllStatistics();
  }, []);

  const fetchAllStatistics = async () => {
    setLoading(true);
    try {
      const [statsData, popularData, emptyData] = await Promise.all([
        categoryService.getStatistics(),
        categoryService.getPopularCategories(),
        categoryService.getEmptyCategories()
      ]);
      
      setStatistics(statsData);
      setPopularCategories(popularData || []);
      setEmptyCategories(emptyData || []);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Đang tải dữ liệu thống kê...</p>
      </div>
    );
  }

  // Transform data for chart
  const chartData = popularCategories.slice(0, 10).map(cat => ({
    name: cat.name,
    productCount: cat.productCount
  }));

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Tổng số danh mục</h3>
          <p className="text-3xl font-bold text-blue-600">{statistics?.totalCategories || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Danh mục hoạt động</h3>
          <p className="text-3xl font-bold text-green-600">{statistics?.activeCategories || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Danh mục không sản phẩm</h3>
          <p className="text-3xl font-bold text-orange-600">{statistics?.emptyCategories || 0}</p>
        </div>
      </div>

      {/* Popular Categories Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Danh mục phổ biến</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="productCount" name="Số sản phẩm" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Empty Categories List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Danh mục không có sản phẩm</h3>
        {emptyCategories.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Không có danh mục nào không có sản phẩm</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Tên danh mục</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {emptyCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{category.id}</td>
                    <td className="py-3 px-4 text-gray-700 font-medium">{category.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.active ? 'Hoạt động' : 'Vô hiệu'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}