import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  months: string[];
  monthlyIncome: number[];
  monthlySpent: number[];
}

const BarChart: React.FC<BarChartProps> = ({
  months,
  monthlyIncome,
  monthlySpent,
}) => {
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: monthlyIncome,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        innerHeight: 500,
        outerHeight: 500,
      },
      {
        label: "Expense",
        data: monthlySpent,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Income and Expense per Month",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[50%] md:h-[80%] justify-between  items-center flex flex-col md:w-1/2 mx-auto mt-4 p-2 bg-white rounded-lg shadow-md">
      Bar Chart
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
