import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  Edit, 
  Truck,
  Box,
  Calendar,
  Clock,
  MapPin,
  User,
  Clipboard,
  AlertTriangle,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  FileText,
  Eye
} from 'lucide-react';

const ShippingManagementDashboard = () => {
  // States
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showShipmentDetail, setShowShipmentDetail] = useState(false);
  const [showTrackingMap, setShowTrackingMap] = useState(false);
  const shipmentsPerPage = 5;

  // Dữ liệu biểu đồ
  const deliveryPerformanceData = [
    { name: 'T1', onTime: 85, delayed: 15 },
    { name: 'T2', onTime: 88, delayed: 12 },
    { name: 'T3', onTime: 92, delayed: 8 },
    { name: 'T4', onTime: 90, delayed: 10 },
    { name: 'T5', onTime: 82, delayed: 18 },
    { name: 'T6', onTime: 78, delayed: 22 },
    { name: 'T7', onTime: 84, delayed: 16 },
    { name: 'T8', onTime: 89, delayed: 11 },
    { name: 'T9', onTime: 91, delayed: 9 },
    { name: 'T10', onTime: 87, delayed: 13 },
    { name: 'T11', onTime: 93, delayed: 7 },
    { name: 'T12', onTime: 95, delayed: 5 },
  ];

  const shipmentStatusData = [
    { name: 'Đã giao', value: 62 },
    { name: 'Đang vận chuyển', value: 25 },
    { name: 'Đang xử lý', value: 8 },
    { name: 'Bị hoãn', value: 3 },
    { name: 'Đã hủy', value: 2 },
  ];

  const transportMethodData = [
    { name: 'Đường bộ', value: 58 },
    { name: 'Đường hàng không', value: 22 },
    { name: 'Đường biển', value: 15 },
    { name: 'Đường sắt', value: 5 },
  ];

  const STATUS_COLORS = {
    'Đã giao': '#22C55E',
    'Đang vận chuyển': '#3B82F6',
    'Đang xử lý': '#F59E0B',
    'Bị hoãn': '#EC4899',
    'Đã hủy': '#EF4444',
  };

  const TRANSPORT_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F97316'];

  // Tạo dữ liệu shipment mẫu
  useEffect(() => {
    const generateShipmentData = () => {
      const statuses = ['Đã giao', 'Đang vận chuyển', 'Đang xử lý', 'Bị hoãn', 'Đã hủy'];
      const transportMethods = ['Đường bộ', 'Đường hàng không', 'Đường biển', 'Đường sắt'];
      const couriers = ['VN Express', 'J&T Express', 'GHN', 'GHTK', 'DHL', 'FedEx'];
      const cities = [
        'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
        'Nha Trang', 'Huế', 'Vũng Tàu', 'Đà Lạt', 'Hạ Long'
      ];
      
      const generatedShipments = Array(40).fill().map((_, i) => {
        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));
        
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const transportMethod = transportMethods[Math.floor(Math.random() * transportMethods.length)];
        const courier = couriers[Math.floor(Math.random() * couriers.length)];
        
        const fromCity = cities[Math.floor(Math.random() * cities.length)];
        let toCity;
        do {
          toCity = cities[Math.floor(Math.random() * cities.length)];
        } while (toCity === fromCity);
        
        const estimatedDays = Math.floor(Math.random() * 7) + 1;
        
        const deliveryDate = new Date(createdDate);
        deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
        
        // Thêm các điểm dừng ngẫu nhiên nếu đang vận chuyển
        const trackingHistory = [];
        if (status === 'Đang vận chuyển' || status === 'Đã giao') {
          const steps = Math.floor(Math.random() * 5) + 2;
          for (let j = 0; j < steps; j++) {
            const stepDate = new Date(createdDate);
            stepDate.setDate(stepDate.getDate() + Math.floor(j * estimatedDays / steps));
            
            let location, description;
            if (j === 0) {
              location = fromCity;
              description = 'Đã nhận hàng từ người gửi';
            } else if (j === steps - 1 && status === 'Đã giao') {
              location = toCity;
              description = 'Đã giao hàng thành công cho người nhận';
            } else {
              location = cities[Math.floor(Math.random() * cities.length)];
              const actions = [
                'Đã đến trung tâm phân loại', 
                'Đang vận chuyển', 
                'Đã đến kho trung chuyển',
                'Đang giao hàng'
              ];
              description = actions[Math.floor(Math.random() * actions.length)];
            }
            
            trackingHistory.push({
              date: stepDate.toISOString(),
              location,
              description
            });
          }
        }
        
        return {
          id: `SHP-${String(i + 1001).padStart(6, '0')}`,
          orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          customer: `Khách hàng ${i + 1}`,
          phone: `098${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
          fromAddress: `${Math.floor(Math.random() * 200) + 1} Đường ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}, ${fromCity}`,
          toAddress: `${Math.floor(Math.random() * 200) + 1} Đường ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}, ${toCity}`,
          weight: parseFloat((Math.random() * 20 + 0.1).toFixed(1)),
          createdAt: createdDate.toISOString(),
          estimatedDelivery: deliveryDate.toISOString(),
          status: status,
          transportMethod: transportMethod,
          courier: courier,
          trackingHistory: trackingHistory,
          cost: Math.floor(Math.random() * 500000) + 50000,
          notes: Math.random() > 0.7 ? 'Giao hàng trong giờ hành chính' : ''
        };
      });
      
      setShipments(generatedShipments);
      setFilteredShipments(generatedShipments);
      setLoading(false);
    };
    
    setTimeout(() => {
      generateShipmentData();
    }, 1000);
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    const result = shipments.filter(shipment => 
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    let filtered = result;
    if (filterStatus !== 'all') {
      filtered = result.filter(shipment => shipment.status === filterStatus);
    }
    
    setFilteredShipments(filtered);
    setCurrentPage(1);
  }, [searchTerm, shipments, filterStatus]);

  // Xử lý sắp xếp
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    const sortedData = [...filteredShipments].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredShipments(sortedData);
  };

  // Định dạng tiền tệ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Định dạng ngày giờ
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Tính số ngày giữa 2 ngày
  const daysBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Xử lý phân trang
  const indexOfLastShipment = currentPage * shipmentsPerPage;
  const indexOfFirstShipment = indexOfLastShipment - shipmentsPerPage;
  const currentShipments = filteredShipments.slice(indexOfFirstShipment, indexOfLastShipment);
  const totalPages = Math.ceil(filteredShipments.length / shipmentsPerPage);

  // Xử lý xem chi tiết
  const handleViewShipment = (shipment) => {
    setSelectedShipment(shipment);
    setShowShipmentDetail(true);
  };

  const handleCloseShipmentDetail = () => {
    setShowShipmentDetail(false);
    setShowTrackingMap(false);
  };

  const handleViewTracking = () => {
    setShowTrackingMap(true);
  };

  // Hiển thị chi tiết shipment
  const ShipmentDetailModal = () => {
    if (!selectedShipment) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Chi tiết vận chuyển #{selectedShipment.id}</h2>
            <button 
              onClick={handleCloseShipmentDetail}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            {showTrackingMap ? (
              <div>
                <button 
                  onClick={() => setShowTrackingMap(false)} 
                  className="mb-4 flex items-center text-blue-600 font-medium"
                >
                  <ArrowDown className="w-4 h-4 mr-1 rotate-90" /> Quay lại chi tiết
                </button>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-4">Lịch sử theo dõi</h3>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200"></div>
                    {selectedShipment.trackingHistory.map((item, index) => (
                      <div key={index} className="relative pl-14 pb-8">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-500 z-10">
                          {index === 0 ? (
                            <Box className="w-6 h-6 text-blue-600" />
                          ) : index === selectedShipment.trackingHistory.length - 1 && selectedShipment.status === 'Đã giao' ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <Truck className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <div className="flex justify-between mb-2">
                            <p className="font-semibold">{item.description}</p>
                            <p className="text-gray-500 text-sm">{formatDate(item.date)}</p>
                          </div>
                          <p className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {item.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between mb-3">
                        <h3 className="font-semibold text-lg">Thông tin vận chuyển</h3>
                        <span 
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedShipment.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                            selectedShipment.status === 'Đang vận chuyển' ? 'bg-blue-100 text-blue-800' :
                            selectedShipment.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                            selectedShipment.status === 'Bị hoãn' ? 'bg-pink-100 text-pink-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {selectedShipment.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Mã vận đơn</p>
                          <p className="font-medium">{selectedShipment.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Mã đơn hàng</p>
                          <p className="font-medium">{selectedShipment.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Ngày tạo</p>
                          <p className="font-medium">{formatDate(selectedShipment.createdAt)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Dự kiến giao hàng</p>
                          <p className="font-medium">{formatDate(selectedShipment.estimatedDelivery)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Đơn vị vận chuyển</p>
                          <p className="font-medium">{selectedShipment.courier}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Phương thức vận chuyển</p>
                          <p className="font-medium">{selectedShipment.transportMethod}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Khối lượng</p>
                          <p className="font-medium">{selectedShipment.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Phí vận chuyển</p>
                          <p className="font-medium">{formatCurrency(selectedShipment.cost)}</p>
                        </div>
                      </div>
                      
                      {selectedShipment.notes && (
                        <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
                          <p className="flex items-center font-medium">
                            <AlertTriangle className="w-4 h-4 mr-2" /> Ghi chú
                          </p>
                          <p className="mt-1">{selectedShipment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-semibold text-lg mb-3">Thông tin giao nhận</h3>
                      
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm mb-1">Người gửi</p>
                        <div className="p-3 bg-blue-50 rounded border border-blue-100">
                          <p className="font-medium">{selectedShipment.customer}</p>
                          <p>{selectedShipment.phone}</p>
                          <p className="flex items-start mt-1">
                            <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                            <span>{selectedShipment.fromAddress}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Người nhận</p>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="font-medium">Người nhận</p>
                          <p>0987654321</p>
                          <p className="flex items-start mt-1">
                            <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                            <span>{selectedShipment.toAddress}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">Lịch sử theo dõi</h3>
                    <button 
                      onClick={handleViewTracking}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                  
                  {selectedShipment.trackingHistory.length > 0 ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex overflow-x-auto pb-2">
                        {selectedShipment.trackingHistory.map((item, index) => (
                          <div key={index} className={`flex-shrink-0 w-48 mx-2 ${index === 0 ? 'ml-0' : ''} ${index === selectedShipment.trackingHistory.length - 1 ? 'mr-0' : ''}`}>
                            <div className="flex items-center mb-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                index === selectedShipment.trackingHistory.length - 1 && selectedShipment.status === 'Đã giao'
                                  ? 'bg-green-100'
                                  : 'bg-blue-100'
                              }`}>
                                {index === selectedShipment.trackingHistory.length - 1 && selectedShipment.status === 'Đã giao' ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Clock className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              {index < selectedShipment.trackingHistory.length - 1 && (
                                <div className="h-0.5 flex-grow bg-gray-200"></div>
                              )}
                            </div>
                            <div className="pl-1">
                              <p className="text-sm font-medium truncate">{item.description}</p>
                              <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                      Chưa có thông tin theo dõi
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FileText className="w-4 h-4 mr-2 inline-block" />
                    In vận đơn
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Edit className="w-4 h-4 mr-2 inline-block" />
                    Cập nhật trạng thái
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 ml-64">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý vận chuyển</h1>
        </div>
      </header>
      
      <main className="px-4 py-6 max-w-7xl mx-auto">
        {/* Thẻ thống kê */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng vận đơn</p>
                <p className="text-2xl font-semibold text-gray-900">{shipments.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clipboard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-green-500 text-sm font-semibold flex items-center">
                <ArrowUp className="w-4 h-4 inline mr-1" />
                15%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đang vận chuyển</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {shipments.filter(shipment => shipment.status === 'Đang vận chuyển').length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-green-500 text-sm font-semibold flex items-center">
                <ArrowUp className="w-4 h-4 inline mr-1" />
                8%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đã giao hàng</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {shipments.filter(shipment => shipment.status === 'Đã giao').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-green-500 text-sm font-semibold flex items-center">
                <ArrowUp className="w-4 h-4 inline mr-1" />
                12%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Có vấn đề</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {shipments.filter(shipment => ['Bị hoãn', 'Đã hủy'].includes(shipment.status)).length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-red-500 text-sm font-semibold flex items-center">
                <ArrowDown className="w-4 h-4 inline mr-1" />
                3%
              </span>
              <span className="text-gray-500 text-xs ml-2">So với tháng trước</span>
            </div>
          </div>
        </div>
        
        {/* Biểu đồ */}
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Hiệu suất giao hàng đúng hẹn</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={deliveryPerformanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /><YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" name="Đúng hẹn" fill="#3B82F6" />
                <Bar dataKey="delayed" name="Trễ hẹn" fill="#EC4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Phân loại trạng thái vận chuyển</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Pie
                    data={shipmentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {shipmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Pie
                    data={transportMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {transportMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TRANSPORT_COLORS[index % TRANSPORT_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Bảng dữ liệu */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã vận đơn, đơn hàng, khách hàng..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-10 py-2 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Đã giao">Đã giao</option>
                  <option value="Đang vận chuyển">Đang vận chuyển</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Bị hoãn">Bị hoãn</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              
              <button className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-1" />
                <span>Lọc</span>
              </button>
              
              <button className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5 mr-1" />
                <span>Xuất</span>
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => requestSort('id')}
                          className="flex items-center"
                        >
                          Mã vận đơn
                          {sortConfig.key === 'id' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? 
                                <ArrowUp className="w-3 h-3" /> : 
                                <ArrowDown className="w-3 h-3" />
                              }
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => requestSort('orderNumber')}
                          className="flex items-center"
                        >
                          Mã đơn hàng
                          {sortConfig.key === 'orderNumber' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? 
                                <ArrowUp className="w-3 h-3" /> : 
                                <ArrowDown className="w-3 h-3" />
                              }
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => requestSort('customer')}
                          className="flex items-center"
                        >
                          Khách hàng
                          {sortConfig.key === 'customer' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? 
                                <ArrowUp className="w-3 h-3" /> : 
                                <ArrowDown className="w-3 h-3" />
                              }
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => requestSort('toAddress')}
                          className="flex items-center"
                        >
                          Đến
                          {sortConfig.key === 'toAddress' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? 
                                <ArrowUp className="w-3 h-3" /> : 
                                <ArrowDown className="w-3 h-3" />
                              }
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => requestSort('status')}
                          className="flex items-center"
                        >
                          Trạng thái
                          {sortConfig.key === 'status' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? 
                                <ArrowUp className="w-3 h-3" /> : 
                                <ArrowDown className="w-3 h-3" />
                              }
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => requestSort('createdAt')}
                          className="flex items-center"
                        >
                          Ngày tạo
                          {sortConfig.key === 'createdAt' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? 
                                <ArrowUp className="w-3 h-3" /> : 
                                <ArrowDown className="w-3 h-3" />
                              }
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => requestSort('courier')}
                          className="flex items-center"
                        >
                          Đơn vị vận chuyển
                          {sortConfig.key === 'courier' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? 
                                <ArrowUp className="w-3 h-3" /> : 
                                <ArrowDown className="w-3 h-3" />
                              }
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentShipments.length > 0 ? (
                      currentShipments.map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {shipment.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {shipment.orderNumber}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <div className="w-8 h-8 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 font-medium">{shipment.customer}</p>
                                <p className="text-gray-500 text-xs">{shipment.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                              <span>{shipment.toAddress.split(',').pop().trim()}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span 
                              className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                                shipment.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                                shipment.status === 'Đang vận chuyển' ? 'bg-blue-100 text-blue-800' :
                                shipment.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                                shipment.status === 'Bị hoãn' ? 'bg-pink-100 text-pink-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {shipment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {formatDate(shipment.createdAt).split(',')[0]}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {shipment.courier}
                          </td>
                          <td className="px-4 py-3 text-sm text-right flex justify-center">
                            <button 
                              onClick={() => handleViewShipment(shipment)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                          Không tìm thấy dữ liệu nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Phân trang */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">
                  Hiển thị {indexOfFirstShipment + 1} đến {Math.min(indexOfLastShipment, filteredShipments.length)} của {filteredShipments.length} kết quả
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white border text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Trước
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageToShow = totalPages <= 5 
                      ? i + 1 
                      : currentPage <= 3 
                        ? i + 1 
                        : currentPage >= totalPages - 2 
                          ? totalPages - 4 + i 
                          : currentPage - 2 + i;
                    
                    return (
                      <button
                        key={pageToShow}
                        onClick={() => setCurrentPage(pageToShow)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === pageToShow
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageToShow}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white border text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Tiếp
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      {showShipmentDetail && <ShipmentDetailModal />}
    </div>
  );
};

export default ShippingManagementDashboard;