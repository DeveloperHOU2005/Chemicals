import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({ 
  title,
  totalItems = 100,
  itemsPerPage = 10,
  currentPage = 1, 
  onPageChange,
  showItemsCount = true,
  maxPageButtons = 5,
  className = ""
}) {
  const [page, setPage] = useState(currentPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Cập nhật trang khi props thay đổi
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  
  // Xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  
  // Tính toán phạm vi các nút trang cần hiển thị
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;
    
    if (totalPages <= maxPageButtons) {
      // Nếu tổng số trang ít hơn hoặc bằng số nút tối đa, hiển thị tất cả
      startPage = 1;
      endPage = totalPages;
    } else {
      // Tính toán nút bắt đầu và kết thúc để giữ trang hiện tại ở giữa
      const maxPagesBeforeCurrentPage = Math.floor(maxPageButtons / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageButtons / 2) - 1;
      
      if (page <= maxPagesBeforeCurrentPage) {
        // Gần đầu
        startPage = 1;
        endPage = maxPageButtons;
      } else if (page + maxPagesAfterCurrentPage >= totalPages) {
        // Gần cuối
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
      } else {
        // Ở giữa
        startPage = page - maxPagesBeforeCurrentPage;
        endPage = page + maxPagesAfterCurrentPage;
      }
    }
    
    // Tạo mảng các số trang
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };
  
  // Tính toán vị trí hiện tại
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);
  
  // Classes cho nút
  const buttonBaseClass = "flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 rounded";
  const activeButtonClass = "z-10 bg-blue-50 border-blue-500 text-blue-600";
  const inactiveButtonClass = "bg-white text-gray-500 hover:bg-gray-50";
  const disabledButtonClass = "bg-gray-100 text-gray-400 cursor-not-allowed";
  
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 px-4 py-3 bg-white border-t border-gray-200 ${className}`}>
      {/* Hiển thị thông tin về kết quả */}
      {showItemsCount && (
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{startIndex}</span> đến{" "}
          <span className="font-medium">{endIndex}</span> trong tổng số{" "}
          <span className="font-medium">{totalItems}</span> {title}
        </div>
      )}
      
      {/* Nút phân trang */}
      <div className="flex items-center space-x-1">
        {/* Nút đầu trang */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={`${buttonBaseClass} ${page === 1 ? disabledButtonClass : inactiveButtonClass}`}
          aria-label="Đầu trang"
        >
          <ChevronsLeft size={16} />
        </button>
        
        {/* Nút trước */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`${buttonBaseClass} ${page === 1 ? disabledButtonClass : inactiveButtonClass}`}
          aria-label="Trang trước"
        >
          <ChevronLeft size={16} />
        </button>
        
        {/* Các nút số trang */}
        {getPageNumbers().map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            aria-current={page === number ? "page" : undefined}
            className={`${buttonBaseClass} ${
              page === number ? activeButtonClass : inactiveButtonClass
            }`}
          >
            {number}
          </button>
        ))}
        
        {/* Nút tiếp */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`${buttonBaseClass} ${page === totalPages ? disabledButtonClass : inactiveButtonClass}`}
          aria-label="Trang tiếp"
        >
          <ChevronRight size={16} />
        </button>
        
        {/* Nút cuối trang */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className={`${buttonBaseClass} ${page === totalPages ? disabledButtonClass : inactiveButtonClass}`}
          aria-label="Cuối trang"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
      
      {/* Dropdown chọn số lượng hiển thị trên mỗi trang - phiên bản di động */}
      <div className="sm:hidden flex items-center space-x-2">
        <label htmlFor="mobile-per-page" className="text-sm text-gray-700">
          Hiển thị:
        </label>
        <select
          id="mobile-per-page"
          className="form-select rounded border-gray-300 text-sm"
          value={itemsPerPage}
          onChange={(e) => {
            if (onPageChange) {
              onPageChange(1, parseInt(e.target.value));
            }
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      
      {/* Dropdown chọn số lượng hiển thị trên mỗi trang - phiên bản desktop */}
      <div className="hidden sm:flex items-center space-x-2">
        <label htmlFor="desktop-per-page" className="text-sm text-gray-700">
          {title} mỗi trang:
        </label>
        <select
          id="desktop-per-page"
          className="form-select rounded border-gray-300 text-sm"
          value={itemsPerPage}
          onChange={(e) => {
            if (onPageChange) {
              onPageChange(1, parseInt(e.target.value));
            }
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
}
