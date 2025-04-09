//  Biểu đồ doanh thu theo tháng.import { useEffect } from "react";
import ApexCharts from "apexcharts";
import { useEffect } from "react";

const SalesChart = () => {
    useEffect(() => {
        var options = {
            series: [{ name: "Doanh thu", data: [30000, 40000, 35000, 50000, 49000, 60000, 70000] }],
            chart: { type: "area", height: "100%" },
            xaxis: { categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"] },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        return () => chart.destroy();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Doanh thu theo tháng</h3>
            <div className="h-64" id="chart"></div>
        </div>
    );
};

export default SalesChart;
