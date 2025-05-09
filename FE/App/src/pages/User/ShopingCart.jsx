import { useState } from 'react';
import { Trash2, ArrowLeft, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Axit Sulfuric (H2SO4)',
      concentration: '98%',
      price: 850000,
      quantity: 2,
      image: '/api/placeholder/100/100',
      hazardLevel: 'Cao',
      safetyInfo: 'Gây bỏng nặng, sử dụng găng tay bảo hộ'
    },
    {
      id: 2,
      name: 'Natri Hidroxit (NaOH)',
      concentration: '99%',
      price: 450000,
      quantity: 1,
      image: '/api/placeholder/100/100',
      hazardLevel: 'Trung bình',
      safetyInfo: 'Gây kích ứng da, tránh tiếp xúc trực tiếp'
    },
    {
      id: 3,
      name: 'Etanol (C2H5OH)',
      concentration: '96%',
      price: 320000,
      quantity: 3,
      image: '/api/placeholder/100/100',
      hazardLevel: 'Thấp',
      safetyInfo: 'Dễ cháy, tránh nguồn lửa'
    }
  ]);

  const [expandedSafety, setExpandedSafety] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  const toggleSafetyInfo = (id) => {
    setExpandedSafety(expandedSafety === id ? null : id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = 50000;
  const total = subtotal - discount + shipping;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Giỏ Hàng</h2>
        {showWarning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 flex items-start">
            <AlertTriangle className="text-yellow-500 mr-3 flex-shrink-0" />
            <div className="flex-grow">
              <h3 className="font-bold text-yellow-700">Lưu ý an toàn</h3>
              <p className="text-yellow-700">
                Hóa chất có thể gây nguy hiểm nếu sử dụng không đúng cách. Vui lòng đọc hướng dẫn an toàn trước khi sử dụng.
              </p>
            </div>
            <button 
              onClick={() => setShowWarning(false)}
              className="text-yellow-500 hover:text-yellow-700 ml-2"
            >
              &times;
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="sm:ml-6 flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">Nồng độ: {item.concentration}</p>
                              <div className="mt-2 flex items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.hazardLevel === 'Cao' 
                                    ? 'bg-red-100 text-red-800'
                                    : item.hazardLevel === 'Trung bình'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  Mức độ nguy hiểm: {item.hazardLevel}
                                </span>
                                <button 
                                  onClick={() => toggleSafetyInfo(item.id)}
                                  className="ml-2 text-teal-600 hover:text-teal-800 text-sm flex items-center"
                                >
                                  {expandedSafety === item.id ? (
                                    <>
                                      <ChevronUp size={16} className="mr-1" />
                                      Ẩn thông tin
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown size={16} className="mr-1" />
                                      Xem thông tin an toàn
                                    </>
                                  )}
                                </button>
                              </div>
                              {expandedSafety === item.id && (
                                <div className="mt-2 p-3 bg-teal-50 rounded-md text-sm">
                                  <p className="text-gray-700">{item.safetyInfo}</p>
                                </div>
                              )}
                            </div>
                            <div className="mt-4 sm:mt-0">
                              <p className="text-lg font-medium text-gray-900">{formatCurrency(item.price)}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              >
                                -
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 flex items-center"
                            >
                              <Trash2 size={18} className="mr-1" />
                              <span>Xóa</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="p-6 border-t border-gray-200">
                  <button className="flex items-center text-teal-600 hover:text-teal-800">
                    <ArrowLeft size={18} className="mr-2" />
                    <span>Tiếp tục mua sắm</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-lg text-gray-600">Giỏ hàng của bạn đang trống</p>
                <button className="mt-4 flex items-center mx-auto text-teal-600 hover:text-teal-800">
                  <ArrowLeft size={18} className="mr-2" />
                  <span>Quay lại mua sắm</span>
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-medium">{formatCurrency(shipping)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá (10%)</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Tổng cộng</span>
                    <span className="font-bold text-xl">{formatCurrency(total)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Đã bao gồm VAT</p>
                </div>

                {/* Promo code */}
                <div className="mt-6">
                  <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">Mã giảm giá</label>
                  <div className="flex">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-grow border-gray-300 rounded-l-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Nhập mã"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied}
                      className={`px-4 py-2 text-white rounded-r-md ${
                        promoApplied 
                          ? 'bg-green-600 cursor-not-allowed' 
                          : 'bg-teal-600 hover:bg-teal-700'
                      }`}
                    >
                      {promoApplied ? 'Đã áp dụng' : 'Áp dụng'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="mt-1 text-sm text-green-600">Mã giảm giá đã được áp dụng!</p>
                  )}
                </div>

                <button className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 font-medium mt-6">
                  Tiến hành thanh toán
                </button>
              </div>

              {/* Safety notice */}
              <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Lưu ý khi mua hóa chất</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Xuất trình giấy phép kinh doanh hóa chất (đối với doanh nghiệp)</li>
                  <li>• Tuân thủ quy định vận chuyển hàng hóa nguy hiểm</li>
                  <li>• Kiểm tra kỹ chất lượng và ngày sản xuất khi nhận hàng</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}