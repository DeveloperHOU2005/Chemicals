import { useState } from 'react';
import { Camera, Video, Star, ChevronLeft, ChevronRight, DollarSign, Send, Image } from 'lucide-react';

export default function ProductReviewForm() {
  const [rating, setRating] = useState(5);
  const [sellerRating, setSellerRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [driverRating, setDriverRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviewText, setReviewText] = useState('');

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 px-8 py-6 text-white">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 mr-3" />
          <h1 className="text-2xl font-semibold">Đánh giá sản phẩm</h1>
        </div>
      </div>
      
      {/* Coin Banner */}
      <div className="flex items-center p-4 bg-amber-50 border-b border-amber-100">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-400 mr-3">
          <DollarSign size={16} className="text-white" />
        </div>
        <span>Xem Hướng dẫn đánh giá chuẩn để nhận thêm voucher!</span>
        <ChevronRight className="ml-auto text-amber-500" size={20} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-20 h-20 bg-white rounded-md border border-gray-200 mr-4 flex-shrink-0 overflow-hidden">
              <Image className="w-full h-full text-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">[Võ Hà Linh x BIBALA]</p>
              <p className="text-gray-600">Bọt rửa mặt chiết xuất Táo Xanh</p>
            </div>
          </div>
          
          {/* Main Rating */}
          <div className="bg-white rounded-lg border border-gray-100 p-5">
            <h2 className="text-lg font-medium mb-4 text-gray-800">Đánh giá sản phẩm</h2>
            
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  size={42} 
                  className={`mx-2 cursor-pointer transform transition-all ${star <= rating ? 'fill-amber-400 text-amber-400 scale-110' : 'text-gray-200 hover:scale-105'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            
            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Viết đánh giá từ 50 ký tự
              </label>
              
              <textarea
                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              
              <div className="text-right text-sm text-gray-500 mt-1">
                {reviewText.length} ký tự
              </div>
              
              <div className="mt-4 bg-gray-50 rounded-md p-3 border-l-4 border-amber-400">
                <p className="text-sm text-gray-600 font-medium mb-2">Gợi ý đánh giá:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Hướng thơm: Độ tỏa hương, lưu giữ mùi</li>
                  <li>• Bao bì: Thiết kế bao bì, khối lượng</li>
                  <li>• Làm đẹp: Tuổi, màu da, loại da, mối quan tâm về da</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Upload Section */}
          <div className="bg-white rounded-lg border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Thêm hình ảnh/video</h3>
              <span className="text-amber-500 font-bold">+200 xu</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-sky-400 hover:text-sky-500 transition cursor-pointer bg-gray-50">
                <Camera size={28} className="mb-2" />
                <span className="text-sm font-medium">Hình ảnh</span>
              </div>
              <div className="h-32 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-sky-400 hover:text-sky-500 transition cursor-pointer bg-gray-50">
                <Video size={28} className="mb-2" />
                <span className="text-sm font-medium">Video</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Additional Ratings */}
          <div className="bg-white rounded-lg border border-gray-100 p-5">
            <h2 className="text-lg font-medium mb-4 text-gray-800">Đánh giá dịch vụ</h2>
            
            {/* Seller Service */}
            <div className="mb-6 pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-700">Dịch vụ của người bán</h3>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={22} 
                      className={`ml-1 cursor-pointer ${star <= sellerRating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      onClick={() => setSellerRating(star)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Delivery Speed */}
            <div className="mb-6 pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-700">Tốc độ giao hàng</h3>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={22} 
                      className={`ml-1 cursor-pointer ${star <= deliveryRating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      onClick={() => setDeliveryRating(star)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Driver */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-700">Tài xế</h3>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={22} 
                      className={`ml-1 cursor-pointer ${star <= driverRating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      onClick={() => setDriverRating(star)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Anonymous Checkbox */}
            <div className="mt-8 flex items-center bg-gray-50 p-3 rounded-md">
              <input 
                type="checkbox" 
                id="anonymous" 
                className="w-5 h-5 mr-3 accent-sky-500"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <label htmlFor="anonymous" className="text-gray-700">Đánh giá ẩn danh</label>
            </div>
          </div>
          
          {/* Submit Button */}
          <button className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-4 px-8 rounded-lg text-lg font-medium flex items-center justify-center gap-2 hover:from-sky-600 hover:to-cyan-600 transition shadow-lg">
            <Send size={20} />
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}