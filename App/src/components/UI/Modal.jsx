import { useState, useEffect } from 'react';
import { X, ShoppingCart, AlertTriangle, Info, ChevronRight, Beaker } from 'lucide-react';

export default function ChemicalProductModal({ isOpen, onClose, product }) {
  const [quantity, setQuantity] = useState(1);
  
  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Vô hiệu cuộn trang khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Mặc định dữ liệu sản phẩm nếu không được truyền vào
  const defaultProduct = {
    id: "C1234",
    name: "Natri Hydroxit (NaOH)",
    description: "Natri Hydroxit, còn được gọi là xút ăn da, là một hợp chất vô cơ với công thức hóa học NaOH.",
    price: 450000,
    unit: "kg",
    purity: "99.9%",
    packaging: "Thùng 25kg",
    cas: "1310-73-2",
    hazardClass: "Độ ăn mòn cao (Cấp 8)",
    manufacturer: "Merck",
    storageReq: "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp",
    applications: [
      "Sản xuất xà phòng và chất tẩy rửa",
      "Xử lý nước",
      "Sản xuất giấy",
      "Tinh chế dầu mỏ",
      "Tổng hợp hóa chất hữu cơ"
    ],
    safetyInfo: "Gây bỏng da nghiêm trọng và tổn thương mắt. Sử dụng găng tay, kính bảo hộ, và thiết bị bảo hộ cá nhân khi thao tác.",
    stock: 50,
    image: "/api/placeholder/400/400"
  };
  
  const displayProduct = product || defaultProduct;
  
  if (!isOpen) return null;
  
  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} ${displayProduct.unit} ${displayProduct.name} vào giỏ hàng!`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4">
      <div className="relative flex w-full max-w-4xl max-h-screen bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Nút đóng */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 z-10"
        >
          <X size={24} />
        </button>
        
        {/* Phần bên trái - Hình ảnh và thông tin cơ bản */}
        <div className="w-1/3 bg-blue-50 p-6 flex flex-col">
          <div className="mb-4 bg-white rounded-lg p-2 flex items-center justify-center h-64">
            <img 
              src={displayProduct.image} 
              alt={displayProduct.name} 
              className="object-contain max-h-full"
            />
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Beaker size={20} className="text-blue-600" />
            <span className="text-sm text-blue-800 font-semibold">ID: {displayProduct.id}</span>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">{displayProduct.name}</h2>
            <p className="text-sm text-gray-500 italic">CAS: {displayProduct.cas}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div className="bg-white rounded p-2">
              <p className="font-semibold text-gray-700">Độ tinh khiết</p>
              <p>{displayProduct.purity}</p>
            </div>
            <div className="bg-white rounded p-2">
              <p className="font-semibold text-gray-700">Đóng gói</p>
              <p>{displayProduct.packaging}</p>
            </div>
            <div className="bg-white rounded p-2">
              <p className="font-semibold text-gray-700">Nhà sản xuất</p>
              <p>{displayProduct.manufacturer}</p>
            </div>
            <div className="bg-white rounded p-2 flex items-center">
              <div>
                <p className="font-semibold text-gray-700">Tồn kho</p>
                <p className={displayProduct.stock > 10 ? "text-green-600" : "text-orange-600"}>
                  {displayProduct.stock} {displayProduct.unit}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 flex items-start">
              <AlertTriangle className="text-yellow-500 mr-2 flex-shrink-0" size={20} />
              <p className="text-xs text-yellow-700">
                {displayProduct.hazardClass}
              </p>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-bold text-blue-800">
                {new Intl.NumberFormat('vi-VN').format(displayProduct.price)} VNĐ
                <span className="text-xs text-gray-500 font-normal">/{displayProduct.unit}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded">
                <button 
                  className="px-3 py-1 border-r text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                  className="w-12 text-center py-1 border-none focus:ring-0"
                />
                <button 
                  className="px-3 py-1 border-l text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium"
              >
                <ShoppingCart size={18} className="mr-2" />
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
        
        {/* Phần bên phải - Thông tin chi tiết */}
        <div className="w-2/3 p-6 overflow-y-auto max-h-screen pb-20">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-600">{displayProduct.description}</p>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ứng dụng</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {displayProduct.applications.map((app, index) => (
                <li key={index}>{app}</li>
              ))}
            </ul>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Thông tin an toàn</h3>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 flex">
              <AlertTriangle className="text-red-500 mr-2 flex-shrink-0" size={20} />
              <p className="text-sm text-red-700">{displayProduct.safetyInfo}</p>
            </div>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bảo quản</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 flex">
              <Info className="text-blue-500 mr-2 flex-shrink-0" size={20} />
              <p className="text-sm text-blue-700">{displayProduct.storageReq}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tài liệu kỹ thuật</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Phiếu an toàn hóa chất (MSDS)</p>
                    <p className="text-xs text-gray-500">PDF - 2.4 MB</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </a>
              <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Chứng chỉ phân tích (COA)</p>
                    <p className="text-xs text-gray-500">PDF - 1.2 MB</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}