import { useState } from 'react';
import { Star, Edit, Trash2, ShoppingCart, Package, BarChart2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';
export default function ProductManagement() {
  const [activeTab, setActiveTab] = useState('details');
  const { productId } = useParams();
  // Dữ liệu sản phẩm hiện tại từ API
  const productData = {
    da_ban: 85,
    danh_gia: 4,
    dv: "L",
    gia: "750000.00",
    id: 50,
    imageUrl: [],
    khoiluong: "13.650000",
    mota: "Axit nitric tinh khiết, độ tinh khiết cao, phù hợp cho phòng thí nghiệm",
    ngay_cap_nhat: "2023-12-14T17:00:00.000Z",
    ngay_tao: "2023-02-19T17:00:00.000Z",
    tendanhmuc: "Hóa chất công nghiệp",
    tensp: "Axit Nitric 65%",
    trangthai: "Còn Hàng"
  };

  // Mô phỏng sản phẩm cùng danh mục
  const relatedProducts = [
    {
      id: 51,
      tensp: "Axit Sulfuric 98%",
      gia: "680000.00",
      khoiluong: "10.000000",
      dv: "L",
      trangthai: "Còn Hàng",
      da_ban: 67,
      danh_gia: 4.5
    },
    {
      id: 52,
      tensp: "Axit Hydrocloric 37%",
      gia: "550000.00",
      khoiluong: "20.000000",
      dv: "L",
      trangthai: "Còn Hàng",
      da_ban: 92,
      danh_gia: 4.2
    },
    {
      id: 53,
      tensp: "Sodium Hydroxide 99%",
      gia: "450000.00",
      khoiluong: "25.000000",
      dv: "Kg",
      trangthai: "Sắp hết",
      da_ban: 105,
      danh_gia: 4.0
    }
  ];

  const formatCurrency = (amount) => {
    return parseInt(amount).toLocaleString('vi-VN') + ' VNĐ';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
        />
      );
    }
    return stars;
  };

  const renderPlaceholderImage = () => (
    <div className="bg-gray-200 rounded-lg flex items-center justify-center w-full h-64">
      <Package size={64} className="text-gray-400" />
      <p className="text-gray-500 ml-2">Chưa có hình ảnh</p>
    </div>
  );
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <ArrowLeft className="mr-3 text-gray-600" />
            <div>
              <div className="flex items-center text-sm text-gray-500">
                <span>Quản lý sản phẩm</span>
                <ChevronRight size={16} className="mx-1" />
                <span>{productData.tendanhmuc}</span>
                <ChevronRight size={16} className="mx-1" />
                <span className="font-medium text-gray-700">{productData.tensp}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{productData.tensp}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'details' 
                        ? 'border-b-2 border-blue-500 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Chi tiết sản phẩm
                  </button>
                  <button
                    onClick={() => setActiveTab('sales')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'sales' 
                        ? 'border-b-2 border-blue-500 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Thống kê bán hàng
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'details' ? (
                  <div>
                    <div className="mb-6">
                      {productData.imageUrl && productData.imageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {productData.imageUrl.map((url, idx) => (
                            <img 
                              key={idx} 
                              src={url} 
                              alt={productData.tensp} 
                              className="rounded-lg w-full h-64 object-cover"
                            />
                          ))}
                        </div>
                      ) : renderPlaceholderImage()}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin cơ bản</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Mã sản phẩm:</span>
                            <span className="font-medium">{productData.id}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Tên sản phẩm:</span>
                            <span className="font-medium">{productData.tensp}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Giá bán:</span>
                            <span className="font-medium text-green-600">{formatCurrency(productData.gia)}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Khối lượng:</span>
                            <span className="font-medium">{productData.khoiluong} {productData.dv}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Đánh giá:</span>
                            <div className="flex">
                              {renderStars(productData.danh_gia)}
                              <span className="ml-2 text-sm text-gray-500">({productData.danh_gia}/5)</span>
                            </div>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Đã bán:</span>
                            <span className="font-medium">{productData.da_ban} đơn vị</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Trạng thái:</span>
                            <span className={`font-medium ${productData.trangthai === 'Còn Hàng' ? 'text-green-600' : 'text-orange-500'}`}>
                              {productData.trangthai}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin chi tiết</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Danh mục:</span>
                            <span className="font-medium">{productData.tendanhmuc}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Ngày tạo:</span>
                            <span className="font-medium">{formatDate(productData.ngay_tao)}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Cập nhật lần cuối:</span>
                            <span className="font-medium">{formatDate(productData.ngay_cap_nhat)}</span>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-gray-500 mb-2">Mô tả sản phẩm:</h4>
                            <p className="text-gray-700">{productData.mota}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                        <Edit size={16} className="mr-2" />
                        Sửa thông tin
                      </button>
                      <button className="px-4 py-2 border border-red-300 rounded-md text-red-600 hover:bg-red-50 flex items-center">
                        <Trash2 size={16} className="mr-2" />
                        Xóa sản phẩm
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê bán hàng</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-blue-600">Đã bán</h4>
                            <ShoppingCart size={20} className="text-blue-500" />
                          </div>
                          <p className="text-2xl font-bold text-blue-700 mt-2">{productData.da_ban} {productData.dv}</p>
                          <p className="text-sm text-blue-600 mt-1">Tổng đã bán</p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-green-600">Doanh thu</h4>
                            <BarChart2 size={20} className="text-green-500" />
                          </div>
                          <p className="text-2xl font-bold text-green-700 mt-2">
                            {formatCurrency(productData.da_ban * parseFloat(productData.gia))}
                          </p>
                          <p className="text-sm text-green-600 mt-1">Tổng doanh thu</p>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-yellow-600">Đánh giá</h4>
                            <Star size={20} className="text-yellow-500" />
                          </div>
                          <div className="flex items-center mt-2">
                            <p className="text-2xl font-bold text-yellow-700">{productData.danh_gia}</p>
                            <div className="flex ml-2">
                              {renderStars(productData.danh_gia)}
                            </div>
                          </div>
                          <p className="text-sm text-yellow-600 mt-1">Đánh giá trung bình</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Here you would put charts/graphs for sales data */}
                    <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                      <p className="text-gray-500">Biểu đồ thống kê sẽ được hiển thị ở đây</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Sản phẩm cùng danh mục</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {relatedProducts.map(product => (
                  <div key={product.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-600">{product.tensp}</h4>
                        <p className="text-sm text-gray-500 mt-1">{product.khoiluong} {product.dv}</p>
                        <div className="flex items-center mt-1">
                          {renderStars(product.danh_gia)}
                          <span className="text-xs text-gray-500 ml-2">({product.danh_gia})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{formatCurrency(product.gia)}</p>
                        <p className="text-xs text-gray-500 mt-1">Đã bán: {product.da_ban}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Xem tất cả sản phẩm
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Thao tác nhanh</h3>
              </div>
              
              <div className="p-4 space-y-3">
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                  <Edit size={16} className="mr-2" />
                  Chỉnh sửa sản phẩm
                </button>
                
                <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center">
                  <ShoppingCart size={16} className="mr-2" />
                  Thêm vào đơn hàng
                </button>
                
                <button className="w-full py-2 px-4 border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex items-center justify-center">
                  <Trash2 size={16} className="mr-2" />
                  Xóa sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}