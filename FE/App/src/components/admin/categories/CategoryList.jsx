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