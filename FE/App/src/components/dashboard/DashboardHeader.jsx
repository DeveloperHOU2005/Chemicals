const DashboardHeader = () => {
    return (
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <input type="search" placeholder="Tìm kiếm..." className="px-4 py-2 border rounded-lg" />
                <button className="p-2 hover:bg-gray-200 rounded-full">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                </button>
                <div className="flex items-center space-x-2">
                    <img src="logo.svg" alt="Avatar" className="w-10 h-10 rounded-full" />
                    <span className="font-bold">Đỗ Việt Hoàng</span>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
