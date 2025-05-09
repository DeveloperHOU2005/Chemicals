import { useState, useEffect } from 'react';
import { Search, PlusCircle, Trash2, Edit, Save, X, ChevronDown, ChevronUp, User, Users, Settings, Home, LogOut, Bell } from 'lucide-react';
import accountApi from '../../../services/accountApi.js';

export default function AccountAdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('ten_dn');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    ten_dn: '',
    email: '',
    vaitro: 'user',
    status: 'active',
    ngaytao: '',
  });

  // Initialize with mock data
  useEffect(() => {
    const load = async ()=>{
      const mockUsers = await accountApi.getFullAccount();
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    }
    load();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const results = users.filter(user => 
      user.ten_dn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.vaitro.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort results
    const sorted = [...results].sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase();
      const bValue = b[sortField]?.toString().toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredUsers(sorted);
  }, [searchTerm, users, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for adding new user
  const handleAddUser = () => {
    setFormData({
      id: null,
      ten_dn: '',
      email: '',
      vaitro: 'Người dùng',
      trangthai: 'Hoạt động',
      ngaytao: new Date().toISOString().split('T')[0],
    });
    setEditMode(false);
    setIsModalOpen(true);
  };

  // Open modal for editing user
  const handleEditUser = (user) => {
    setFormData({ ...user });
    setCurrentUser(user);
    setEditMode(true);
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === formData.id ? formData : user
      );
      setUsers(updatedUsers);
      addNotification(`Đã cập nhật tài khoản ${formData.ten_dn}`);
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: users.length + 1,
      };
      setUsers([...users, newUser]);
      addNotification(`Đã tạo tài khoản mới ${formData.ten_dn}`);
    }
    
    setIsModalOpen(false);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(user => user.id === userId);
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    addNotification(`Đã xóa tài khoản ${userToDelete.ten_dn}`);
  };

  // Add notification
  const addNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      time: 'Vừa xong'
    };
    setNotifications([newNotification, ...notifications]);
  };

  // Status badge component
  const StatusBadge = ({ trangthai }) => {
    let colorClass = 'bg-gray-200 text-gray-800';
    
    if (trangthai === 'Hoạt động') {
      colorClass = 'bg-green-100 text-green-800';
    } else if (trangthai === 'Bị chặn') {
      colorClass = 'bg-red-100 text-red-800';
    } else if (trangthai === 'Đang chờ') {
      colorClass = 'bg-yellow-100 text-yellow-800';
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {trangthai}
      </span>
    );
  };

  const FormatDate = ({ngaytao}) => {
    const isoDate = ngaytao;
    const date = new Date(isoDate);
    const formatted = date.toLocaleDateString("vi-VN"); // "04/01/2024"
    return (
      <span>
        {formatted}
      </span>
      )

  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Main container */}
        <div className="p-6">
          {/* Tools bar */}
          <div className="mb-6 flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddUser}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" />
              Cấp tài khoản mới
            </button>
          </div>

          {/* Users table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('ten_dn')}
                  >
                    <div className="flex items-center">
                      Tên tài khoản
                      {sortField === 'ten_dn' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">
                      Email
                      {sortField === 'email' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('vaitro')}
                  >
                    <div className="flex items-center">
                      Vai trò
                      {sortField === 'vaitro' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Trạng thái
                      {sortField === 'trangthai' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('ngaytao')}
                  >
                    <div className="flex items-center">
                      Ngày tạo
                      {sortField === 'ngaytao' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.ten_dn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.vaitro}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge trangthai={user.trangthai} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <FormatDate ngaytao={user.ngaytao}/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit size={18} />
                      </button>
                      {/* <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button> */}
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      Không tìm thấy tài khoản nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User form modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editMode ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="ten_dn" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên tài khoản
                </label>
                <input
                  type="text"
                  id="ten_dn"
                  name="ten_dn"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.ten_dn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="vaitro" className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <select
                  id="vaitro"
                  name="vaitro"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.vaitro}
                  onChange={handleInputChange}
                >
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.trangthai}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {editMode ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}