const orders = [
    { id: "#1234", customer: "Nguyễn Văn A", status: "Đã giao", total: "$245", color: "bg-green-100 text-green-800" },
    { id: "#1235", customer: "Trần Thị B", status: "Đang xử lý", total: "$189", color: "bg-yellow-100 text-yellow-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },
    { id: "#1236", customer: "Lê Văn C", status: "Đã hủy", total: "$567", color: "bg-red-100 text-red-800" },


];

const RecentOrders = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Đơn hàng gần đây</h3>
            <div className="max-h-64 overflow-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr className="text-left text-gray-600 border-b">
                            <th className="p-2">Mã đơn</th>
                            <th className="p-2">Khách hàng</th>
                            <th className="p-2">Trạng thái</th>
                            <th className="p-2">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-2">{order.id}</td>
                                <td className="p-2">{order.customer}</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 rounded-full text-sm ${order.color}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-2">{order.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;
