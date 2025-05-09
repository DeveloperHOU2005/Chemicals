import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    productInterest: 'general',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      productInterest: 'general',
    });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Info */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-teal-600">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Liên Hệ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Địa Chỉ</h3>
                    <p className="text-gray-600 mt-1">Tòa nhà Tech Center, 123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Điện Thoại</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:+842839999999" className="hover:text-teal-600">+84 28 3999 9999</a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:+84908123456" className="hover:text-teal-600">+84 908 123 456</a> (Hotline)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:info@hoachat.com" className="hover:text-teal-600">info@hoachat.com</a>
                    </p>
                    <p className="text-gray-600">
                      <a href="mailto:sales@hoachat.com" className="hover:text-teal-600">sales@hoachat.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Giờ Làm Việc</h3>
                    <p className="text-gray-600 mt-1">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                    <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                    <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map placeholder */}
            <div className="mt-8 bg-gray-200 rounded-lg shadow-md p-4 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gray-600 mx-auto" />
                <p className="mt-2 text-gray-600">Bản đồ vị trí công ty</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-teal-600">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Gửi Thắc Mắc</h2>
              
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-4">
                  <p>Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="example@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0912345678"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-gray-700 mb-2">Công ty</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Tên công ty của bạn"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="productInterest" className="block text-gray-700 mb-2">Bạn quan tâm đến sản phẩm nào?</label>
                  <select
                    id="productInterest"
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="general">Thông tin chung</option>
                    <option value="industrial">Hóa chất công nghiệp</option>
                    <option value="laboratory">Hóa chất phòng thí nghiệm</option>
                    <option value="special">Hóa chất đặc biệt</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Nội dung <span className="text-red-500">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Nhập nội dung thắc mắc của bạn..."
                  ></textarea>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors duration-300 flex items-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Gửi Thông Tin
                  </button>
                </div>
              </form>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Câu Hỏi Thường Gặp</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">Thời gian giao hàng là bao lâu?</h4>
                  <p className="text-gray-600 mt-1">Chúng tôi giao hàng trong vòng 24-48 giờ đối với khu vực nội thành và 3-5 ngày đối với các tỉnh thành khác.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">Có chính sách đổi trả không?</h4>
                  <p className="text-gray-600 mt-1">Chúng tôi có chính sách đổi trả trong vòng 7 ngày nếu sản phẩm bị lỗi do nhà sản xuất hoặc không đúng thông số kỹ thuật.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">Làm thế nào để đặt hàng với số lượng lớn?</h4>
                  <p className="text-gray-600 mt-1">Đối với đơn hàng số lượng lớn, vui lòng liên hệ trực tiếp với bộ phận kinh doanh qua số điện thoại hotline hoặc email sales@hoachat.com để được tư vấn và báo giá tốt nhất.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}