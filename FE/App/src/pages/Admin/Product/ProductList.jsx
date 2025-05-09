// src/components/ProductTable.jsx
import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, ChevronDown, ChevronUp, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm import Link và useNavigate

import Confirm from '../../../components/common/ConfirmDialog'
import { im } from 'mathjs';

const ProductTable = ({ 
  products, 
  searchTerm, 
  setSearchTerm, 
  onEdit, 
  onDelete, 
  formatCurrency,
  onAdd, 
  onDetail
}) => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Hàm xử lý khi click vào sản phẩm để chuyển hướng
  const handleProductClick = (productId) => {
    navigate(`/admin/products/details/${productId}`);
  };
  
  // Lọc sản phẩm theo từ khóa
  const filteredProducts = Array.isArray(products) 
    ? products.filter(product => 
        product.tensp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tendanhmuc || '').toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : [];
  
  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valueA, valueB;
    
    // Xác định giá trị để so sánh dựa trên trường đang sắp xếp
    switch (sortField) {
      case 'id':
        valueA = a.id;
        valueB = b.id;
        break;
      case 'name':
        valueA = a.tensp;
        valueB = b.tensp;
        break;
      case 'category':
        valueA = a.tendanhmuc || '';
        valueB = b.tendanhmuc || '';
        break;
      case 'price':
        valueA = parseFloat(a.gia);
        valueB = parseFloat(b.gia);
        break;
      case 'sold':
        valueA = a.da_ban;
        valueB = b.da_ban;
        break;
      case 'stock':
        valueA = parseFloat(a.khoiluong);
        valueB = parseFloat(b.khoiluong);
        break;
      default:
        valueA = a.id;
        valueB = b.id;
    }
    
    // So sánh và sắp xếp
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  // Xử lý chuyển trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Tạo mảng số trang để hiển thị
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Hiển thị tất cả các trang nếu tổng số trang ít hơn maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu, trang cuối và các trang xung quanh trang hiện tại
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  // Render header với chức năng sắp xếp
  const SortableHeader = ({ field, label, className = "" }) => (
    <th 
      className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center">
        <span>{label}</span>
        <div className="ml-1">
          {sortField === field ? (
            sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
          ) : (
            <ChevronDown size={14} className="text-gray-300" />
          )}
        </div>
      </div>
    </th>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
      {/* Header với tìm kiếm và nút thêm sản phẩm */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Hiển thị {filteredProducts.length} trên tổng số {Array.isArray(products) ? products.length : 0} sản phẩm
            </span>
            
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5 / trang</option>
              <option value={10}>10 / trang</option>
              <option value={20}>20 / trang</option>
              <option value={50}>50 / trang</option>
            </select>
            
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition-colors" 
              onClick={() => onAdd()}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
      
      {/* Bảng sản phẩm */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="id" label="ID" className="text-center" />
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hình</th>
              <SortableHeader field="name" label="Tên sản phẩm" className="text-center" />
              <SortableHeader field="category" label="Danh mục" className="text-center" />
              <SortableHeader field="stock" label="Tồn kho" className="text-center" />
              <SortableHeader field="price" label="Giá" className="text-center" />
              <SortableHeader field="sold" label="Đã bán" className="text-center" />
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p className="font-medium">Không tìm thấy sản phẩm nào phù hợp</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((product) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleProductClick(product.id)} // Thêm sự kiện click vào hàng
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                      {product.imageUrl && product.imageUrl[0] ? (
                        <img 
                          src={product.imageUrl[0]} 
                          alt={product.tensp} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs">Không có ảnh</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="text-wrap text-center max-w-xs truncate" title={product.tensp}>
                      {product.tensp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      {product.tendanhmuc || '---'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full ${
                      parseFloat(product.khoiluong) < 50 
                        ? 'bg-red-50 text-red-700' 
                        : parseFloat(product.khoiluong) > 100 
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {product.khoiluong} {product.dv}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center font-medium">
                    {formatCurrency(product.gia)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {product.da_ban}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm">
                    <div className="flex justify-center items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
                          onEdit(product);
                        }}
                        className="text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 p-2 rounded-full transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
                          onDelete(product.id);
                        }}
                        className="text-red-600 hover:text-white bg-red-50 hover:bg-red-600 p-2 rounded-full transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Phân trang */}
      {sortedProducts.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} trong {sortedProducts.length} sản phẩm
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            
            {getPageNumbers().map((pageNumber, index) => (
              <button
                key={index}
                onClick={() => pageNumber !== '...' && goToPage(pageNumber)}
                disabled={pageNumber === '...'}
                className={`px-3 py-1 rounded border ${
                  pageNumber === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : pageNumber === '...'
                      ? 'bg-gray-100 text-gray-500 border-gray-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;