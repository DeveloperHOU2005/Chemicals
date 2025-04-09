// StatsGrid.jsx → Hiển thị tổng doanh thu, đơn hàng, sản phẩm, khách hàng.

const stats = [
    { title: "Tổng doanh thu", value: "$45,231", trend: "↑ 12.5%", color: "text-green-500" },
    { title: "Tổng đơn hàng", value: "2,345", trend: "↓ 3.2%", color: "text-red-500" },
    { title: "Sản phẩm", value: "1,234", trend: "↑ 5.6%", color: "text-green-500" },
    { title: "Khách hàng", value: "5,678", trend: "↑ 8.9%", color: "text-green-500" },
];

const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className={`${stat.color} text-sm`}>{stat.trend}</span>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
