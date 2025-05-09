import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import categoryApi from '../../../services/categoryApi';

const CategoryEditPage = ({ isOpen, onClose, isEdit, category, onSave }) => {
  const initialFormState = {
    id: '',
    tendanhmuc: '',  // Frontend field
    mota: '',        // Frontend field
    status: 'active',
    danhmuccha: 0,
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [parentCategories, setParentCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        if (response.category && Array.isArray(response.category)) {
          // Lọc ra danh mục đang chỉnh sửa (nếu đang trong chế độ chỉnh sửa)
          const filteredCategories = isEdit && category 
            ? response.category.filter(cat => cat.id !== category.id) 
            : response.category;
          setParentCategories(filteredCategories);
        } else if (Array.isArray(response)) {
          // Lọc ra danh mục đang chỉnh sửa (nếu đang trong chế độ chỉnh sửa)
          const filteredCategories = isEdit && category 
            ? response.filter(cat => cat.id !== category.id) 
            : response;
          setParentCategories(filteredCategories);
        } else {
          console.error('Cấu trúc dữ liệu không như mong đợi:', response);
          setParentCategories([]);
        }
      } catch (error) {
        console.error('Error fetching parent categories:', error);
      }
    };
    
    fetchParentCategories();
  }, [isEdit, category]);
  
  // Cập nhật form data khi category prop thay đổi hoặc khi chuyển sang chế độ chỉnh sửa
  useEffect(() => {
    if (isEdit && category) {
      setFormData({
        id: category.id || '',
        tendanhmuc: category.tendanhmuc || category.name || '',  // Hỗ trợ cả hai trường hợp
        mota: category.mota || category.description || '',       // Hỗ trợ cả hai trường hợp
        status: category.status || 'active',
        danhmuccha: category.danhmuccha || category.paren || 0
      });
    } else {
      setFormData(initialFormState);
    }
  }, [isEdit, category]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tendanhmuc.trim()) {
      newErrors.tendanhmuc = 'Tên danh mục không được để trống';
    }
    
    if (!formData.mota || !formData.mota.trim()) {
      newErrors.mota = 'Mô tả không được để trống';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Map frontend field names to backend expected field names
      const categoryData = {
        id: formData.id,
        name: formData.tendanhmuc,       // Map tendanhmuc to name
        description: formData.mota,      // Map mota to description
        status: formData.status,
        paren: parseInt(formData.danhmuccha) || 0,  // Chuyển đổi sang số và mặc định là 0
      };
      
      let response;
      if (isEdit) {
        response = await categoryApi.updateCategory(categoryData);
      } else {
        response = await categoryApi.addCategory(categoryData);
      }
      
      console.log('Response from API:', response);
      if (response && (response.status === true || response.status === undefined)) {
        onSave(response.data || formData);  // Sử dụng dữ liệu từ response nếu có
        onClose();
      } else {
        setErrors({ submit: (response && response.message) || 'Có lỗi xảy ra. Vui lòng thử lại.' });
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setErrors({ submit: 'Đã xảy ra lỗi khi lưu danh mục. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Category Name */}
            <div>
              <label htmlFor="tendanhmuc" className="block text-sm font-medium text-gray-700 mb-1">
                Tên danh mục <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tendanhmuc"
                name="tendanhmuc"
                value={formData.tendanhmuc}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.tendanhmuc ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập tên danh mục"
              />
              {errors.tendanhmuc && (
                <p className="mt-1 text-sm text-red-500">{errors.tendanhmuc}</p>
              )}
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="mota" className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <textarea
                id="mota"
                name="mota"
                value={formData.mota}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md ${errors.mota ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập mô tả về danh mục"
              ></textarea>
              {errors.mota && (
                <p className="mt-1 text-sm text-red-500">{errors.mota}</p>
              )}
            </div>
            
            {/* Parent Category */}
            <div>
              <label htmlFor="danhmuccha" className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục cha
              </label>
              <select
                id="danhmuccha"
                name="danhmuccha"
                value={formData.danhmuccha}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="0">Không có</option>
                {parentCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.tendanhmuc || cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Vô hiệu</option>
              </select>
            </div>
            
            {/* Form Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {errors.submit}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang lưu...
                </span>
              ) : (
                <span>{isEdit ? 'Cập nhật danh mục' : 'Thêm danh mục'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditPage;