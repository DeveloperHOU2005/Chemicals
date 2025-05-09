import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: "Hóa chất tinh khiết cho nghiên cứu và công nghiệp",
    description: "Cung cấp các loại hóa chất chất lượng cao với độ tinh khiết được đảm bảo",
    primaryBtn: "Mua ngay",
    secondaryBtn: "Tìm hiểu thêm",
    bgFrom: "from-teal-500",
    bgTo: "to-blue-500",
    image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"
  },
  {
    id: 2,
    title: "Giải pháp hóa chất cho phòng thí nghiệm",
    description: "Đa dạng hóa chất phân tích, thuốc thử và vật tư cho mọi nhu cầu nghiên cứu",
    primaryBtn: "Xem bộ sưu tập",
    secondaryBtn: "Liên hệ tư vấn",
    bgFrom: "from-blue-600",
    bgTo: "to-purple-500",
    image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"
  },
  {
    id: 3,
    title: "Hóa chất đạt chuẩn ISO cho sản xuất",
    description: "Đáp ứng mọi tiêu chuẩn khắt khe nhất cho quy trình sản xuất của doanh nghiệp",
    primaryBtn: "Báo giá",
    secondaryBtn: "Đọc chứng nhận",
    bgFrom: "from-green-500",
    bgTo: "to-teal-600",
    image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"
  },
  {
    id: 4,
    title: "Dung môi và hóa chất hữu cơ cao cấp",
    description: "Bộ sưu tập dung môi tinh khiết với độ tinh khiết lên đến 99.9% cho thí nghiệm chính xác",
    primaryBtn: "Khám phá ngay",
    secondaryBtn: "Xem catalogue",
    bgFrom: "from-purple-600",
    bgTo: "to-pink-500",
    image: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"
  }
];

export default function RotatingBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Tự động chuyển banner sau mỗi 5 giây
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentBanner]);
  
  const nextBanner = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setIsTransitioning(false);
    }, 300);
  };
  
  const prevBanner = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
      setIsTransitioning(false);
    }, 300);
  };
  
  const goToBanner = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentBanner(index);
      setIsTransitioning(false);
    }, 300);
  };
  
  const banner = banners[currentBanner];
  
  return (
    <div className={`relative bg-gradient-to-r ${banner.bgFrom} ${banner.bgTo} text-white py-12 transition-all duration-300 ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}>
      <div className="container mx-auto px-4">
        <div className="md:flex items-center pr-10">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wrap md:w-[calc(w-1/2 - 50px)]">{banner.title}</h1>
            <p className="text-lg mb-6">{banner.description}</p>
            <div className="flex space-x-4">
              <button className="bg-white text-teal-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                {banner.primaryBtn}
              </button>
              <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-20 transition-colors">
                {banner.secondaryBtn}
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={banner.image} alt="Laboratory chemicals" className="rounded-lg shadow-lg" />
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-all"
          aria-label="Previous banner"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button 
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-all"
          aria-label="Next banner"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-6">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`w-3 h-3 mx-1 rounded-full ${currentBanner === index ? 'bg-white' : 'bg-white bg-opacity-40'} transition-all`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}