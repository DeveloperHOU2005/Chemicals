import { useState, useEffect } from 'react';
import { Search, Filter, PlusCircle, Trash2, Edit, Save, X, ChevronDown, ChevronUp, User, MessageSquare, Settings, Home, LogOut, Bell, Star, Clock, CheckCircle, AlertCircle, XCircle, BarChart, PieChart, TrendingUp } from 'lucide-react';
import { PieChart as RechartsProxyPieChart, Pie, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCharts, setShowCharts] = useState(false);
  const [currentTab, setCurrentTab] = useState('list');

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    message: '',
    userId: '',
    userName: '',
    userEmail: '',
    category: 'general',
    priority: 'medium',
    status: 'new',
    rating: 0,
    createdAt: '',
    response: '',
    sentiment: 0,
  });

  // Initialize with mock data
  useEffect(() => {
    const mockFeedbacks = [
      { 
        id: 1, 
        title: 'Lỗi đăng nhập trên iOS',
        message: 'Tôi không thể đăng nhập vào ứng dụng trên iPhone 13 Pro, phiên bản iOS 15.4',
        userId: 'user123',
        userName: 'Nguyễn Văn A',
        userEmail: 'nguyenvana@example.com',
        category: 'bug',
        priority: 'high',
        status: 'open',
        rating: 2,
        createdAt: '2025-04-12',
        response: '',
        sentiment: -0.7,
      },
      { 
        id: 2, 
        title: 'Đề xuất tính năng mới',
        message: 'Tôi muốn đề xuất thêm tính năng xuất báo cáo ra file Excel',
        userId: 'user456',
        userName: 'Trần Thị B',
        userEmail: 'tranthib@example.com',
        category: 'feature',
        priority: 'medium',
        status: 'in_progress',
        rating: 4,
        createdAt: '2025-04-10',
        response: 'Chúng tôi đang xem xét tính năng này cho phiên bản tiếp theo.',
        sentiment: 0.3,
      },
      { 
        id: 3, 
        title: 'Cảm ơn đội ngũ phát triển',
        message: 'Tôi rất hài lòng với ứng dụng. Giao diện đẹp và dễ sử dụng!',
        userId: 'user789',
        userName: 'Lê Văn C',
        userEmail: 'levanc@example.com',
        category: 'compliment',
        priority: 'low',
        status: 'closed',
        rating: 5,
        createdAt: '2025-04-08',
        response: 'Cảm ơn bạn đã gửi phản hồi tích cực!',
        sentiment: 0.9,
      },
      { 
        id: 4, 
        title: 'Vấn đề về hiệu suất',
        message: 'Ứng dụng chạy rất chậm khi tôi mở nhiều tab cùng lúc',
        userId: 'user101',
        userName: 'Phạm Thị D',
        userEmail: 'phamthid@example.com',
        category: 'performance',
        priority: 'high',
        status: 'open',
        rating: 2,
        createdAt: '2025-04-11',
        response: '',
        sentiment: -0.5,
      },
      { 
        id: 5, 
        title: 'Câu hỏi về gói nâng cấp',
        message: 'Tôi muốn biết thêm về gói Premium và các tính năng đi kèm',
        userId: 'user202',
        userName: 'Hoàng Văn E',
        userEmail: 'hoangvane@example.com',
        category: 'question',
        priority: 'medium',
        status: 'closed',
        rating: 4,
        createdAt: '2025-04-05',
        response: 'Chúng tôi đã gửi chi tiết về gói Premium qua email của bạn.',
        sentiment: 0.1,
      },
      { 
        id: 6, 
        title: 'Lỗi trang thanh toán',
        message: 'Khi cố gắng thanh toán, trang bị treo và không thể hoàn tất giao dịch. Tôi đã thử lại nhiều lần nhưng vẫn không được. Rất thất vọng với trải nghiệm này!',
        userId: 'user303',
        userName: 'Vũ Minh F',
        userEmail: 'vuminhf@example.com',
        category: 'bug',
        priority: 'high',
        status: 'open',
        rating: 1,
        createdAt: '2025-04-13',
        response: '',
        sentiment: -0.8,
      },
      { 
        id: 7, 
        title: 'Giao diện mới rất tuyệt',
        message: 'Phiên bản cập nhật mới có giao diện rất đẹp và dễ sử dụng. Tôi thích cách bố trí các chức năng và màu sắc tươi sáng.',
        userId: 'user404',
        userName: 'Đỗ Hà G',
        userEmail: 'dohag@example.com',
        category: 'compliment',
        priority: 'low',
        status: 'closed',
        rating: 5,
        createdAt: '2025-04-06',
        response: 'Cảm ơn bạn đã gửi phản hồi tích cực!',
        sentiment: 0.8,
      },
      { 
        id: 8, 
        title: 'Khó tìm kiếm thông tin',
        message: 'Chức năng tìm kiếm không hoạt động chính xác. Tôi nhập từ khóa nhưng kết quả không liên quan.',
        userId: 'user505',
        userName: 'Trịnh Văn H',
        userEmail: 'trinhvanh@example.com',
        category: 'bug',
        priority: 'medium',
        status: 'in_progress',
        rating: 3,
        createdAt: '2025-04-09',
        response: 'Chúng tôi đang cải thiện thuật toán tìm kiếm.',
        sentiment: -0.3,
      },
    ];
    
    const mockNotifications = [
      { id: 1, message: 'Có 3 phản hồi mới cần xử lý', time: '5 phút trước' },
      { id: 2, message: 'Phản hồi #1028 đã được cập nhật', time: '1 giờ trước' },
      { id: 3, message: 'Nhắc nhở: 5 phản hồi đang chờ phản hồi quá 24 giờ', time: '3 giờ trước' },
    ];
    
    setFeedbacks(mockFeedbacks);
    setFilteredFeedbacks(mockFeedbacks);
    setNotifications(mockNotifications);
  }, []);

  // Filter feedbacks based on search term and status
  useEffect(() => {
    let results = feedbacks.filter(feedback => 
      (feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
       feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       feedback.userEmail.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    if (statusFilter !== 'all') {
      results = results.filter(feedback => feedback.status === statusFilter);
    }
    
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
    
    setFilteredFeedbacks(sorted);
  }, [searchTerm, feedbacks, sortField, sortDirection, statusFilter]);

  // Prepare chart data
  const prepareChartData = () => {
    // Status distribution chart
    const statusCounts = {
      'new': 0,
      'open': 0,
      'in_progress': 0,
      'closed': 0,
      'rejected': 0
    };
    
    feedbacks.forEach(feedback => {
      if (statusCounts[feedback.status] !== undefined) {
        statusCounts[feedback.status] += 1;
      }
    });
    
    const statusData = Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
      value: statusCounts[key]
    }));
    
    // Category distribution chart
    const categoryCounts = {};
    
    feedbacks.forEach(feedback => {
      if (!categoryCounts[feedback.category]) {
        categoryCounts[feedback.category] = 0;
      }
      categoryCounts[feedback.category] += 1;
    });
    
    const categoryData = Object.keys(categoryCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: categoryCounts[key]
    }));
    
    // Sentiment distribution chart
    const sentimentData = [
      { name: 'Rất tiêu cực', value: 0 },
      { name: 'Tiêu cực', value: 0 },
      { name: 'Trung lập', value: 0 },
      { name: 'Tích cực', value: 0 },
      { name: 'Rất tích cực', value: 0 }
    ];
    
    feedbacks.forEach(feedback => {
      const sentiment = feedback.sentiment;
      if (sentiment <= -0.6) {
        sentimentData[0].value += 1;
      } else if (sentiment <= -0.2) {
        sentimentData[1].value += 1;
      } else if (sentiment <= 0.2) {
        sentimentData[2].value += 1;
      } else if (sentiment <= 0.6) {
        sentimentData[3].value += 1;
      } else {
        sentimentData[4].value += 1;
      }
    });
    
    // Sentiment trend by date
    const dateMap = {};
    
    feedbacks.forEach(feedback => {
      const date = feedback.createdAt;
      if (!dateMap[date]) {
        dateMap[date] = { date, avgSentiment: 0, count: 0 };
      }
      dateMap[date].avgSentiment += feedback.sentiment;
      dateMap[date].count += 1;
    });
    
    // Calculate average and sort by date
    const sentimentTrend = Object.values(dateMap)
      .map(item => ({
        date: item.date,
        sentiment: item.avgSentiment / item.count
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      statusData,
      categoryData,
      sentimentData,
      sentimentTrend
    };
  };
  
  const chartData = prepareChartData();

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle rating change in form
  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  // Open modal for adding new feedback (for testing)
  const handleAddFeedback = () => {
    setFormData({
      id: null,
      title: '',
      message: '',
      userId: '',
      userName: '',
      userEmail: '',
      category: 'general',
      priority: 'medium',
      status: 'new',
      rating: 0,
      createdAt: new Date().toISOString().split('T')[0],
      response: '',
      sentiment: 0,
    });
    setEditMode(false);
    setIsModalOpen(true);
  };

  // Open modal for editing feedback
  const handleEditFeedback = (feedback) => {
    setFormData({ ...feedback });
    setCurrentFeedback(feedback);
    setEditMode(true);
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing feedback
      const updatedFeedbacks = feedbacks.map(feedback => 
        feedback.id === formData.id ? formData : feedback
      );
      setFeedbacks(updatedFeedbacks);
      addNotification(`Đã cập nhật phản hồi #${formData.id}`);
    } else {
      // Add new feedback (for testing)
      const newFeedback = {
        ...formData,
        id: feedbacks.length + 1,
      };
      setFeedbacks([...feedbacks, newFeedback]);
      addNotification(`Đã thêm phản hồi mới #${newFeedback.id}`);
    }
    
    setIsModalOpen(false);
  };

  // Delete feedback
  const handleDeleteFeedback = (feedbackId) => {
    const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
    setFeedbacks(updatedFeedbacks);
    addNotification(`Đã xóa phản hồi #${feedbackId}`);
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
  const StatusBadge = ({ status }) => {
    let colorClass = 'bg-gray-200 text-gray-800';
    let icon = null;
    
    if (status === 'new') {
      colorClass = 'bg-blue-100 text-blue-800';
      icon = <Clock size={14} className="mr-1" />;
    } else if (status === 'open') {
      colorClass = 'bg-yellow-100 text-yellow-800';
      icon = <AlertCircle size={14} className="mr-1" />;
    } else if (status === 'in_progress') {
      colorClass = 'bg-purple-100 text-purple-800';
      icon = <Clock size={14} className="mr-1" />;
    } else if (status === 'closed') {
      colorClass = 'bg-green-100 text-green-800';
      icon = <CheckCircle size={14} className="mr-1" />;
    } else if (status === 'rejected') {
      colorClass = 'bg-red-100 text-red-800';
      icon = <XCircle size={14} className="mr-1" />;
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass} flex items-center`}>
        {icon}
        {status.replace('_', ' ')}
      </span>
    );
  };

  // Category badge component
  const CategoryBadge = ({ category }) => {
    let colorClass = 'bg-gray-200 text-gray-800';
    
    if (category === 'bug') {
      colorClass = 'bg-red-100 text-red-800';
    } else if (category === 'feature') {
      colorClass = 'bg-blue-100 text-blue-800';
    } else if (category === 'question') {
      colorClass = 'bg-yellow-100 text-yellow-800';
    } else if (category === 'compliment') {
      colorClass = 'bg-green-100 text-green-800';
    } else if (category === 'performance') {
      colorClass = 'bg-orange-100 text-orange-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {category}
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    let colorClass = 'bg-gray-200 text-gray-800';
    
    if (priority === 'high') {
      colorClass = 'bg-red-100 text-red-800';
    } else if (priority === 'medium') {
      colorClass = 'bg-yellow-100 text-yellow-800';
    } else if (priority === 'low') {
      colorClass = 'bg-green-100 text-green-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {priority}
      </span>
    );
  };

  // Rating stars component
  const RatingStars = ({ rating, onChange }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "text-yellow-500 fill-yellow-500 cursor-pointer" : "text-gray-300 cursor-pointer"} 
            onClick={() => onChange && onChange(i + 1)}
          />
        ))}
      </div>
    );
  };

  // Sentiment indicator component
  const SentimentIndicator = ({ sentiment }) => {
    let colorClass = 'bg-gray-200';
    let label = 'Trung lập';
    
    if (sentiment <= -0.6) {
      colorClass = 'bg-red-500';
      label = 'Rất tiêu cực';
    } else if (sentiment <= -0.2) {
      colorClass = 'bg-red-300';
      label = 'Tiêu cực';
    } else if (sentiment <= 0.2) {
      colorClass = 'bg-gray-400';
      label = 'Trung lập';
    } else if (sentiment <= 0.6) {
      colorClass = 'bg-green-300';
      label = 'Tích cực';
    } else {
      colorClass = 'bg-green-500';
      label = 'Rất tích cực';
    }
    
    const percentage = ((sentiment + 1) / 2) * 100;
    
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Tiêu cực</span>
          <span>{label}</span>
          <span>Tích cực</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-2 ${colorClass}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 ml-64">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top navbar */}
        <div className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Quản lý phản hồi</h1>
          <div className="flex items-center">
            <div className="relative">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {/* Dropdown notifications */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-20 border">
                  <h3 className="px-4 py-2 text-sm font-medium text-gray-700 border-b">Thông báo</h3>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-gray-500">Không có thông báo nào</p>
                    ) : (
                      notifications.map(note => (
                        <div key={note.id} className="px-4 py-2 border-b text-sm hover:bg-gray-50">
                          <p className="text-gray-800">{note.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{note.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="ml-4 flex items-center">
              <User className="h-8 w-8 bg-blue-100 p-1 rounded-full text-blue-600" />
              <span className="ml-2 text-gray-700 font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="flex">
            <button
              className={`px-4 py-3 font-medium text-sm ${currentTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setCurrentTab('list')}
            >
              Danh sách phản hồi
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center ${currentTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setCurrentTab('analytics')}
            >
              <BarChart size={16} className="mr-2" />
              Phân tích phản hồi
            </button>
          </div>
        </div>

        {/* Main container */}
        <div className="p-6">
          {currentTab === 'list' ? (
            <>
              {/* Tools bar */}
              <div className="mb-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Tìm kiếm phản hồi..."
                      className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      className="pl-4 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="new">Mới</option>
                      <option value="open">Đang mở</option>
                      <option value="in_progress">Đang xử lý</option>
                      <option value="closed">Đã đóng</option>
                      <option value="rejected">Từ chối</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                
                <button
                  onClick={handleAddFeedback}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle size={18} className="mr-2" />
                  Thêm phản hồi mới
                </button>
              </div>

              {/* Feedbacks table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('id')}
                        >
                          <div className="flex items-center">
                            ID
                            {sortField === 'id' && (
                              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('title')}
                        >
                          <div className="flex items-center">
                            Tiêu đề
                            {sortField === 'title' && (
                              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('userName')}
                        >
                          <div className="flex items-center">
                            Người gửi
                            {sortField === 'userName' && (
                              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Thông tin
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center">
                            Trạng thái
                            {sortField === 'status' && (
                              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('createdAt')}
                        >
                          <div className="flex items-center">
                            Ngày tạo
                            {sortField === 'createdAt' && (
                              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFeedbacks.map((feedback) => (
                        <tr key={feedback.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{feedback.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {feedback.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>
                              <p className="font-medium text-gray-800">{feedback.userName}</p>
                              <p className="text-xs text-gray-500">{feedback.userEmail}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col space-y-2">
                              <CategoryBadge category={feedback.category} />
                              <PriorityBadge priority={feedback.priority} />
                              <RatingStars rating={feedback.rating} />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <StatusBadge status={feedback.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {feedback.createdAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2 justify-end">
                              <button
                                onClick={() => handleEditFeedback(feedback)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteFeedback(feedback.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredFeedbacks.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                            Không tìm thấy phản hồi nào phù hợp với tiêu chí tìm kiếm
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            // Analytics tab
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Phân tích phản hồi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats cards */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Tổng số phản hồi</h3>
                  <p className="text-2xl font-bold text-blue-700">{feedbacks.length}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-600">
                    <span className="text-green-500 font-medium flex items-center">
                      <TrendingUp size={12} className="mr-1" />
                      +12% 
                    </span>
                    <span className="ml-1">so với tháng trước</span>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Đã xử lý</h3>
                  <p className="text-2xl font-bold text-green-700">
                    {feedbacks.filter(f => f.status === 'closed').length}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-600">
                    <span className="font-medium">
                      {Math.round((feedbacks.filter(f => f.status === 'closed').length / feedbacks.length) * 100)}% 
                    </span>
                    <span className="ml-1">trên tổng số phản hồi</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Đang chờ xử lý</h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    {feedbacks.filter(f => f.status === 'open' || f.status === 'new' || f.status === 'in_progress').length}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-600">
                    <span className="font-medium">
                      {Math.round((feedbacks.filter(f => f.status === 'open' || f.status === 'new' || f.status === 'in_progress').length / feedbacks.length) * 100)}% 
                    </span>
                    <span className="ml-1">trên tổng số phản hồi</span>
                  </div>
                </div>
              </div>
              
              {/* Charts section */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status distribution chart */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Phân bố theo trạng thái</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsProxyPieChart>
                        <Pie
                          data={chartData.statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.statusData.map((entry, index) => {
                            const colors = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'];
                            return <Pie.Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                          })}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsProxyPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Category distribution chart */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Phân bố theo danh mục</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={chartData.categoryData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Số lượng" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Sentiment distribution chart */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Phân bố cảm xúc</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={chartData.sentimentData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Số lượng">
                          {chartData.sentimentData.map((entry, index) => {
                            const colors = ['#ef4444', '#f97316', '#a3a3a3', '#84cc16', '#22c55e'];
                            return <Bar.Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                          })}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Sentiment trend chart */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Xu hướng cảm xúc theo thời gian</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData.sentimentTrend}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[-1, 1]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sentiment" stroke="#3b82f6" name="Cảm xúc trung bình" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal for adding/editing feedback */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editMode ? `Chỉnh sửa phản hồi #${formData.id}` : 'Thêm phản hồi mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email người dùng
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID người dùng
                  </label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">Chung</option>
                    <option value="bug">Lỗi</option>
                    <option value="feature">Tính năng</option>
                    <option value="question">Câu hỏi</option>
                    <option value="compliment">Khen ngợi</option>
                    <option value="performance">Hiệu suất</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Độ ưu tiên
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">Mới</option>
                    <option value="open">Đang mở</option>
                    <option value="in_progress">Đang xử lý</option>
                    <option value="closed">Đã đóng</option>
                    <option value="rejected">Từ chối</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đánh giá (sao)
                  </label>
                  <div className="mt-1">
                    <RatingStars rating={formData.rating} onChange={handleRatingChange} />
                  </div>
                </div>
                
                {editMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chỉ số cảm xúc (-1 đến 1)
                    </label>
                    <input
                      type="range"
                      name="sentiment"
                      min="-1"
                      max="1"
                      step="0.1"
                      value={formData.sentiment}
                      onChange={handleInputChange}
                      className="w-full mt-1"
                    />
                    <SentimentIndicator sentiment={parseFloat(formData.sentiment)} />
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung phản hồi <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phản hồi của quản trị viên
                </label>
                <textarea
                  name="response"
                  value={formData.response}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {editMode ? 'Cập nhật' : 'Lưu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}