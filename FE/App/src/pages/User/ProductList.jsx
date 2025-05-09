import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, Filter, ChevronDown, Star } from 'lucide-react';

// Dữ liệu mẫu danh mục
const categories = [
  { id: 1, name: 'Ô tô', icon: '🚗' },
  { id: 2, name: 'Xe máy', icon: '🛵' },
  { id: 3, name: 'Xe tải', icon: '🚚' },
  { id: 4, name: 'Xe đạp', icon: '🚲' },
  { id: 5, name: 'Xe điện', icon: '🔋' },
];

// Dữ liệu mẫu sản phẩm
const productData = [
  {
    id: 1,
    name: 'Toyota Corolla Cross',
    category: 1,
    price: 800000,
    priceUnit: 'ngày',
    image: '/api/placeholder/400/300',
    rating: 4.8,
    reviewCount: 124,
    available: true
  },
  {
    id: 2,
    name: 'Honda SH 150i',
    category: 2,
    price: 250000,
    priceUnit: 'ngày',
    image: '/api/placeholder/400/300',
    rating: 4.6,
    reviewCount: 86,
    available: true
  },
  {
    id: 3,
    name: 'Hyundai Porter 150',
    category: 3,
    price: 950000,
    priceUnit: 'ngày',
    image: '/api/placeholder/400/300',
    rating: 4.5,
    reviewCount: 42,
    available: false
  },
  {
    id: 4,
    name: 'Honda Air Blade',
    category: 2,
    price: 200000,
    priceUnit: 'ngày',
    image: '/api/placeholder/400/300',
    rating: 4.7,
    reviewCount: 76,
    available: true
  },
  {
    id: 5,
    name: 'VinFast VF8',
    category: 5,
    price: 1200000,
    priceUnit: 'ngày',
    image: '/api/placeholder/400/300',
    rating: 4.9,
    reviewCount: 38,
    available: true
  },
  {
    id: 6,
    name: 'Ford Ranger',
    category: 1,
    price: 850000,
    priceUnit: 'ngày',
    image: '/api/placeholder/400/300',
    rating: 4.6,
    reviewCount: 94,
    available: true
  },
];

// Format số tiền VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

// Component chính
export default function ProductPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(productData);
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc sản phẩm theo danh mục và tìm kiếm
  useEffect(() => {
    let filtered = productData;
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setProducts(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Danh mục phương tiện</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2">
            <button 
              className={`flex flex-col items-center justify-center min-w-20 p-3 rounded-lg transition ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
              onClick={() => setSelectedCategory(null)}
            >
              <span className="text-2xl mb-1">🚀</span>
              <span className="font-medium text-sm">Tất cả</span>
            </button>
            
            {categories.map(category => (
              <button 
                key={category.id}
                className={`flex flex-col items-center justify-center min-w-20 p-3 rounded-lg transition ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="font-medium text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Filter and sorting */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <button 
              className="flex items-center bg-white py-2 px-4 rounded-lg shadow-sm"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={18} className="mr-2" />
              <span>Bộ lọc</span>
              <ChevronDown size={18} className="ml-2" />
            </button>
            
            {filterOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
                <h3 className="font-medium mb-2">Giá thuê</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Dưới 200.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>200.000đ - 500.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>500.000đ - 1.000.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Trên 1.000.000đ</span>
                  </label>
                </div>
                
                <h3 className="font-medium mb-2 mt-4">Tình trạng</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Có sẵn</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Đang khuyến mãi</span>
                  </label>
                </div>
                
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg">
                  Áp dụng
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Sắp xếp:</span>
            <select className="bg-white py-2 px-4 rounded-lg shadow-sm focus:outline-none">
              <option>Phổ biến nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Đánh giá cao nhất</option>
            </select>
          </div>
        </div>
        
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                  {!product.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white py-1 px-4 rounded-full font-medium">
                        Đã đặt
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center text-sm mb-1">
                    <span className="text-blue-600 font-medium">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                    <div className="flex items-center ml-auto">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700">{product.rating}</span>
                      <span className="ml-1 text-gray-500">({product.reviewCount})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-blue-600">{formatCurrency(product.price)}</span>
                      <span className="text-gray-500">/{product.priceUnit}</span>
                    </div>
                    
                    <button 
                      className={`py-2 px-4 rounded-lg font-medium ${
                        product.available 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`} 
                      disabled={!product.available}
                    >
                      {product.available ? 'Đặt ngay' : 'Hết xe'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <div className="text-gray-500 text-lg">
                Không tìm thấy phương tiện phù hợp.
              </div>
              <button 
                className="mt-4 text-blue-600 font-medium"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}