import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full text-center">
        {/* SVG minh họa cho trang 404 - hình ống nghiệm bị vỡ */}
        <div className="mb-8 flex justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 500 300" 
            className="w-64 h-64 text-teal-600"
          >
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
              <path d="M250 60v140" strokeDasharray="10 5" />
              <path d="M220 200l30-140 30 140" strokeLinecap="round" />
              <path d="M200 200h100v30a20 20 0 01-20 20h-60a20 20 0 01-20-20v-30z" fill="#E5F5F5" />
              <path d="M190 210l-40 50M310 210l40 50" strokeLinecap="round" />
              <path d="M220 90h60M220 120h60" opacity="0.5" />
              <path fill="#0694A2" d="M220 200h60v30a10 10 0 01-10 10h-40a10 10 0 01-10-10v-30z" fillOpacity="0.3" />
              <path d="M250 60a10 10 0 110-20 10 10 0 010 20z" fill="#E5F5F5" />
              <circle cx="180" cy="230" r="15" fill="#0694A2" fillOpacity="0.2" />
              <circle cx="320" cy="230" r="20" fill="#0694A2" fillOpacity="0.2" />
              <circle cx="210" cy="245" r="10" fill="#0694A2" fillOpacity="0.2" />
              <text x="150" y="180" fontSize="120" fontWeight="bold" fill="#0694A2" opacity="0.1">404</text>
            </g>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">Không tìm thấy trang</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến vị trí khác.
        </p>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors mx-auto w-full max-w-xs"
          >
            <Home size={20} className="mr-2" />
            Quay lại trang chủ
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="flex items-center justify-center border border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors"
            >
              <Search size={20} className="mr-2" />
              Tìm sản phẩm
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Quay lại
            </button>
          </div>
        </div>

        <div className="mt-12 text-gray-500">
          <p>Bạn có thể thử một trong những liên kết sau:</p>
          <div className="flex justify-center space-x-4 mt-4 flex-wrap gap-y-2">
            <Link to="/categories" className="text-teal-600 hover:underline">Danh mục</Link>
            <Link to="/contact" className="text-teal-600 hover:underline">Liên hệ</Link>
            <Link to="/about" className="text-teal-600 hover:underline">Về chúng tôi</Link>
            <Link to="/safety-guide" className="text-teal-600 hover:underline">Hướng dẫn an toàn</Link>
          </div>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          <p>Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ hỗ trợ tại <a href="mailto:support@chemtech.vn" className="text-teal-600 hover:underline">support@chemtech.vn</a></p>
        </div>
      </div>
    </div>
  );
}