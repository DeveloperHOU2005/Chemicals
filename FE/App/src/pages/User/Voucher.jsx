import React, { useState } from 'react';
import { Tag, Gift, Check, Clock, Copy, Filter, Search, Star, Award, Percent } from 'lucide-react';

export default function ChemicalVoucherPage() {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  // Mẫu voucher
  const vouchers = [
    {
      id: 1,
      code: 'NEWCHEM25',
      title: 'Giảm 25% cho đơn hàng đầu tiên',
      description: 'Áp dụng cho tất cả sản phẩm hóa chất. Đơn hàng tối thiểu 500.000 VNĐ',
      expiry: '30/05/2025',
      discount: '25%',
      minOrder: '500.000 VNĐ',
      category: 'new',
      status: 'available',
      featured: true
    },
    {
      id: 2,
      code: 'LAB15OFF',
      title: 'Giảm 15% cho hóa chất phòng thí nghiệm',
      description: 'Áp dụng cho danh mục hóa chất phòng thí nghiệm và dụng cụ thí nghiệm',
      expiry: '15/05/2025',
      discount: '15%',
      minOrder: '1.000.000 VNĐ',
      category: 'lab',
      status: 'available',
      featured: false
    },
    {
      id: 3,
      code: 'INDUS20',
      title: 'Giảm 20% cho hóa chất công nghiệp',
      description: 'Áp dụng cho danh mục hóa chất công nghiệp khi mua với số lượng lớn',
      expiry: '10/05/2025',
      discount: '20%',
      minOrder: '2.000.000 VNĐ',
      category: 'industrial',
      status: 'available',
      featured: true
    },
    {
      id: 4,
      code: 'ORGANIC10',
      title: 'Giảm 10% cho hóa chất hữu cơ',
      description: 'Ưu đãi đặc biệt cho dòng sản phẩm hóa chất hữu cơ cao cấp',
      expiry: '05/05/2025',
      discount: '10%',
      minOrder: 'Không giới hạn',
      category: 'organic',
      status: 'available',
      featured: false
    },
    {
      id: 5,
      code: 'SAFETY50',
      title: 'Giảm 50% cho thiết bị an toàn',
      description: 'Mua hóa chất trên 1.000.000 VNĐ và nhận ưu đãi cho thiết bị bảo hộ',
      expiry: '20/04/2025',
      discount: '50%',
      minOrder: '1.000.000 VNĐ',
      category: 'safety',
      status: 'available',
      featured: true
    },
    {
      id: 6,
      code: 'SHIP100',
      title: 'Miễn phí vận chuyển',
      description: 'Miễn phí vận chuyển cho đơn hàng trên 3.000.000 VNĐ',
      expiry: '01/04/2025',
      discount: 'Miễn phí vận chuyển',
      minOrder: '3.000.000 VNĐ',
      category: 'shipping',
      status: 'expired',
      featured: false
    },
    {
      id: 7,
      code: 'BULK30',
      title: 'Giảm 30% cho mua số lượng lớn',
      description: 'Áp dụng khi mua tối thiểu 10 đơn vị cùng loại hóa chất',
      expiry: '20/03/2025',
      discount: '30%',
      minOrder: '10 đơn vị trở lên',
      category: 'bulk',
      status: 'expired',
      featured: true
    },
    {
      id: 8,
      code: 'FLASH15',
      title: 'Flash Sale! Giảm 15% tất cả sản phẩm',
      description: 'Chỉ áp dụng trong 24 giờ! Nhanh tay kẻo lỡ!',
      expiry: '18/04/2025',
      discount: '15%',
      minOrder: 'Không giới hạn',
      category: 'flash',
      status: 'available',
      featured: true
    }
  ];

  // Lọc voucher theo tab và bộ lọc
  const filteredVouchers = vouchers.filter(voucher => {
    // Lọc theo tab
    if (voucher.status !== activeTab) return false;
    
    // Lọc theo tìm kiếm
    if (searchTerm && !voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !voucher.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Lọc theo loại
    if (filter !== 'all' && voucher.category !== filter) return false;
    
    return true;
  });

  // Sao chép mã voucher
  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        setTimeout(() => {
          setCopiedCode(null);
        }, 2000);
      })
      .catch(err => {
        console.error('Không thể sao chép: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-4 mb-6 md:px-24 my-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm voucher..."
                className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center">
              <div className="mr-2">
                <Filter size={18} className="text-gray-500" />
              </div>
              <select 
                className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tất cả loại</option>
                <option value="new">Khách hàng mới</option>
                <option value="lab">Phòng thí nghiệm</option>
                <option value="industrial">Công nghiệp</option>
                <option value="organic">Hữu cơ</option>
                <option value="safety">Thiết bị an toàn</option>
                <option value="shipping">Vận chuyển</option>
                <option value="bulk">Mua số lượng lớn</option>
                <option value="flash">Flash sale</option>
              </select>
            </div>
          </div>
        </div>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white py-6 shadow-lg mx-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">ChemTech</h1>
              <p className="text-sm text-purple-200">Tiết kiệm hơn với mã giảm giá hóa chất</p>
            </div>
            <div className="flex items-center space-x-2">
              <Gift className="text-yellow-300" size={24} />
              <span className="font-semibold">Ưu đãi đặc biệt mỗi ngày!</span>
            </div>
          </div>
          
          {/* Banner */}
          <div className="mt-6 bg-indigo-900 bg-opacity-50 p-4 rounded-lg border border-purple-300 border-opacity-30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Star className="text-yellow-300 mr-2" size={24} />
                <div>
                  <h3 className="font-bold">ƯU ĐÃI HÓA CHẤT THÁNG 4</h3>
                  <p className="text-purple-200 text-sm">Nhập mã "CHEM425" để được giảm thêm 5% cho tất cả đơn hàng</p>
                </div>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-indigo-900 font-bold py-2 px-6 rounded-full transition duration-300">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'available' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('available')}
          >
            Đang hoạt động
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'expired' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('expired')}
          >
            Đã hết hạn
          </button>
        </div>

        {/* Featured Vouchers */}
        {activeTab === 'available' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="text-yellow-500 mr-2" size={24} />
              Voucher nổi bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVouchers
                .filter(voucher => voucher.featured)
                .map(voucher => (
                  <div 
                    key={voucher.id} 
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg overflow-hidden shadow-md border border-indigo-100 relative"
                  >
                    {voucher.featured && (
                      <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-white px-2 py-1 rounded-bl-lg">
                        HOT
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-indigo-800">{voucher.title}</h3>
                          <span className="inline-flex items-center text-sm text-gray-500 mt-1">
                            <Clock size={14} className="mr-1" />
                            Hạn: {voucher.expiry}
                          </span>
                        </div>
                        <div className="flex items-center justify-center bg-indigo-100 rounded-full h-12 w-12">
                          <Percent size={24} className="text-indigo-600" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{voucher.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Giảm giá: <span className="text-indigo-600 font-bold">{voucher.discount}</span></span>
                        <span className="text-sm font-medium text-gray-500">Đơn tối thiểu: <span className="text-indigo-600">{voucher.minOrder}</span></span>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="bg-gray-100 px-3 py-1 rounded-md font-mono text-sm flex-grow mr-2 flex items-center justify-between">
                          <span className="font-medium text-indigo-800">{voucher.code}</span>
                          <button 
                            onClick={() => copyCode(voucher.code)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {copiedCode === voucher.code ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-4 rounded-md text-sm transition duration-300">
                          Sử dụng
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Vouchers */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Tag className="text-indigo-500 mr-2" size={24} />
            {activeTab === 'available' ? 'Tất cả voucher' : 'Voucher đã hết hạn'}
          </h2>
          
          {filteredVouchers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">Không tìm thấy voucher nào phù hợp</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredVouchers
                .filter(voucher => activeTab === 'expired' || !voucher.featured)
                .map(voucher => (
                  <div 
                    key={voucher.id} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden border ${activeTab === 'expired' ? 'border-gray-200' : 'border-indigo-100'}`}
                  >
                    <div className="p-4 flex flex-col md:flex-row md:items-center">
                      <div className="flex-grow mb-4 md:mb-0 md:mr-4">
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-full mr-3 ${activeTab === 'expired' ? 'bg-gray-100' : 'bg-indigo-100'}`}>
                            {voucher.category === 'new' && <Gift size={20} className="text-indigo-600" />}
                            {voucher.category === 'lab' && <Tag size={20} className="text-green-600" />}
                            {voucher.category === 'industrial' && <Tag size={20} className="text-blue-600" />}
                            {voucher.category === 'organic' && <Tag size={20} className="text-green-600" />}
                            {voucher.category === 'safety' && <Tag size={20} className="text-red-600" />}
                            {voucher.category === 'shipping' && <Tag size={20} className="text-purple-600" />}
                            {voucher.category === 'bulk' && <Tag size={20} className="text-orange-600" />}
                            {voucher.category === 'flash' && <Tag size={20} className="text-yellow-600" />}
                          </div>
                          <div>
                            <h3 className={`font-bold ${activeTab === 'expired' ? 'text-gray-600' : 'text-gray-800'}`}>{voucher.title}</h3>
                            <span className="text-xs text-gray-500">Hạn: {voucher.expiry}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{voucher.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Giảm giá: <span className="font-medium ml-1">{voucher.discount}</span>
                          </span>
                          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Đơn tối thiểu: <span className="font-medium ml-1">{voucher.minOrder}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 bg-gray-100 px-3 py-1 rounded-md font-mono text-sm flex items-center mr-3 ${activeTab === 'expired' ? 'text-gray-500' : ''}`}>
                          <span className="font-medium">{voucher.code}</span>
                          {activeTab !== 'expired' && (
                            <button 
                              onClick={() => copyCode(voucher.code)}
                              className="text-indigo-600 hover:text-indigo-800 ml-2"
                            >
                              {copiedCode === voucher.code ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                          )}
                        </div>
                        {activeTab !== 'expired' ? (
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-4 rounded-md text-sm transition duration-300 whitespace-nowrap">
                            Sử dụng
                          </button>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-md">Đã hết hạn</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}