// src/components/Tabs.jsx
import { Box, BarChart2, ThumbsUp, History } from 'lucide-react';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabConfig = [
    { key: 'products', label: 'Sản phẩm', icon: <Box size={18} className="mr-2" /> },
    { key: 'dashboard', label: 'Thống kê', icon: <BarChart2 size={18} className="mr-2" /> },
    { key: 'reviews', label: 'Đánh giá', icon: <ThumbsUp size={18} className="mr-2" /> },
    { key: 'history', label: 'Lịch sử', icon: <History size={18} className="mr-2" /> }
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {tabConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`pb-4 px-1 ${
              activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
