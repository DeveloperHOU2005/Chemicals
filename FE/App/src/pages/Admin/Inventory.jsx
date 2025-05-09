import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, BarChart2, FileText, Package, TrendingUp, LogOut, Menu, X } from 'lucide-react';

// Dữ liệu mẫu cho ứng dụng
const initialProducts = [
  { id: 1, code: 'HC001', name: 'Axit Sulfuric', category: 'Axit', quantity: 150, unit: 'Lít', price: 250000, lastUpdate: '10/04/2025', status: 'Còn hàng' },
  { id: 2, code: 'HC002', name: 'Natri Hidroxit', category: 'Bazơ', quantity: 200, unit: 'Kg', price: 180000, lastUpdate: '08/04/2025', status: 'Còn hàng' },
  { id: 3, code: 'HC003', name: 'Etanol', category: 'Dung môi', quantity: 80, unit: 'Lít', price: 320000, lastUpdate: '12/04/2025', status: 'Sắp hết' },
  { id: 4, code: 'HC004', name: 'Metanol', category: 'Dung môi', quantity: 30, unit: 'Lít', price: 290000, lastUpdate: '09/04/2025', status: 'Sắp hết' },
  { id: 5, code: 'HC005', name: 'Axit Clohydric', category: 'Axit', quantity: 120, unit: 'Lít', price: 220000, lastUpdate: '11/04/2025', status: 'Còn hàng' },
];

const transactions = [
  { id: 1, date: '12/04/2025', type: 'Nhập', productCode: 'HC001', quantity: 50, staff: 'Nguyễn Văn A' },
  { id: 2, date: '10/04/2025', type: 'Xuất', productCode: 'HC003', quantity: 20, staff: 'Trần Thị B' },
  { id: 3, date: '08/04/2025', type: 'Nhập', productCode: 'HC002', quantity: 100, staff: 'Nguyễn Văn A' },
  { id: 4, date: '07/04/2025', type: 'Xuất', productCode: 'HC004', quantity: 15, staff: 'Lê Văn C' },
];

export default function ChemicalInventoryManagement() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add or edit product
  const handleSaveProduct = (product) => {
    if (product.id) {
      // Edit existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: products.length + 1,
        lastUpdate: new Date().toLocaleDateString('vi-VN'),
        status: product.quantity > 50 ? 'Còn hàng' : 'Sắp hết'
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Count products by category
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Calculate total inventory value
  const totalInventoryValue = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  return (
    <div className="flex h-screen bg-gray-100 ml-64">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0 mt-16 md:mt-0">
        {/* Content for each tab */}
        <div className="p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab 
              products={products} 
              categoryCounts={categoryCounts} 
              totalValue={totalInventoryValue}
              transactions={transactions}
            />
          )}
          
          {activeTab === 'products' && (
            <ProductsTab 
              products={filteredProducts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAddClick={() => {
                setCurrentProduct(null);
                setIsModalOpen(true);
              }}
              onEditClick={(product) => {
                setCurrentProduct(product);
                setIsModalOpen(true);
              }}
              onDeleteClick={handleDeleteProduct}
            />
          )}
          
          {activeTab === 'transactions' && (
            <TransactionsTab transactions={transactions} products={products} />
          )}
          
          {activeTab === 'reports' && (
            <ReportsTab products={products} transactions={transactions} />
          )}
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal 
          product={currentProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}

// Sidebar Link Component
function SidebarLink({ icon, text, active, onClick }) {
  return (
    <button 
      className={`flex items-center w-full p-3 mb-2 rounded-lg text-left ${
        active ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

// Dashboard Tab Component
function DashboardTab({ products, categoryCounts, totalValue, transactions }) {
  const lowStockItems = products.filter(p => p.quantity <= 50).length;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tổng Quan Kho Hàng</h1>
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Tổng Sản Phẩm" 
          value={products.length} 
          bgColor="bg-blue-500" 
        />
        <DashboardCard 
          title="Sản Phẩm Sắp Hết" 
          value={lowStockItems} 
          bgColor="bg-red-500" 
        />
        <DashboardCard 
          title="Loại Sản Phẩm" 
          value={Object.keys(categoryCounts).length} 
          bgColor="bg-green-500" 
        />
        <DashboardCard 
          title="Giá Trị Kho" 
          value={`${(totalValue / 1000000).toFixed(2)} Tr`} 
          bgColor="bg-purple-500" 
        />
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Hoạt Động Gần Đây</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Ngày</th>
                <th className="p-3 text-left">Loại</th>
                <th className="p-3 text-left">Mã SP</th>
                <th className="p-3 text-left">Số Lượng</th>
                <th className="p-3 text-left">Nhân Viên</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      transaction.type === 'Nhập' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="p-3">{transaction.productCode}</td>
                  <td className="p-3">{transaction.quantity}</td>
                  <td className="p-3">{transaction.staff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Low Stock Products */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Sản Phẩm Sắp Hết</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Mã SP</th>
                <th className="p-3 text-left">Tên Sản Phẩm</th>
                <th className="p-3 text-left">Loại</th>
                <th className="p-3 text-left">Số Lượng</th>
                <th className="p-3 text-left">Đơn Vị</th>
              </tr>
            </thead>
            <tbody>
              {products.filter(p => p.quantity <= 50).map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-3">{product.code}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3 text-red-600 font-medium">{product.quantity}</td>
                  <td className="p-3">{product.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ title, value, bgColor }) {
  return (
    <div className={`${bgColor} text-white p-6 rounded-lg shadow`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

// Products Tab Component
function ProductsTab({ products, searchTerm, setSearchTerm, onAddClick, onEditClick, onDeleteClick }) {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Quản Lý Sản Phẩm</h1>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            onClick={onAddClick}
          >
            <Plus size={20} className="mr-2" />
            Thêm Sản Phẩm
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Mã SP</th>
                <th className="p-4 text-left">Tên Sản Phẩm</th>
                <th className="p-4 text-left">Loại</th>
                <th className="p-4 text-left">Số Lượng</th>
                <th className="p-4 text-left">Đơn Vị</th>
                <th className="p-4 text-left">Đơn Giá</th>
                <th className="p-4 text-left">Trạng Thái</th>
                <th className="p-4 text-left">Cập Nhật</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{product.code}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.quantity}</td>
                  <td className="p-4">{product.unit}</td>
                  <td className="p-4">{product.price.toLocaleString('vi-VN')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      product.status === 'Còn hàng' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">{product.lastUpdate}</td>
                  <td className="p-4">
                    <div className="flex justify-center space-x-2">
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => onEditClick(product)}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => onDeleteClick(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Product Modal Component
function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: product?.id || null,
    code: product?.code || '',
    name: product?.name || '',
    category: product?.category || '',
    quantity: product?.quantity || 0,
    unit: product?.unit || 'Lít',
    price: product?.price || 0,
    status: product?.status || 'Còn hàng'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'price' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            {product ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã Sản Phẩm</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên Sản Phẩm</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Chọn loại</option>
                <option value="Axit">Axit</option>
                <option value="Bazơ">Bazơ</option>
                <option value="Dung môi">Dung môi</option>
                <option value="Chất chỉ thị">Chất chỉ thị</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số Lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đơn Vị</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="Lít">Lít</option>
                  <option value="Kg">Kg</option>
                  <option value="Chai">Chai</option>
                  <option value="Thùng">Thùng</option>
                  <option value="Hộp">Hộp</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Đơn Giá</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {product ? 'Cập Nhật' : 'Thêm Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Transactions Tab Component
function TransactionsTab({ transactions, products }) {
    // Dùng state cục bộ để quản lý form tạo giao dịch mới
    const [transactionType, setTransactionType] = useState('Nhập');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [staff, setStaff] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Ở đây bạn có thể xử lý thêm giao dịch vào hệ thống (update state, gọi API,...)
      // Ví dụ hiển thị console log:
      console.log({
        id: transactions.length + 1,
        date: new Date().toLocaleDateString('vi-VN'),
        type: transactionType,
        productCode: selectedProduct,
        quantity: quantity,
        staff: staff,
      });
      // Sau đó reset form:
      setSelectedProduct('');
      setQuantity(0);
      setStaff('');
    };
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Quản Lý Nhập/Xuất Kho</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Danh sách giao dịch */}
          <div className="w-full md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Lịch Sử Giao Dịch</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <Plus size={20} className="mr-2" />
                  Thêm Giao Dịch
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Ngày</th>
                      <th className="p-3 text-left">Loại</th>
                      <th className="p-3 text-left">Mã SP</th>
                      <th className="p-3 text-left">Số Lượng</th>
                      <th className="p-3 text-left">Nhân Viên</th>
                      <th className="p-3 text-center">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{transaction.id}</td>
                        <td className="p-3">{transaction.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            transaction.type === 'Nhập' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="p-3">{transaction.productCode}</td>
                        <td className="p-3">{transaction.quantity}</td>
                        <td className="p-3">{transaction.staff}</td>
                        <td className="p-3">
                          <div className="flex justify-center space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Form tạo giao dịch */}
          <div className="w-full md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Tạo Giao Dịch Mới</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Chọn loại giao dịch */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại Giao Dịch</label>
                  <div className="flex">
                    <button 
                      type="button" 
                      onClick={() => setTransactionType('Nhập')}
                      className={`flex-1 py-2 ${transactionType === 'Nhập' ? 'bg-green-500 text-white' : 'bg-gray-200'} rounded-l-lg`}
                    >
                      Nhập Kho
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setTransactionType('Xuất')}
                      className={`flex-1 py-2 ${transactionType === 'Xuất' ? 'bg-green-500 text-white' : 'bg-gray-200'} rounded-r-lg`}
                    >
                      Xuất Kho
                    </button>
                  </div>
                </div>
                
                {/* Chọn sản phẩm */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sản Phẩm</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map(product => (
                      <option key={product.id} value={product.code}>
                        {product.code} - {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Số lượng */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số Lượng</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="0"
                    required
                  />
                </div>
                
                {/* Nhân viên */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhân Viên</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    placeholder="Tên nhân viên..."
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo Giao Dịch
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Reports Tab Component (Placeholder)
  function ReportsTab({ products, transactions }) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Báo Cáo</h1>
        <p className="text-gray-700">Tại đây bạn có thể xem các báo cáo chi tiết về kho hàng và giao dịch.</p>
        {/* Bạn có thể tùy biến thêm component báo cáo theo nhu cầu */}
      </div>
    );
  }