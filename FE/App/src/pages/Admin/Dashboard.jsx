import DashboardHeader from "../../components/dashboard/DashboardHeader.jsx";
import StatsGrid from "../../components/dashboard/StatsGrid.jsx";
import SalesChart from "../../components/dashboard/SalesChart.jsx";
import RecentOrders from "../../components/dashboard/RecentOrders.jsx";
import RecentProduct from "../../components/dashboard/RecentProducts.jsx";

const Dashboard = () => {
    return (
        <div className="ml-64 p-8">
            <DashboardHeader />
            <StatsGrid />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart />
                <RecentOrders />
            </div>
            <div className="my-6 rounded-md py-2 shadow-sm">
                <RecentProduct/>
            </div>
        </div>
    );
};

export default Dashboard;
