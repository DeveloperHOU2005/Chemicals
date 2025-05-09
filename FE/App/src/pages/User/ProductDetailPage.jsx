import { useState } from "react";
import { ChevronRight, Star, ShoppingCart, Heart, Share2, ArrowLeft, Check, AlertTriangle, Info, TruckIcon, FileText, Menu, X } from "lucide-react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Chi tiết sản phẩm mẫu
  const product = {
    id: 2,
    name: "Sodium Hydroxide (NaOH)",
    code: "CH-NaOH-99",
    aliases: ["Caustic Soda", "Lye", "Sodium Hydrate"],
    category: "Bazơ",
    purity: "99%",
    price: 650000,
    originalPrice: 720000,
    rating: 4.7,
    reviewCount: 28,
    image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg",
    additionalImages: [
      "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg",
      "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg",
      "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"
    ],
    stock: 124,
    packagingOptions: [
      { id: 1, name: "Chai 500g", price: 650000 },
      { id: 2, name: "Chai 1kg", price: 1200000 },
      { id: 3, name: "Thùng 25kg", price: 28500000 }
    ],
    hazardLevel: "Trung bình",
    description: "Sodium Hydroxide (NaOH) còn được gọi là Caustic Soda, là một bazơ mạnh được sử dụng rộng rãi trong nhiều ngành công nghiệp khác nhau. Sản phẩm của chúng tôi có độ tinh khiết 99%, đáp ứng các tiêu chuẩn khắt khe cho sử dụng trong phòng thí nghiệm và sản xuất.",
    longDescription: "Sodium Hydroxide (NaOH) còn được gọi là Caustic Soda, là một bazơ mạnh được sử dụng rộng rãi trong nhiều ngành công nghiệp khác nhau. Sản phẩm của chúng tôi có độ tinh khiết 99%, đáp ứng các tiêu chuẩn khắt khe cho sử dụng trong phòng thí nghiệm và sản xuất.\n\nĐặc tính vật lý:\n- Dạng: Hạt rắn màu trắng hoặc viên\n- Khối lượng phân tử: 40.00 g/mol\n- Điểm nóng chảy: 318°C\n- Điểm sôi: 1388°C\n- Tỷ trọng: 2.13 g/cm³\n\nỨng dụng:\n- Sản xuất giấy và bột giấy\n- Sản xuất xà phòng và chất tẩy rửa\n- Xử lý nước\n- Tinh chế dầu\n- Sản xuất hóa chất hữu cơ và vô cơ\n- Công nghiệp dệt may\n\nThông tin an toàn:\n- Gây ăn mòn da và mắt nghiêm trọng\n- Nên sử dụng thiết bị bảo hộ cá nhân khi tiếp xúc\n- Lưu trữ ở nơi khô ráo, tránh xa axit và kim loại nhôm\n\nChứng nhận chất lượng:\n- ISO 9001:2015\n- REACH Registered\n- Tuân thủ GHS/CLP",
    specifications: [
      { name: "Công thức hóa học", value: "NaOH" },
      { name: "Khối lượng phân tử", value: "40.00 g/mol" },
      { name: "Độ tinh khiết", value: "≥ 99.0%" },
      { name: "Nước", value: "≤ 0.5%" },
      { name: "Clorua (Cl)", value: "≤ 0.01%" },
      { name: "Sulfat (SO₄)", value: "≤ 0.01%" },
      { name: "Kim loại nặng (dưới dạng Pb)", value: "≤ 0.002%" },
      { name: "Carbonate (Na₂CO₃)", value: "≤ 0.4%" },
      { name: "Dạng", value: "Hạt hoặc viên rắn màu trắng" },
      { name: "Điểm nóng chảy", value: "318°C" },
      { name: "Điểm sôi", value: "1388°C" },
      { name: "Tỷ trọng", value: "2.13 g/cm³" }
    ],
    safetyInfo: [
      { type: "Cảnh báo", content: "Gây bỏng da nghiêm trọng và tổn thương mắt" },
      { type: "Bảo vệ", content: "Đeo găng tay, kính bảo hộ và quần áo bảo hộ" },
      { type: "Phản ứng", content: "Phản ứng mạnh với axit, kim loại, nước" },
      { type: "Lưu trữ", content: "Nơi khô ráo, tránh xa axit và kim loại nhôm" }
    ],
    relatedProducts: [
      { id: 1, name: "Axit Sulfuric H₂SO₄", price: 850000, image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" },
      { id: 3, name: "Potassium Hydroxide KOH", price: 720000, image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" },
      { id: 5, name: "Sodium Carbonate Na₂CO₃", price: 480000, image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" }
    ]
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Xử lý số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Render star ratings
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating} ({product.reviewCount} đánh giá)</span>
      </div>
    );
  };

  // Hiển thị màu theo mức độ nguy hiểm
  const getHazardColor = (level) => {
    switch (level) {
      case "Cao": return "bg-red-100 text-red-800";
      case "Trung bình": return "bg-yellow-100 text-yellow-800";
      case "Thấp": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Chọn tab hiển thị
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none text-gray-700">
            {showFullDescription ? (
              <div>
                {product.longDescription.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.includes(':')) {
                    const [title, content] = paragraph.split(':');
                    return (
                      <div key={idx} className="mb-4">
                        <h3 className="font-bold text-gray-800">{title}:</h3>
                        <div>
                          {content.split('\n- ').map((item, i) => {
                            return i === 0 ? (
                              <p key={i}>{item.trim()}</p>
                            ) : (
                              <div key={i} className="flex items-start mt-1">
                                <span className="inline-block w-3 h-3 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
                                <span>{item.trim()}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else {
                    return <p key={idx} className="mb-4">{paragraph}</p>;
                  }
                })}
                <button 
                  className="text-blue-600 hover:text-blue-800 font-medium mt-2"
                  onClick={() => setShowFullDescription(false)}
                >
                  Thu gọn
                </button>
              </div>
            ) : (
              <div>
                <p>{product.description}</p>
                <button 
                  className="text-blue-600 hover:text-blue-800 font-medium mt-2"
                  onClick={() => setShowFullDescription(true)}
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        );
      case "specifications":
        return (
          <div className="overflow-hidden">
            <table className="min-w-full">
              <tbody>
                {product.specifications.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">{spec.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "safety":
        return (
          <div className="space-y-4">
            {product.safetyInfo.map((info, index) => (
              <div key={index} className="flex items-start p-3 rounded-lg bg-gray-50">
                <AlertTriangle className={`mr-3 ${
                  info.type === "Cảnh báo" ? "text-red-500" : 
                  info.type === "Bảo vệ" ? "text-blue-500" : 
                  info.type === "Phản ứng" ? "text-yellow-500" : "text-green-500"
                }`} />
                <div>
                  <h4 className="font-bold text-gray-800">{info.type}</h4>
                  <p className="text-gray-700">{info.content}</p>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                <Info className="mr-2 text-blue-600" />
                Thông tin thêm về an toàn
              </h4>
              <p className="text-gray-700 mb-2">
                Vui lòng đọc kỹ Phiếu An Toàn Hóa Chất (MSDS) trước khi sử dụng sản phẩm này.
              </p>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FileText className="mr-1 w-4 h-4" />
                Tải xuống MSDS
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Breadcrumbs component
  const Breadcrumbs = () => (
    <div className="flex items-center text-sm text-gray-500 mb-4">
      <a href="#" className="hover:text-blue-600">Trang chủ</a>
      <ChevronRight className="w-3 h-3 mx-1" />
      <a href="#" className="hover:text-blue-600">Sản phẩm</a>
      <ChevronRight className="w-3 h-3 mx-1" />
      <a href="#" className="hover:text-blue-600">{product.category}</a>
      <ChevronRight className="w-3 h-3 mx-1" />
      <span className="text-gray-700 font-medium">{product.name}</span>
    </div>
  );

  // Thông tin đặt hàng
  const [selectedPackage, setSelectedPackage] = useState(product.packagingOptions[0]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">ChemTech</h1>
              <span className="ml-2 text-blue-200">| Cung cấp hóa chất chất lượng cao</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="hover:text-blue-200">Trang chủ</a>
              <a href="#" className="font-medium border-b-2 border-white">Sản phẩm</a>
              <a href="#" className="hover:text-blue-200">Giới thiệu</a>
              <a href="#" className="hover:text-blue-200">Liên hệ</a>
              <button className="flex items-center bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded">
                <ShoppingCart className="w-4 h-4 mr-1" />
                <span>Giỏ hàng (0)</span>
              </button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2">
              <div className="flex flex-col space-y-3">
                <a href="#" className="hover:text-blue-200">Trang chủ</a>
                <a href="#" className="font-medium">Sản phẩm</a>
                <a href="#" className="hover:text-blue-200">Giới thiệu</a>
                <a href="#" className="hover:text-blue-200">Liên hệ</a>
                <button className="flex items-center bg-blue-600 hover:bg-blue-800 p-2 rounded w-full justify-center">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  <span>Giỏ hàng (0)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs - chỉ hiển thị trên desktop */}
        <div className="hidden md:block">
          <Breadcrumbs />
        </div>

        {/* Nút quay lại trên mobile */}
        <div className="md:hidden mb-4">
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Quay lại</span>
          </button>
        </div>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-4">
              <div className="aspect-square rounded-lg overflow-hidden mb-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.additionalImages.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 hover:border-blue-500 cursor-pointer">
                    <img src={image} alt={`${product.name} - Ảnh ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHazardColor(product.hazardLevel)}`}>
                    {product.hazardLevel}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">Mã: {product.code}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-600">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-600">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h1>
              
              <div className="flex flex-wrap text-sm text-gray-500 mb-4">
                {product.aliases.map((alias, index) => (
                  <span key={index}>
                    {alias}{index < product.aliases.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>

              {renderRating(product.rating)}

              <div className="mt-6 mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-blue-700 mr-2">
                    {formatPrice(selectedPackage.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="text-green-600 flex items-center text-sm mt-1">
                  <Check className="w-4 h-4 mr-1" />
                  <span>Còn hàng ({product.stock} sản phẩm)</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Quy cách đóng gói:</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.packagingOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`px-3 py-2 border rounded-md text-sm text-center ${
                        selectedPackage.id === option.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedPackage(option)}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Số lượng:</label>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 rounded-l border border-gray-300 flex justify-center items-center text-gray-600 hover:bg-gray-100"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > 0 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    className="h-10 w-16 border-t border-b border-gray-300 text-center focus:outline-none"
                  />
                  <button
                    className="w-10 h-10 rounded-r border border-gray-300 flex justify-center items-center text-gray-600 hover:bg-gray-100"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 mb-6">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-md font-medium">
                  Mua ngay
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3 text-gray-700">
                  <TruckIcon className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">Thông tin giao hàng</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                    <span>Miễn phí vận chuyển cho đơn hàng trên 5 triệu đồng</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                    <span>Vận chuyển theo tiêu chuẩn an toàn hóa chất</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                    <span>Giao hàng trong vòng 24-48 giờ (trong nội thành)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base ${
                  activeTab === "description"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Mô tả
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base ${
                  activeTab === "specifications"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Thông số kỹ thuật
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base ${
                  activeTab === "safety"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("safety")}
              >
                An toàn
              </button>
            </div>

            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.relatedProducts.map((related) => (
              <div key={related.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-2">
                  <img src={related.image} alt={related.name} className="w-full h-32 object-cover rounded" />
                  <div className="p-2">
                    <h3 className="font-medium text-gray-800 mb-1 text-sm">{related.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-700">{formatPrice(related.price)}</span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ChemTech</h3>
              <p className="text-sm">Nhà cung cấp hóa chất hàng đầu Việt Nam với hơn 20 năm kinh nghiệm trong ngành</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-sm">
                <li>123 Đường Khoa học, Quận 1, TP.HCM</li>
                <li>Email: info@chemtech.com.vn</li>
                <li>Hotline: 0123.456.789</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Thông tin</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-white">Chính sách vận chuyển</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Đăng ký nhận tin</h3>
              <p className="text-sm mb-2">Nhận thông tin về sản phẩm mới và khuyến mãi</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email của bạn"
                  className="bg-gray-700 text-white px-3 py-2 rounded-l text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r text-sm">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
            © 2025 ChemTech. Tất cả các quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
}