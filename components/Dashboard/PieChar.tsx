import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary components in Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({
  monthlyIncome,
  monthlySpent,
}: {
  monthlyIncome: { [key: string]: number };
  monthlySpent: { [key: string]: number };
}) => {
  // Get the current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  console.log(currentMonth);
  console.log(monthlyIncome);
  console.log(monthlySpent);
  // Access the income and spent data for the current month
  const incomeAmount = monthlyIncome[currentMonth] || 0;
  const spentAmount = monthlySpent[currentMonth] || 0;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [incomeAmount, spentAmount],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Income color
          "rgba(255, 99, 132, 0.6)", // Spent color
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Income border color
          "rgba(255, 99, 132, 1)", // Spent border color
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${currentMonth} Income and Expenses`,
        font: {
          size: 20,
        },
      },
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
