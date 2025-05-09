import React, { useState, useEffect, useContext, useMemo, use } from 'react';
import { Box, BarChart2, ArrowUp, ArrowDown, Eye, Edit, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserContext } from '../../context/AdminContext.jsx';
import Header from '../../components/Admin/Header.jsx';
import adminServices from '../../services/adminServices.js';
import Pagination from '../../components/UI/Pagination.jsx';
import LoadingComponent from '../../components/UI/Loading.jsx';
import date from '../../utils/date'; // Giả định bạn có utility function để format date
import Detail from '../../components/Admin/CategoryDetail.jsx'; // Giả định bạn có component chi tiết danh mục
import CategoryFrom from '../../components/Admin/CategoryFrom.jsx'; // Giả định bạn có component form danh mục
import ToastNotification from '../../components/UI/ToastNotification.jsx'; // Giả định bạn có component thông báo toast
import ConfirmDialog from '../../components/UI/ConfirmDialog.jsx';
import CategoryDashboard from '../../components/Admin/CategoryDashboard.jsx'
const Category = () => {
  const [activeTab, setActiveTab] = useState('category');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [details, setDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [toast, setToast] = useState(null);
  const [isDel, setDel] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Thêm state để theo dõi danh mục được chọn để xóa
  const [barDarta, setBarData] = useState([
    { name: 'Đang hoạt động', value: 0, color: '#4CAF50' },
    { name: 'Không hoạt động', value: 0, color: '#9E9E9E' },
  ]);
  const [refresh, setRefresh] = useState(0);

  const { collapsed } = useContext(UserContext);



  useEffect(() => { 
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await adminServices.getAllCategories();
        setCategories(response.category);
        setTotalItems(response.total);

        let active = 0
        response.category.forEach(element => {
          element.status == "active" ? active++ : null
        });

        setActiveCategory(active)
        setBarData([
          { name: 'Đang hoạt động', value: active, color: '#4CAF50' },
          { name: 'Không hoạt động', value: response.total - active, color: '#9E9E9E' },
        ])
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Không thể tải danh sách danh mục. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [refresh]);

  useEffect(() => {
    if (!isDel) return;  
    const doDelete = async () => {
      try {
        const res = await adminServices.deleteCategory(isDel.id);
        if (res && res.data && res.data.status) {
          showToast("success", "Thành công", "Xóa danh mục thành công")
          setCategories(prev => prev.filter(e => e.id !== isDel.id));
          setRefresh(prev => prev + 1);
        } else {
        }
      } catch (error) {
        showToast("error", "Thất bại", "Có lỗi xảy ra trong quá trình xóa")
      } finally {
        setDel(null);
      }
    };
    doDelete();
  }, [isDel]);

  useEffect(() => {
    // Kiểm tra xem trang hiện tại có hợp lệ không sau khi dữ liệu thay đổi
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  }, [totalItems, itemsPerPage, currentPage]);

  // Hàm sắp xếp dữ liệu
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function để so sánh giá trị khi sắp xếp
  const compareValues = (key, order = 'asc') => {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // Trường hợp không có thuộc tính cần so sánh
        return 0;
      }

      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return (order === 'desc') ? (comparison * -1) : comparison;
    };
  };

  // Áp dụng sắp xếp cho dữ liệu categories
  const sortedCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    
    const sortableCategories = [...categories];
    return sortableCategories.sort(compareValues(sortConfig.key, sortConfig.direction));
  }, [categories, sortConfig]);

  // Xử lý xem chi tiết
  const handleViewDetail = (category) => {
    setDetails(category)
    setShowDetails(true);
  };

  // Xử lý chỉnh sửa
  const handleEdit = (category) => {
    setDetails(category)
    setShowEdit(true);
  };

  // Xử lý xóa
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

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = () => {
    setDetails(null)
    setShowEdit(true);
  };
  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const categoryCurent = sortedCategories.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý thay đổi trang
  const handlePageChange = (pageNumber, newItemsPerPage) => {
    setCurrentPage(pageNumber);
    if (newItemsPerPage) {
      setItemsPerPage(newItemsPerPage);
    }
  };

  const handleSaveCategory = (category) => {
    try {
      if (details !== null) {
        // Trường hợp cập nhật
        // Kiểm tra xem có đang tạo vòng lặp tham chiếu không (danh mục con là cha của danh mục cha)
        const hasCircularReference = checkCircularReference(categories, category.id, category.danhmuccha);
        if (hasCircularReference) {
          showToast('error', 'Lỗi tham chiếu', 'Không thể chọn danh mục này làm danh mục cha (tạo vòng lặp).');
          return;
        }

        // Cập nhật danh mục trong state
        setCategories((prev) => 
          prev.map((c) => 
            c.id === category.id ? 
            {
              ...c,
              tendanhmuc: category.tendanhmuc || c.tendanhmuc,
              mota: category.mota || c.mota,
              adddate: category.adddate || c.adddate,
              total: category.total || c.total,
              danhmuccha: category.danhmuccha || c.danhmuccha,
              status: category.status || c.status,
            } : c
          )
        );
        showToast('success', 'Thành công', 'Cập nhật danh mục thành công.');
        setRefresh(prev => prev + 1);
      } else {
        // Trường hợp thêm mới
        // Kiểm tra xem danhmuccha có tồn tại không
        if (category.danhmuccha && category.danhmuccha !== 0) {
          const parentExists = categories.some(c => c.id === Number(category.danhmuccha));
          if (!parentExists) {
            showToast('error', 'Lỗi dữ liệu', 'Danh mục cha không tồn tại.');
            return;
          }
        }

        // Thêm danh mục mới vào state
        const newCategory = {
          ...category,
          id: category.id || Date.now(), // Sử dụng ID từ API hoặc tạo ID tạm thời
          danhmuccha: Number(category.danhmuccha) || 0
        };
        
        setCategories((prev) => [...prev, newCategory]);
        showToast('success', 'Thành công', 'Thêm danh mục mới thành công.');
        setRefresh(prev => prev + 1);
      }
      
      setShowEdit(false);
    } catch (error) {
      console.error('Error handling category save:', error);
      showToast('error', 'Lỗi xử lý', 'Đã xảy ra lỗi khi xử lý dữ liệu.');
    }
  };

  const checkCircularReference = (allCategories, currentId, parentId) => {
    if (!parentId || parentId === 0) return false;
    if (currentId === Number(parentId)) return true;
    
    // Tìm danh mục cha
    const parent = allCategories.find(c => c.id === Number(parentId));
    if (!parent) return false;
    
    // Kiểm tra xem danh mục cha có tham chiếu ngược lại không
    return checkCircularReference(allCategories, currentId, parent.danhmuccha);
  };


  return (
    <div className={`flex flex-col h-screen ${collapsed ? "ml-24" : "ml-72"} gap-4`}>
      <Header title="Quản lý danh mục" description="Quản lý danh mục hệ thống, thống kê"/>

      {/* Main content */}
      <div className="mt-28 px-6">
        {/* Tab navigation */}
        <div className="flex mb-4 border-b border-gray-200 gap-6">
          <button 
            className={`flex items-center ${activeTab === 'category' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'} py-4`} 
            onClick={() => setActiveTab('category')}
          >
            <Box size={18} className="mr-2" /> 
            <span>Danh mục</span> 
          </button>
          <button 
            className={`flex items-center ${activeTab === 'statistic' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'} py-4`} 
            onClick={() => setActiveTab('statistic')}
          >
            <BarChart2 size={18} className="mr-2" />
            Thống kê
          </button>
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 mb-4 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Main content area */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {activeTab === 'category' && (
            <div className="flex flex-col">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Danh sách danh mục</h2>
                  <p className="text-sm text-gray-600 mt-1">Quản lý tất cả danh mục trong hệ thống</p>
                </div>
                {/* Có thể thêm nút thêm mới ở đây */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={()=>handleAdd()}
                >
                  Thêm danh mục
                </button>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <LoadingComponent type={'pulse'} title={"Đang tải dữ liệu danh mục...."}/> // Hoặc bạn có thể sử dụng một component loading khác
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
                        <tr key={c.id} className="hover:bg-gray-50" onClick={(e) => {handleViewDetail(c)}}>
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
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEdit(c)
                                }}
                                className="text-green-600 hover:text-green-900"
                                title="Chỉnh sửa"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                title="Xóa"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(c)
                                }}
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
              
              <Pagination 
                title="danh mục"
                totalItems={totalItems} 
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                className="border-t-0"
              />
            </div>
          )}
          
          {activeTab === 'statistic' && (
            <CategoryDashboard />
          )}
        </div>
      </div>

      {showDetails && (
        <Detail 
          onClose={() => setShowDetails(false)}
          selectedCategory={details}
        />
      )}

      {showEdit && (
        <CategoryFrom
          category={categories}
          onClose={() => setShowEdit(false)}
          isEdit = {details !== null}
          selectedCategory={details || {}}
          onSave={handleSaveCategory}
        />
      )}

      {toast && (
          <ToastNotification
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={3000}
            onClose={() => setToast(null)}
            className='z-50'
          />
      )}

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

export default Category;