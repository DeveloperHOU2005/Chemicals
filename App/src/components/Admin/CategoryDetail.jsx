import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Tag, Clock, ShoppingBag, User, Check, AlertCircle } from 'lucide-react';
import date from '../../utils/date';
import adminServices from '../../services/adminServices';
import statusClasses from '../../utils/color';
const Detail = ({ onClose, selectedCategory }) => {
  console.log(selectedCategory)
  const [loading, setLoading] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState(selectedCategory);
  const [productsInCategory, setProductsInCategory] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getProductsInCategory = async () => {
      setLoading(true);
      try {
        const response = await adminServices.getProductsByCategory(selectedCategory.id);
        setProductsInCategory(response.data);
      } catch (error) {
        console.error("Error fetching products in category:", error);
      } finally {
        setLoading(false);
      }
    }
    getProductsInCategory();
  },[])

  const handleProductClick = (e, productId) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
    navigate(`/admin/products/${productId}`);
  }
  const clolers = statusClasses;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" 
      onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Chi tiết danh mục</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="p-6">
            {categoryDetails ? (
              <>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {/* Info Column */}
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{categoryDetails.tendanhmuc}</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        categoryDetails.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {categoryDetails.status === 'active' ? (
                          <><Check className="h-4 w-4 mr-1" /> Hoạt động</>
                        ) : (
                          <><AlertCircle className="h-4 w-4 mr-1" /> Vô hiệu</>
                        )}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Mã danh mục</label>
                        <p className="text-gray-800 font-medium">#{categoryDetails.id}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Ngày thêm</label>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          <p className="text-gray-800">{date.formatDate(categoryDetails.adddate)}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Tổng sản phẩm</label>
                        <div className="flex items-center">
                          <ShoppingBag className="h-4 w-4 mr-1 text-gray-400" />
                          <p className="text-gray-800">{categoryDetails.total || 0}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Danh mục cha</label>
                        <p className="text-gray-800">
                          {categoryDetails.danhmuccha ? categoryDetails.danhmuccha : 'Không có'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Người thêm</label>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-400" />
                          <p className="text-gray-800">{categoryDetails.added_by || 'Admin'}</p>
                        </div>
                      </div>
                      
                      {categoryDetails.adddate && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Cập nhật lần cuối</label>
                          <p className="text-gray-800">{date.formatDate(categoryDetails.adddate)}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6 w-full">
                      <label className="text-sm font-medium text-gray-500 w-full">Mô tả</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md w-full">
                        <p className="text-gray-800">{categoryDetails.mota || 'Không có mô tả'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Products in Category */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Sản phẩm trong danh mục</h3>
                  
                  {productsInCategory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Mã SP
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tên sản phẩm
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Giá
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tồn kho
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {productsInCategory.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50" onClick={(e) => handleProductClick(e, product.id)}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">#{product.id}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  {product.imageurl ? (
                                    <img 
                                      src={product.imageurl} 
                                      alt={product.tensp}
                                      className="h-10 w-10 rounded-md object-cover mr-3"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center mr-3">
                                      <ShoppingBag className="h-5 w-5 text-gray-400" />
                                    </div>
                                  )}
                                  <div className="text-sm text-gray-900">{product.tensp}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {new Intl.NumberFormat('vi-VN', { 
                                    style: 'currency', 
                                    currency: 'VND' 
                                  }).format(product.gia)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  clolers[product.trangthai]
                                  }`}>
                                  {product.trangthai}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{product.khoiluong || 0} {product.dv}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-md">
                      <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Không có sản phẩm nào trong danh mục này</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                <p className="text-lg text-gray-800 font-medium">Không tìm thấy thông tin danh mục</p>
                <p className="text-gray-500">Danh mục này có thể đã bị xóa hoặc không tồn tại</p>
              </div>
            )}
          </div>
        )}
        
        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;