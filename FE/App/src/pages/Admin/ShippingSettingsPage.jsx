import React, { useState } from 'react';
import {
  Save,
  Bell,
  Globe,
  User,
  Lock,
  CreditCard,
  Truck,
  Mail,
  Smartphone,
  HelpCircle,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Shield,
  Map,
  Users,
  Package,
  FileText,
  AlertTriangle,
  RefreshCw,
  X,
  Check,
  AppWindowIcon
} from 'lucide-react';

const ShippingSettingsPage = () => {
  // States
  const [activeTab, setActiveTab] = useState('general');
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [settings, setSettings] = useState({
    // Cài đặt chung
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    dateFormat: 'DD/MM/YYYY',
    currency: 'VND',
    
    // Thông báo
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    shipmentUpdates: true,
    statusChanges: true,
    deliveryReminders: true,
    dailyReports: false,
    
    // Vận chuyển
    defaultCourier: 'vn-express',
    autoAssignCourier: true,
    calculateTax: true,
    autoGenerateLabels: true,
    deliveryTimes: '8-18',
    weightUnit: 'kg',
    dimensionUnit: 'cm',
    
    // Tài khoản
    username: 'admin',
    email: 'admin@example.com',
    phone: '0987654321',
    twoFactorAuth: false,
    
    // API & Tích hợp
    apiKey: 'sk_test_abcdef123456789',
    webhookUrl: 'https://example.com/webhook',
    trackingPageUrl: 'https://ship.example.com/track/',
    googleMapsApi: true,
    
    // Đối tác vận chuyển
    carriers: [
      { id: 'vn-express', name: 'VN Express', active: true },
      { id: 'jt-express', name: 'J&T Express', active: true },
      { id: 'ghn', name: 'GHN', active: true },
      { id: 'ghtk', name: 'GHTK', active: true },
      { id: 'dhl', name: 'DHL', active: false },
      { id: 'fedex', name: 'FedEx', active: false },
    ]
  });
  
  // Xử lý thay đổi giá trị input
  const handleInputChange = (section, field, value) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };
  
  // Xử lý thay đổi toggle
  const handleToggleChange = (field) => {
    setSettings({
      ...settings,
      [field]: !settings[field]
    });
  };
  
  // Xử lý thay đổi carrier
  const handleCarrierToggle = (carrierId) => {
    const updatedCarriers = settings.carriers.map(carrier => {
      if (carrier.id === carrierId) {
        return { ...carrier, active: !carrier.active };
      }
      return carrier;
    });
    
    setSettings({
      ...settings,
      carriers: updatedCarriers
    });
  };
  
  // Xử lý lưu cài đặt
  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    setShowSavedNotification(true);
    setTimeout(() => {
      setShowSavedNotification(false);
    }, 3000);
  };
  
  // Các tab cài đặt
  const settingTabs = [
    { id: 'general', label: 'Cài đặt chung', icon: <Globe className="w-5 h-5" /> },
    { id: 'app', label: 'Cấu hình nền tảng', icon: <AppWindowIcon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Thông báo', icon: <Bell className="w-5 h-5" /> },
    { id: 'shipping', label: 'Vận chuyển', icon: <Truck className="w-5 h-5" /> },
    { id: 'account', label: 'Tài khoản', icon: <User className="w-5 h-5" /> },
    { id: 'security', label: 'Bảo mật', icon: <Shield className="w-5 h-5" /> },
    { id: 'api', label: 'API & Tích hợp', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'carriers', label: 'Đối tác vận chuyển', icon: <Package className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 ml-64">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        </div>
      </header>
      
      <main className="px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow">
              <nav className="space-y-1">
                {settingTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span className="flex-1">{tab.label}</span>
                    <ChevronRight className="w-5 h-5 opacity-70" />
                  </button>
                ))}
              </nav>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Cài đặt chung</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.language}
                          onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                        >
                          <option value="vi">Tiếng Việt</option>
                          <option value="en">English</option>
                          <option value="zh">中文</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Múi giờ</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.timezone}
                          onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                        >
                          <option value="Asia/Ho_Chi_Minh">Hồ Chí Minh (GMT+7)</option>
                          <option value="Asia/Bangkok">Bangkok (GMT+7)</option>
                          <option value="Asia/Singapore">Singapore (GMT+8)</option>
                          <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Định dạng ngày</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.dateFormat}
                          onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tiền tệ</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.currency}
                          onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                        >
                          <option value="VND">VND - Việt Nam Đồng</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="JPY">JPY - Japanese Yen</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Cài đặt thông báo</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Kênh thông báo</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Email</p>
                            <p className="text-xs text-gray-500">Nhận thông báo qua email</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('emailNotifications')}
                          className="focus:outline-none"
                        >
                          {settings.emailNotifications ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center">
                          <Smartphone className="w-5 h-5 text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">SMS</p>
                            <p className="text-xs text-gray-500">Nhận thông báo qua tin nhắn SMS</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('smsNotifications')}
                          className="focus:outline-none"
                        >
                          {settings.smsNotifications ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center">
                          <Bell className="w-5 h-5 text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Push thông báo</p>
                            <p className="text-xs text-gray-500">Nhận thông báo trực tiếp trên trình duyệt</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('pushNotifications')}
                          className="focus:outline-none"
                        >
                          {settings.pushNotifications ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Loại thông báo</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Cập nhật vận chuyển</p>
                          <p className="text-xs text-gray-500">Thông báo khi có cập nhật về lô hàng</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('shipmentUpdates')}
                          className="focus:outline-none"
                        >
                          {settings.shipmentUpdates ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Thay đổi trạng thái</p>
                          <p className="text-xs text-gray-500">Thông báo khi trạng thái vận chuyển thay đổi</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('statusChanges')}
                          className="focus:outline-none"
                        >
                          {settings.statusChanges ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Nhắc nhở giao hàng</p>
                          <p className="text-xs text-gray-500">Thông báo nhắc nhở trước khi giao hàng</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('deliveryReminders')}
                          className="focus:outline-none"
                        >
                          {settings.deliveryReminders ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Báo cáo hàng ngày</p>
                          <p className="text-xs text-gray-500">Nhận báo cáo tổng hợp hàng ngày</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('dailyReports')}
                          className="focus:outline-none"
                        >
                          {settings.dailyReports ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Shipping Settings */}
              {activeTab === 'shipping' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Cài đặt vận chuyển</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị vận chuyển mặc định</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.defaultCourier}
                          onChange={(e) => handleInputChange('shipping', 'defaultCourier', e.target.value)}
                        >
                          <option value="vn-express">VN Express</option>
                          <option value="jt-express">J&T Express</option>
                          <option value="ghn">GHN</option>
                          <option value="ghtk">GHTK</option>
                          <option value="dhl">DHL</option>
                          <option value="fedex">FedEx</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Khung giờ giao hàng</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.deliveryTimes}
                          onChange={(e) => handleInputChange('shipping', 'deliveryTimes', e.target.value)}
                        >
                          <option value="8-18">8:00 - 18:00</option>
                          <option value="9-17">9:00 - 17:00</option>
                          <option value="8-12">8:00 - 12:00</option>
                          <option value="13-18">13:00 - 18:00</option>
                          <option value="18-21">18:00 - 21:00</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị khối lượng</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.weightUnit}
                          onChange={(e) => handleInputChange('shipping', 'weightUnit', e.target.value)}
                        >
                          <option value="kg">Kilogram (kg)</option>
                          <option value="g">Gram (g)</option>
                          <option value="lb">Pound (lb)</option>
                          <option value="oz">Ounce (oz)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị kích thước</label>
                        <select
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.dimensionUnit}
                          onChange={(e) => handleInputChange('shipping', 'dimensionUnit', e.target.value)}
                        >
                          <option value="cm">Centimeter (cm)</option>
                          <option value="m">Meter (m)</option>
                          <option value="in">Inch (in)</option>
                          <option value="ft">Foot (ft)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Tùy chọn vận chuyển</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tự động gán đơn vị vận chuyển</p>
                          <p className="text-xs text-gray-500">Tự động chọn đơn vị vận chuyển tối ưu</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('autoAssignCourier')}
                          className="focus:outline-none"
                        >
                          {settings.autoAssignCourier ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tính thuế tự động</p>
                          <p className="text-xs text-gray-500">Tự động tính thuế VAT cho vận chuyển</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('calculateTax')}
                          className="focus:outline-none"
                        >
                          {settings.calculateTax ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tự động tạo nhãn vận chuyển</p>
                          <p className="text-xs text-gray-500">Tự động tạo và in nhãn khi tạo đơn</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('autoGenerateLabels')}
                          className="focus:outline-none"
                        >
                          {settings.autoGenerateLabels ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Cài đặt tài khoản</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên người dùng</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        value={settings.username}
                        onChange={(e) => handleInputChange('account', 'username', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        value={settings.email}
                        onChange={(e) => handleInputChange('account', 'email', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        value={settings.phone}
                        onChange={(e) => handleInputChange('account', 'phone', e.target.value)}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Bảo mật</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Xác thực hai yếu tố (2FA)</p>
                        <p className="text-xs text-gray-500">Bảo mật tài khoản bằng mã xác thực</p>
                      </div>
                      <button 
                        onClick={() => handleToggleChange('twoFactorAuth')}
                        className="focus:outline-none"
                      >
                        {settings.twoFactorAuth ? (
                          <ToggleRight className="w-10 h-6 text-blue-600" />
                        ) : (
                          <ToggleLeft className="w-10 h-6 text-gray-300" />
                        )}
                      </button>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Lịch sử đăng nhập</h3>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mb-3 pb-3 border-b">
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Chrome trên Windows</p>
                            <p className="text-xs text-green-600 font-medium">Hiện tại</p>
                          </div>
                          <p className="text-xs text-gray-500">Hồ Chí Minh, Việt Nam • 12/04/2025 15:30</p>
                        </div>
                        
                        <div className="mb-3 pb-3 border-b">
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Firefox trên Windows</p>
                            <p className="text-xs text-gray-500">2 ngày trước</p>
                          </div>
                          <p className="text-xs text-gray-500">Hồ Chí Minh, Việt Nam • 10/04/2025 09:15</p>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Safari trên iPhone</p>
                            <p className="text-xs text-gray-500">4 ngày trước</p>
                          </div>
                          <p className="text-xs text-gray-500">Hà Nội, Việt Nam • 08/04/2025 18:22</p>
                        </div>
                      </div>
                      
                      <button className="text-sm text-blue-600 font-medium">
                        Xem tất cả lịch sử đăng nhập
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* API & Integration */}
              {activeTab === 'api' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">API & Tích hợp</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                      <div className="flex">
                        <input
                          type="password"
                          className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={settings.apiKey}
                          disabled
                        />
                        <button className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 hover:bg-gray-200">
                          Sao chép
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">API Key được sử dụng để xác thực các yêu cầu API</p>
                    </div>
                    
                    <div className="mt-4">
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Tạo API Key mới
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        value={settings.webhookUrl}
                        onChange={(e) => handleInputChange('api', 'webhookUrl', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">URL nhận thông báo webhook khi có cập nhật vận chuyển</p>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL trang theo dõi</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        value={settings.trackingPageUrl}
                        onChange={(e) => handleInputChange('api', 'trackingPageUrl', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">URL cơ sở cho trang theo dõi đơn hàng</p>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Tích hợp</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Google Maps API</p>
                          <p className="text-xs text-gray-500">Sử dụng Google Maps để hiển thị bản đồ và vị trí</p>
                        </div>
                        <button 
                          onClick={() => handleToggleChange('googleMapsApi')}
                          className="focus:outline-none"
                        >
                          {settings.googleMapsApi ? (
                            <ToggleRight className="w-10 h-6 text-blue-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Shipping Partners */}
              {activeTab === 'carriers' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Đối tác vận chuyển</h2>
                  
                  <div className="space-y-6">
                    <p className="text-sm text-gray-500">Quản lý đơn vị vận chuyển khả dụng trong hệ thống</p>
                    
                    <div className="bg-gray-50 rounded-lg">
                      {settings.carriers.map((carrier) => (
                        <div 
                          key={carrier.id} 
                          className="flex items-center justify-between p-4 border-b last:border-b-0"
                        >
                          <div className="flex items-center">
                            <Package className="w-5 h-5 text-gray-500 mr-3" />
                            <p className="text-sm font-medium text-gray-900">{carrier.name}</p>
                          </div>
                          <button 
                            onClick={() => handleCarrierToggle(carrier.id)}
                            className="focus:outline-none"
                          >
                            {carrier.active ? (
                              <ToggleRight className="w-10 h-6 text-blue-600" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-gray-300" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button className="flex items-center text-sm text-blue-600 font-medium">
                      <span className="mr-1">Thêm đơn vị vận chuyển mới</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Save Button */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu cài đặt
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </main>
      
      {/* Success Notification */}
      {showSavedNotification && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 rounded-md shadow-lg p-4 flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-3" />
          <p className="text-sm text-green-700">Đã lưu thay đổi thành công!</p>
          <button 
            onClick={() => setShowSavedNotification(false)}
            className="ml-3 text-gray-400 hover:text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingSettingsPage;