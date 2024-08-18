import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  months: string[];
  monthlySpent: any[];
  monthlyIncome: any[];
}

const LineChart: React.FC<LineChartProps> = ({
  months,
  monthlySpent,
  monthlyIncome,
}) => {
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Total Income",
        data: monthlyIncome,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "Total Expenses",
        data: monthlySpent,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Revenue vs Total Sales",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[50%] md:h-[80%] justify-between items-center flex flex-col md:w-2/5 mx-auto mt-4 p-2 bg-white rounded-lg shadow-md">
      Line Chart
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
