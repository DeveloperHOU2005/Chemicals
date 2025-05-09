import { useEffect, useState } from "react";
import { Image , Filter, ChevronDown, Star, ShoppingCart, Menu, X } from "lucide-react";

import categoryApi from "../../services/categoryApi.js";
import productApi from '../../services/productApi';
import productStatus from '../../types/productStatus.js'
// Component chính
export default function ChemicalCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("Phổ biến");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const [chemicalProducts, setChemicalProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => { 
      const category = await categoryApi.getPopularCategories();
      const data = (category.data);
      setCategories(data);

      const product = await productApi.getRecommendations();
      setChemicalProducts(product.products)

    }
    loadData();
  }, [categories, chemicalProducts]);
  // Lọc sản phẩm dựa trên tìm kiếm và danh mục
  const filteredProducts = chemicalProducts.filter(product => {
    const matchesSearch = product.tensp.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Render star ratings
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  // Hiển thị màu theo mức độ nguy hiểm
  const getHazardColor = (level) => {
    const status = productStatus;
    return status[level] || "bg-gray-200 text-gray-700";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar for filters on desktop */}
          <div className="hidden md:block w-64 pr-8">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Danh mục</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`block w-full text-left px-2 py-1.5 rounded ${
                        selectedCategory === category.tendanhmuc
                          ? "bg-teal-100 text-teal-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.tendanhmuc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Thông tin</h3>
              <div className="text-sm text-gray-600 space-y-3">
                <p>Đảm bảo chất lượng cao nhất với chứng nhận ISO 9001</p>
                <p>Vận chuyển an toàn theo tiêu chuẩn quốc tế</p>
                <p>Tư vấn kỹ thuật miễn phí</p>
                <p>Hỗ trợ đặt hàng: <span className="text-teal-600 font-medium">0123.456.789</span></p>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          <div className="md:hidden mb-4">
            <div className="flex justify-between mb-4">
              <button 
                className="bg-white px-4 py-2 rounded shadow-md flex items-center text-gray-700"
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                <span>Danh mục: {selectedCategory}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              
              <select 
                className="bg-white px-4 py-2 rounded shadow-md text-gray-700"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Phổ biến</option>
                <option>Giá: Thấp-Cao</option>
                <option>Giá: Cao-Thấp</option>
                <option>Đánh giá</option>
              </select>
            </div>

            {mobileCategoryOpen && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`block w-full text-left px-2 py-1.5 rounded ${
                          selectedCategory === category
                            ? "bg-teal-100 text-teal-700 font-medium"
                            : "text-gray-600"
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setMobileCategoryOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedCategory === "Tất cả" ? "Tất cả sản phẩm" : selectedCategory}
                <span className="text-gray-500 text-sm font-normal ml-2">({filteredProducts.length} sản phẩm)</span>
              </h2>
              
              <div className="hidden md:block">
                <select 
                  className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200 text-gray-700"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Phổ biến</option>
                  <option>Giá: Thấp-Cao</option>
                  <option>Giá: Cao-Thấp</option>
                  <option>Đánh giá</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      {product.imageUrl.length  > 0 ? 
                      <img src={product.imageUrl[0]} alt={product.tensp} className="w-full h-48 object-cover" /> :
                      <Image className="w-full h-48 object-cover text-gray-400"/>}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHazardColor(product.trangthai)}`}>
                          {product.trangthai}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-teal-600 font-medium mb-1">{product.tendanhmuc}</div>
                      <h3 className="font-bold text-gray-800 mb-1">{product.tensp}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Đã bán: {product.da_ban}</span>
                        {renderRating(product.danh_gia)}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-lg text-teal-700">{formatPrice(product.gia)}</span>
                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Thêm
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-lg text-gray-600">Không tìm thấy sản phẩm phù hợp.</p>
                <button 
                  className="mt-4 text-teal-600 hover:text-teal-800"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Tất cả");
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}