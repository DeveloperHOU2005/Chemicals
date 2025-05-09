// ===== Cấu trúc thư mục =====
// src/
// ├── components/
// │   ├── admin/
// │   │   ├── categories/
// │   │   │   ├── CategoryList.jsx
// │   │   │   ├── CategoryForm.jsx
// │   │   │   ├── CategorySearchFilter.jsx
// │   │   │   ├── CategoryStatistics.jsx
// │   │   │   └── CategoryItem.jsx
// │   │   └── common/
// │   │       ├── DeleteConfirmModal.jsx
// │   │       ├── Pagination.jsx
// │   │       └── SearchBar.jsx
// │   └── layout/
// │       ├── AdminLayout.jsx
// │       └── Sidebar.jsx
// ├── pages/
// │   └── admin/
// │       ├── categories/
// │       │   ├── CategoriesPage.jsx
// │       │   ├── CategoryCreatePage.jsx
// │       │   ├── CategoryEditPage.jsx
// │       │   └── CategoryStatisticsPage.jsx
// └── services/
//     └── categoryService.js

// src/services/categoryService.js
const API_URL = '/api/admin/categories';

export const categoryService = {
  // Lấy danh sách danh mục
  getAllCategories: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${queryParams}`);
    return await response.json();
  },

  // Thêm danh mục mới
  addCategory: async (categoryData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    });
    return await response.json();
  },

  // Lấy chi tiết một danh mục
  getCategoryById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  },

  // Cập nhật danh mục
  updateCategory: async (id, categoryData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    });
    return await response.json();
  },

  // Xóa danh mục
  deleteCategory: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  // Tìm kiếm danh mục
  searchCategories: async (term) => {
    const response = await fetch(`${API_URL}/search/find?term=${term}`);
    return await response.json();
  },

  // Thống kê tổng quan
  getStatistics: async () => {
    const response = await fetch(`${API_URL}/statistics/overview`);
    return await response.json();
  },

  // Danh mục phổ biến
  getPopularCategories: async () => {
    const response = await fetch(`${API_URL}/statistics/popular`);
    return await response.json();
  },

  // Danh mục trống
  getEmptyCategories: async () => {
    const response = await fetch(`${API_URL}/statistics/empty`);
    return await response.json();
  }
};

// src/components/admin/categories/CategoryList.jsx
import { useState, useEffect } from 'react';
import { categoryService } from '../../../services/categoryService';
import CategoryItem from './CategoryItem';
import SearchBar from '../../common/SearchBar';
import Pagination from '../../common/Pagination';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [page, searchTerm]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (searchTerm) {
        const searchResult = await categoryService.searchCategories(searchTerm);
        setCategories(searchResult.data || []);
        setTotalPages(searchResult.totalPages || 1);
      } else {
        const result = await categoryService.getAllCategories(params);
        setCategories(result.data || []);
        setTotalPages(result.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await categoryService.deleteCategory(id);
        fetchCategories(); // Refresh list after delete
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Danh mục</h2>
        <Link
          to="/admin/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          <span>Thêm danh mục</span>
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Tìm kiếm danh mục..." />

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Không tìm thấy danh mục nào</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Tên danh mục</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Số sản phẩm</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Trạng thái</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <CategoryItem 
                    key={category.id} 
                    category={category} 
                    onDelete={() => handleDelete(category.id)} 
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </>
      )}
    </div>
  );
}

// src/components/admin/categories/CategoryItem.jsx
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

export default function CategoryItem({ category, onDelete }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4 text-gray-700">{category.id}</td>
      <td className="py-3 px-4 text-gray-700 font-medium">{category.name}</td>
      <td className="py-3 px-4 text-gray-700">{category.productCount || 0}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {category.active ? 'Hoạt động' : 'Vô hiệu'}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex justify-center space-x-2">
          <Link 
            to={`/admin/categories/edit/${category.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </Link>
          <button 
            onClick={() => onDelete(category.id)} 
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// src/components/admin/categories/CategoryForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '../../../services/categoryService';

export default function CategoryForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      fetchCategoryData();
    }
  }, [isEdit, id]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const categoryData = await categoryService.getCategoryById(id);
      setFormData({
        name: categoryData.name || '',
        description: categoryData.description || '',
        active: categoryData.active !== undefined ? categoryData.active : true
      });
    } catch (error) {
      setError('Không thể tải dữ liệu danh mục');
      console.error('Error fetching category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isEdit) {
        await categoryService.updateCategory(id, formData);
      } else {
        await categoryService.addCategory(formData);
      }
      navigate('/admin/categories');
    } catch (error) {
      setError('Có lỗi xảy ra khi lưu danh mục');
      console.error('Error saving category:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Tên danh mục *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Kích hoạt danh mục</span>
          </label>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : isEdit ? 'Cập nhật' : 'Tạo danh mục'}
          </button>
        </div>
      </form>
    </div>
  );
}
