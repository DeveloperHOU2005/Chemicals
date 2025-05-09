import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Filter, Search, ArrowUpDown, TrendingUp, Info, Package, AlertTriangle, Archive, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

// Dữ liệu mẫu
const generateSampleData = () => {
  const chemicals = [
    { id: 1, ten: 'Axit Sulfuric', maSP: 'AS001', loai: 'Axit', nhaCungCap: 'HoaChatViet', donGia: 120000, tonKho: 85, donVi: 'lít', hanSuDung: '2026-05-20', trangThai: 'Còn hàng' },
    { id: 2, ten: 'Natri Hidroxit', maSP: 'NH002', loai: 'Bazơ', nhaCungCap: 'ChemCorp', donGia: 95000, tonKho: 120, donVi: 'kg', hanSuDung: '2026-02-15', trangThai: 'Còn hàng' },
    { id: 3, ten: 'Metanol', maSP: 'MT003', loai: 'Dung môi', nhaCungCap: 'SolvChem', donGia: 75000, tonKho: 38, donVi: 'lít', hanSuDung: '2025-11-10', trangThai: 'Sắp hết' },
    { id: 4, ten: 'Etanol', maSP: 'ET004', loai: 'Dung môi', nhaCungCap: 'SolvChem', donGia: 82000, tonKho: 95, donVi: 'lít', hanSuDung: '2026-01-20', trangThai: 'Còn hàng' },
    { id: 5, ten: 'Amoniac', maSP: 'AM005', loai: 'Bazơ', nhaCungCap: 'HoaChatViet', donGia: 110000, tonKho: 15, donVi: 'lít', hanSuDung: '2025-09-05', trangThai: 'Sắp hết' },
    { id: 6, ten: 'Axeton', maSP: 'AX006', loai: 'Dung môi', nhaCungCap: 'ChemCorp', donGia: 68000, tonKho: 142, donVi: 'lít', hanSuDung: '2026-03-25', trangThai: 'Còn hàng' },
    { id: 7, ten: 'Cloroform', maSP: 'CF007', loai: 'Dung môi', nhaCungCap: 'SolvChem', donGia: 145000, tonKho: 52, donVi: 'lít', hanSuDung: '2025-12-20', trangThai: 'Còn hàng' },
    { id: 8, ten: 'Kali Permanganat', maSP: 'KP008', loai: 'Muối', nhaCungCap: 'ChemCorp', donGia: 210000, tonKho: 8, donVi: 'kg', hanSuDung: '2025-08-15', trangThai: 'Cần nhập thêm' },
    { id: 9, ten: 'Axit Nitric', maSP: 'AN009', loai: 'Axit', nhaCungCap: 'HoaChatViet', donGia: 135000, tonKho: 68, donVi: 'lít', hanSuDung: '2026-04-10', trangThai: 'Còn hàng' },
    { id: 10, ten: 'Glycerin', maSP: 'GL010', loai: 'Hữu cơ', nhaCungCap: 'BioChemicals', donGia: 90000, tonKho: 110, donVi: 'lít', hanSuDung: '2026-06-30', trangThai: 'Còn hàng' },
  ];

  // Tạo dữ liệu giao dịch mẫu
  const transactions = [];
  for (let i = 0; i < 50; i++) {
    const chemical = chemicals[Math.floor(Math.random() * chemicals.length)];
    transactions.push({
      id: i + 1,
      productId: chemical.id,
      productName: chemical.ten,
      type: Math.random() > 0.3 ? 'Xuất kho' : 'Nhập kho',
      quantity: Math.floor(Math.random() * 50) + 1,
      date: new Date(2025, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      staff: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'][Math.floor(Math.random() * 4)],
      note: Math.random() > 0.5 ? 'Giao dịch thường xuyên' : 'Đơn hàng đặc biệt'
    });
  }

  // Tạo dữ liệu so sánh tồn kho theo tháng
  const stockHistoryData = [];
  for (let i = 1; i <= 6; i++) {
    stockHistoryData.push({
      month: `Tháng ${i}`,
      'Tồn kho đầu': Math.floor(Math.random() * 2000) + 1000,
      'Nhập kho': Math.floor(Math.random() * 1000) + 500,
      'Xuất kho': Math.floor(Math.random() * 800) + 300,
      'Tồn kho cuối': Math.floor(Math.random() * 2200) + 1200,
    });
  }

  // Tính toán số lượng theo loại hóa chất
  const categoryData = [];
  const categories = [...new Set(chemicals.map(chem => chem.loai))];
  categories.forEach(category => {
    const chemicalsInCategory = chemicals.filter(chem => chem.loai === category);
    const totalStock = chemicalsInCategory.reduce((sum, chem) => sum + chem.tonKho, 0);
    categoryData.push({
      name: category,
      value: totalStock,
    });
  });

  // Tính toán số lượng theo nhà cung cấp
  const supplierData = [];
  const suppliers = [...new Set(chemicals.map(chem => chem.nhaCungCap))];
  suppliers.forEach(supplier => {
    const chemicalsFromSupplier = chemicals.filter(chem => chem.nhaCungCap === supplier);
    const totalStock = chemicalsFromSupplier.reduce((sum, chem) => sum + chem.tonKho, 0);
    supplierData.push({
      name: supplier,
      value: totalStock,
    });
  });

  return { chemicals, transactions, stockHistoryData, categoryData, supplierData };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function ChemicalProductManagement() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({ chemicals: [], transactions: [], stockHistoryData: [], categoryData: [], supplierData: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [expandedTransactions, setExpandedTransactions] = useState({});

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setData(generateSampleData());
  }, []);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const toggleTransactionDetails = (productId) => {
    setExpandedTransactions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const filteredChemicals = data.chemicals.filter(chem => {
    const matchesSearch = chem.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chem.maSP.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chem.nhaCungCap.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || chem.loai === categoryFilter;
    const matchesSupplier = supplierFilter === 'all' || chem.nhaCungCap === supplierFilter;
    
    return matchesSearch && matchesCategory && matchesSupplier;
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

  const categories = [...new Set(data.chemicals.map(chem => chem.loai))];
  const suppliers = [...new Set(data.chemicals.map(chem => chem.nhaCungCap))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Còn hàng': return 'bg-green-100 text-green-800';
      case 'Sắp hết': return 'bg-yellow-100 text-yellow-800';
      case 'Cần nhập thêm': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionsForProduct = (productId) => {
    return data.transactions.filter(trans => trans.productId === productId);
  };

  const totalStock = data.chemicals.reduce((sum, chem) => sum + chem.tonKho, 0);
  const lowStockCount = data.chemicals.filter(chem => chem.trangThai === 'Sắp hết' || chem.trangThai === 'Cần nhập thêm').length;
  const totalValue = data.chemicals.reduce((sum, chem) => sum + (chem.donGia * chem.tonKho), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HóaChất Pro - Quản Lý Sản Phẩm</h1>
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
            Danh sách sản phẩm
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'stock' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('stock')}
          >
            Quản lý tồn kho
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'history' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('history')}
          >
            Lịch sử giao dịch
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'reports' ? 'border-b-2 border-blue-700 text-blue-700 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reports')}
          >
            Báo cáo phân tích
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="bg-transparent focus:outline-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Tất cả loại hóa chất</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="bg-transparent focus:outline-none"
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
              >
                <option value="all">Tất cả nhà cung cấp</option>
                {suppliers.map((supplier, index) => (
                  <option key={index} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center bg-white border rounded px-3 py-2">
            <Search size={16} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
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
                  <h3 className="text-gray-500 font-medium">Tổng số sản phẩm</h3>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Package size={20} className="text-blue-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{data.chemicals.length}</div>
                <div className="text-gray-500 text-sm mt-2">{categories.length} loại hóa chất</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-medium">Tổng tồn kho</h3>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Archive size={20} className="text-green-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{totalStock} đơn vị</div>
                <div className="text-green-500 text-sm mt-2">Giá trị: {formatCurrency(totalValue)}</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-medium">Cần nhập thêm</h3>
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertTriangle size={20} className="text-red-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{lowStockCount} sản phẩm</div>
                <div className="text-red-500 text-sm mt-2">Cần bổ sung ngay</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Phân loại hóa chất</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} đơn vị`, 'Số lượng']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Tồn kho theo tháng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.stockHistoryData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Tồn kho đầu" fill="#8884d8" />
                    <Bar dataKey="Nhập kho" fill="#82ca9d" />
                    <Bar dataKey="Xuất kho" fill="#ffc658" />
                    <Bar dataKey="Tồn kho cuối" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Low Stock Warning */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-medium mb-4">Sản phẩm cần bổ sung</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã SP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loại
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nhà cung cấp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tồn kho
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.chemicals
                      .filter(chem => chem.trangThai === 'Sắp hết' || chem.trangThai === 'Cần nhập thêm')
                      .map((chem, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chem.maSP}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chem.ten}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.loai}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.nhaCungCap}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.tonKho} {chem.donVi}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(chem.trangThai)}`}>
                              {chem.trangThai}
                            </span>
                          </td>
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
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Danh sách sản phẩm</h3>
              <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                <Plus size={16} className="mr-2" />
                Thêm sản phẩm mới
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('maSP')}>
                      <div className="flex items-center">
                        Mã SP
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('ten')}>
                      <div className="flex items-center">
                        Tên sản phẩm
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('loai')}>
                      <div className="flex items-center">
                        Loại
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('nhaCungCap')}>
                      <div className="flex items-center">
                        Nhà cung cấp
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('donGia')}>
                      <div className="flex items-center">
                        Đơn giá
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('tonKho')}>
                      <div className="flex items-center">
                        Tồn kho
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('hanSuDung')}>
                      <div className="flex items-center">
                        Hạn sử dụng
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
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredChemicals.map((chem, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chem.maSP}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chem.ten}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.loai}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.nhaCungCap}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(chem.donGia)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.tonKho} {chem.donVi}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.hanSuDung}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(chem.trangThai)}`}>
                          {chem.trangThai}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800" onClick={() => { setCurrentProduct(chem); setShowModal(true); }}>
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
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

            {activeTab === 'stock' && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Quản lý tồn kho</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mã SP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên sản phẩm
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tồn kho
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Đơn vị
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.chemicals.map((chem, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chem.maSP}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chem.ten}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.tonKho}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chem.donVi}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(chem.trangThai)}`}>
                              {chem.trangThai}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Lịch sử giao dịch</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại giao dịch
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sản phẩm
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số lượng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nhân viên
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ghi chú
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.transactions.map((trans, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trans.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.productName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.staff}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Báo cáo phân tích</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium mb-2">Phân tích theo loại hóa chất</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={data.categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} đơn vị`, 'Số lượng']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2">Phân tích theo nhà cung cấp</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={data.supplierData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#82ca9d"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.supplierData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} đơn vị`, 'Số lượng']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }