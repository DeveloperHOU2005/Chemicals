// src/components/History.jsx
import { History } from 'lucide-react';

const HistoryComponent = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Lịch sử thay đổi</h2>
      <p className="text-gray-500 mb-6">Xem lịch sử thay đổi thông tin sản phẩm.</p>
      <div className="text-center py-10 text-gray-500">
        <History size={40} className="mx-auto mb-2 text-gray-400" />
        <p>Chức năng đang được phát triển</p>
      </div>
    </div>
  );
};

export default HistoryComponent;
