import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function SafetyGuidelines() {
  const [openSection, setOpenSection] = useState('general');

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="text-yellow-400" size={24} />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">Chú ý!</h3>
              <p className="text-yellow-700">
                Hóa chất có thể gây nguy hiểm nếu không được xử lý đúng cách. Vui lòng đọc kỹ hướng dẫn an toàn trước khi mua và sử dụng sản phẩm.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <ShieldCheck className="text-green-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-green-800">Bảo vệ cá nhân</h3>
            </div>
            <p className="text-green-700">
              Luôn sử dụng thiết bị bảo hộ cá nhân như găng tay, kính bảo hộ và áo choàng phòng thí nghiệm khi làm việc với hóa chất.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Info className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-blue-800">Đọc nhãn</h3>
            </div>
            <p className="text-blue-700">
              Luôn đọc và hiểu thông tin trên nhãn và bảng dữ liệu an toàn (SDS) trước khi sử dụng bất kỳ hóa chất nào.
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <AlertTriangle className="text-red-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-red-800">Xử lý khẩn cấp</h3>
            </div>
            <p className="text-red-700">
              Biết cách xử lý tràn đổ và các tình huống khẩn cấp khác. Luôn có sẵn bộ dụng cụ xử lý tràn đổ và số điện thoại khẩn cấp.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 bg-gray-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">Hướng dẫn an toàn chi tiết</h2>
          </div>

          {/* General Safety */}
          <div className="border-b">
            <button 
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50" 
              onClick={() => toggleSection('general')}
            >
              <span className="font-semibold text-gray-700">An toàn chung</span>
              {openSection === 'general' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openSection === 'general' && (
              <div className="p-4 bg-gray-50">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Không bao giờ ăn, uống hoặc hút thuốc khi làm việc với hóa chất.</li>
                  <li>Giữ hóa chất xa tầm tay trẻ em và vật nuôi.</li>
                  <li>Lưu trữ hóa chất ở nơi khô ráo, thoáng mát và có khóa.</li>
                  <li>Không bao giờ để hóa chất không có nhãn.</li>
                  <li>Không trộn các hóa chất trừ khi bạn chắc chắn về phản ứng.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Storage */}
          <div className="border-b">
            <button 
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50" 
              onClick={() => toggleSection('storage')}
            >
              <span className="font-semibold text-gray-700">Lưu trữ hóa chất</span>
              {openSection === 'storage' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openSection === 'storage' && (
              <div className="p-4 bg-gray-50">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Lưu trữ hóa chất theo nhóm tương thích, tránh để các hóa chất không tương thích gần nhau.</li>
                  <li>Sử dụng tủ đựng hóa chất chuyên dụng cho các hóa chất dễ cháy.</li>
                  <li>Không lưu trữ hóa chất trên các kệ cao hoặc trên đầu.</li>
                  <li>Kiểm tra thường xuyên các container để phát hiện rò rỉ hoặc hư hỏng.</li>
                  <li>Lưu trữ ở nhiệt độ phù hợp theo khuyến nghị trên nhãn.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Handling */}
          <div className="border-b">
            <button 
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50" 
              onClick={() => toggleSection('handling')}
            >
              <span className="font-semibold text-gray-700">Xử lý hóa chất</span>
              {openSection === 'handling' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openSection === 'handling' && (
              <div className="p-4 bg-gray-50">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Luôn sử dụng thiết bị bảo hộ phù hợp khi xử lý hóa chất.</li>
                  <li>Làm việc trong khu vực thông thoáng hoặc dưới tủ hút.</li>
                  <li>Sử dụng dụng cụ thích hợp (như pipet) để chuyển hóa chất, không hút bằng miệng.</li>
                  <li>Đóng chặt nắp container sau khi sử dụng.</li>
                  <li>Rửa tay kỹ sau khi xử lý hóa chất, ngay cả khi đã đeo găng tay.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Emergency Response */}
          <div className="border-b">
            <button 
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50" 
              onClick={() => toggleSection('emergency')}
            >
              <span className="font-semibold text-gray-700">Ứng phó khẩn cấp</span>
              {openSection === 'emergency' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openSection === 'emergency' && (
              <div className="p-4 bg-gray-50">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Biết vị trí của trạm rửa mắt và vòi sen an toàn.</li>
                  <li>Có sẵn bộ dụng cụ xử lý tràn đổ phù hợp với loại hóa chất bạn sử dụng.</li>
                  <li>Trong trường hợp tiếp xúc với da hoặc mắt, rửa ngay bằng nhiều nước ít nhất 15 phút và tìm kiếm sự chăm sóc y tế.</li>
                  <li>Trong trường hợp hít phải, di chuyển đến nơi có không khí trong lành và tìm kiếm sự chăm sóc y tế nếu cần.</li>
                  <li>Báo cáo tất cả các tai nạn và sự cố, ngay cả những sự cố nhỏ.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Disposal */}
          <div>
            <button 
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50" 
              onClick={() => toggleSection('disposal')}
            >
              <span className="font-semibold text-gray-700">Xử lý chất thải</span>
              {openSection === 'disposal' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openSection === 'disposal' && (
              <div className="p-4 bg-gray-50">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Không đổ hóa chất xuống cống hoặc bồn rửa.</li>
                  <li>Thu gom chất thải hóa học trong container thích hợp và dán nhãn rõ ràng.</li>
                  <li>Tuân thủ quy định địa phương về xử lý chất thải hóa học.</li>
                  <li>Sử dụng dịch vụ xử lý chất thải chuyên nghiệp cho các hóa chất nguy hiểm.</li>
                  <li>Không tái sử dụng container hóa chất trống cho mục đích khác.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Liên hệ khẩn cấp</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Trung tâm kiểm soát chất độc:</strong> 0123-456-789</p>
            <p><strong>Dịch vụ khẩn cấp:</strong> 115</p>
            <p><strong>Bộ phận hỗ trợ kỹ thuật:</strong> 0987-654-321</p>
            <p><strong>Email hỗ trợ:</strong> hotro@chemsafe.com</p>
          </div>
        </div>
      </main>
    </div>
  );
}