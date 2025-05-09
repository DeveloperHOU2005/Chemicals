import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import adminServices from '../../services/adminServices';

const CategoryForm = ({onClose, isEdit, category, selectedCategory, onSave}) => {
    const initialFormState = {
      id: '',
      tendanhmuc: '',
      mota: '',
      status: 'active',
      danhmuccha: 0,
      idParent: 0
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [parentCategories, setParentCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Lọc danh mục cha để tránh chọn chính nó làm cha
        const fetchParentCategories = () => {
          const data = [];
          if (isEdit && selectedCategory && selectedCategory.id) {
            category.forEach((item) => {
              // Kiểm tra đúng ID và đảm bảo không tạo vòng lặp tham chiếu
              const itemParentId = item.danhmuccha || item.parent || item.idParent || 0;
              
              // Không chọn chính nó hoặc các danh mục con của nó làm cha
              if (item.id !== selectedCategory.id && !isChildOf(category, item.id, selectedCategory.id)) {
                data.push({id: item.id, name: item.tendanhmuc || item.name});
              }
            });
          } else {
            category.forEach((item) => {
              data.push({id: item.id, name: item.tendanhmuc || item.name});
            });
          }
          setParentCategories(data);
        };
        
        fetchParentCategories();
      }, [category, selectedCategory, isEdit]);

      
    
    // Kiểm tra xem category có phải là con của potentialParent không
    const isChildOf = (allCategories, categoryId, potentialParentId) => {
      const category = allCategories.find(c => c.id === categoryId);
      if (!category) return false;
      
      // Đảm bảo so sánh cùng kiểu dữ liệu
      const parentId = Number(category.danhmuccha || category.parent || 0);
      if (parentId === Number(potentialParentId)) return true;
      if (parentId === 0) return false;
      
      return isChildOf(allCategories, parentId, potentialParentId);
    };
    
    // Cập nhật form data khi category prop thay đổi hoặc khi chuyển sang chế độ chỉnh sửa
    useEffect(() => {
        if (isEdit && selectedCategory) {
          // Xác định danh mục cha một cách nhất quán
        
          setFormData(selectedCategory);
        } else {
          setFormData(initialFormState);
        }
      }, [isEdit, selectedCategory]);

    const handleChange = (e) => {
        
        const { name, value } = e.target;
  
    // Chuyển đổi giá trị danhmuccha thành số nếu có thể
        let processedValue = value;
        if (name === 'idParent') {
            processedValue = value === '0' || value === '' ? 0 : parseInt(value, 10);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
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
        
        // Kiểm tra vòng lặp tham chiếu danh mục cha
        if (isEdit && Number(formData.danhmuccha) !== 0) {
            const hasCircularReference = isChildOf(category, Number(formData.danhmuccha), formData.id);
            if (hasCircularReference) {
            newErrors.danhmuccha = 'Không thể chọn danh mục này làm danh mục cha (tạo vòng lặp)';
            }
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
          const categoryData = {
            id: formData.id,
            name: formData.tendanhmuc,
            description: formData.mota,
            status: formData.status,
            paren: parseInt(formData.idParent) || 0,  // Đảm bảo parent là số nguyên
          };
          
          let response;
          if (isEdit) {
            response = await adminServices.updateCategory(categoryData);
          } else {
            response = await adminServices.addCategory(categoryData);
          }
          
          if (response && (response.status === true || response.status === 200)) {
            // Chuẩn bị dữ liệu để trả về cho parent component
            const updatedData = {
              id: response.category ? response.category.id : formData.id,
              tendanhmuc: formData.tendanhmuc,
              mota: formData.mota,
              status: formData.status,
              danhmuccha: parseInt(formData.danhmuccha) || 0,
              // Giữ lại các trường khác nếu là cập nhật
              ...(isEdit && {
                adddate: selectedCategory.adddate,
                total: selectedCategory.total
              })
            };
            
            onSave(updatedData);
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
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            
            onClick={(e)=>{e.stopPropagation()}}>
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
                  Mô tả
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
                  id="idParent"
                  name="idParent"
                  value={formData.idParent}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.danhmuccha ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="0">Không có</option>
                  {parentCategories.map(cat => (
                    <option key={cat.id} value={cat.id} >
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.danhmuccha && (
                  <p className="mt-1 text-sm text-red-500">{errors.danhmuccha}</p>
                )}
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
  
export default CategoryForm;