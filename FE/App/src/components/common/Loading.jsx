import { useState, useEffect } from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="relative w-24 h-24">
        {/* Spinner outer circle */}
        <div className="absolute w-24 h-24 border-4 border-blue-200 rounded-full"></div>
        
        {/* Spinner inner rotating circle */}
        <div className="absolute w-24 h-24 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Pulsing center dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
      {/* Loading text */}
      <p className="mt-6 text-gray-600">Đang tải dữ liệu...</p>
    </div>
  );
}