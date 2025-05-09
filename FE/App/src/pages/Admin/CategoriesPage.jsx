import React, { useState, useEffect } from 'react';
import { 
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Search, 
  ChevronDown, 
  Edit, 
  Trash2, 
  Eye,
  ArrowUp,
  ArrowDown,
  Plus,
} from 'lucide-react';

import categoryApi from '../../services/categoryApi';
import date from "../../types/date";
import SuccessNotification from '../../components/common/ConfirmDialog';
import CategoryEditPage from './Category/CategoryEditPage';
import Detail from './Category/Detail';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Tabs from '../../components/admin/categories/Tabs.jsx';
import Header from '../../components/common/admin/Header.jsx';

const CategoryManagementDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'adddate', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState(0)
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const categoryPerPage = 5;

  const [isDel, setDel] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const [notificationBox, setNotificationBox] = useState(<></>);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [action, setAction] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [activeTab, setActiveTab] = useState('category');
  
  const statusData = [
    { name: 'Hoạt động', value: category.filter(c => c.status === 'active').length },
    { name: 'Vô hiệu', value: category.filter(c => c.status === 'inactive').length},
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#F44336'];

  useEffect(() => {
    const load = async () => {
      try {
        const categoryData = await categoryApi.getAllCategories();
        setCategory(categoryData.category);
        setFilteredCategory(categoryData.category);
        setTotal(categoryData.total);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!isDel) return;  
    const doDelete = async () => {
      try {
        const res = await categoryApi.deleteCategory(isDel.id);
        if (res && res.data && res.data.status) {
          setSuccess(true);
          setCategory(prev => prev.filter(e => e.id !== isDel.id));
          
          // Update notification message
          setNotificationBox(<SuccessNotification message="Xóa danh mục thành công!" />);
        } else {
          setSuccess(false);
        }
      } catch (error) {
        setSuccess(false);
        console.error('Error when deleting:', error);
      } finally {
        // Reset toDelete to avoid unnecessary useEffect calls
        setDel(null);
      }
    };
    doDelete();
  }, [isDel]);

  useEffect(() => {
    // Change notificationBox whenever isSuccess changes
    if (isSuccess) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setNotificationBox(<></>);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Handle search
  useEffect(() => {
    // Search by ID or category name
    const result = category.filter(c => 
      c.id?.toString().includes(searchTerm) || 
      c.tendanhmuc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filter by status
    let filtered = result;
    if (filterStatus !== 'all') {
      filtered = result.filter(c => c.status === filterStatus);
    }
    
    // Apply current sorting to search results
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredCategory(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, category, filterStatus, sortConfig]);
  
  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAdd = () => {
    setAction(true);
    setIsEdit(false);
    setEditCategory(null);
  };

  const handleEdit = (c) => {
    setIsEdit(true);
    setEditCategory(c);
    setAction(true);
  };

  const handleDelete = (c) => {
    setSelectedCategory(c);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      setDel(selectedCategory);
      setShowConfirmDialog(false);
      setSelectedCategory(null);
    }
  };

  const handleViewDetail = (c) => {
    setSelectedDetail(c);
    setDetailVisible(true);
  };

  const closeDetail = () => {
    setDetailVisible(false);
    setSelectedDetail(null);
  };

  // Handle pagination
  const indexOfLastOrder = currentPage * categoryPerPage;
  const indexOfFirstOrder = indexOfLastOrder - categoryPerPage;
  const categoryCurent = filteredCategory.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredCategory.length / categoryPerPage);

  const updateCategoryList = (updatedCategory) => {
    if (updatedCategory) {
      // If we're editing, update the existing category
      if (isEdit && editCategory) {
        setCategory(prev => 
          prev.map(c => c.id === updatedCategory.id ? updatedCategory : c)
        );
      } 
      // If we're adding, add the new category to the list
      else {
        setCategory(prev => [...prev, updatedCategory]);
      }
      setSuccess(true);
      setNotificationBox(
        <SuccessNotification 
          message={isEdit ? "Cập nhật danh mục thành công!" : "Thêm danh mục thành công!"} 
        />
      );
    }
    setAction(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 ml-64">
      {/* Header */}
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h2>
            <p className="mt-3 text-sm text-gray-500">
              Quản lý danh mục hệ thống, thống kê
            </p>
          </div>
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <main className="px-4 mx-auto max-w-7xl">
        {/* Thẻ thống kê */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng danh mục</p>
                <p className="text-2xl font-semibold text-gray-900">{total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Danh mục hoạt động</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {category.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Danh mục vô hiệu</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {category.filter(c => c.status === 'inactive').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Biểu đồ */}
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-1">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Trạng thái danh mục</h2>
            <div className="flex h-72 gap-2">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center w-1/4">
                {statusData.map((entry, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div 
                      className="w-4 h-4 mr-2 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="mr-2">{entry.name}:</span>
                    <span className="font-semibold">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bảng danh mục */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row justify-between items-center md:space-y-0 space-y-4">
            <h2 className="text-lg font-semibold">Danh sách danh mục</h2>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục..."
                  className="w-full px-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative w-full md:w-auto">
                <select
                  className="appearance-none w-full md:w-48 px-4 py-2 border rounded-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Vô hiệu</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button 
                onClick={handleAdd}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg w-full md:w-auto justify-center">
                <Plus className="h-5 w-5 mr-2" />
                Thêm danh mục
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('id')}
                    >
                      <div className="flex items-center">
                        Mã danh mục
                        {sortConfig.key === 'id' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('tendanhmuc')}
                    >
                      <div className="flex items-center">
                        Tên danh mục
                        {sortConfig.key === 'tendanhmuc' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('adddate')}
                    >
                      <div className="flex items-center">
                        Ngày thêm
                        {sortConfig.key === 'adddate' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('total')}
                    >
                      <div className="flex items-center">
                        Tổng sản phẩm
                        {sortConfig.key === 'total' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('status')}
                    >
                      <div className="flex items-center">
                        Trạng thái
                        {sortConfig.key === 'status' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('danhmuccha')}
                    >
                      <div className="flex items-center">
                        Danh mục cha
                        {sortConfig.key === 'danhmuccha' && (
                          sortConfig.direction === 'asc' ? 
                          <ArrowUp className="w-4 h-4 ml-1" /> : 
                          <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categoryCurent.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{c.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{c.tendanhmuc}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date.formatDate(c.adddate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{c.total}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          c.status === 'active' ? 'bg-green-100 text-green-800' :
                          c.status === 'pendding' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {c.status === 'active' ? 'Hoạt động' : 
                           c.status === 'pendding' ? 'Chờ xử lý' : 'Vô hiệu'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{c.danhmuccha || 'Không có'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleViewDetail(c)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(c)}
                            className="text-green-600 hover:text-green-900"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            title="Xóa"
                            onClick={() => handleDelete(c)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Phân trang */}
          {!loading && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{indexOfFirstOrder + 1}</span> đến <span className="font-medium">
                      {indexOfLastOrder > filteredCategory.length ? filteredCategory.length : indexOfLastOrder}
                    </span> trong số <span className="font-medium">{filteredCategory.length}</span> danh mục
                  </p>
                </div>
                
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Notifications */}
      {notificationBox}
      
      {/* Edit/Add Component */}
      {action && (
        <CategoryEditPage 
          isOpen={action}
          onClose={() => setAction(false)}
          isEdit={isEdit}
          category={editCategory}
          onSave={updateCategoryList}
        />
      )}
      
      {/* Detail Component */}
      {detailVisible && selectedDetail && (
        <Detail 
          isOpen={detailVisible}
          onClose={closeDetail}
          selectedCategory={selectedDetail}
        />
      )}
      
      {/* Confirm Delete Dialog */}
      {showConfirmDialog && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.tendanhmuc}" không?`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirmDialog(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoryManagementDashboard;