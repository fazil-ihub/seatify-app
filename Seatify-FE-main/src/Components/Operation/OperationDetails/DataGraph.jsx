import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const DataGraph = ({ data }) => {
  const colors = {
    'Computer Science': { border: 'rgb(75, 192, 192)', background: 'rgba(75, 192, 192, 0.5)' },
    'Mechanical Engineering': { border: 'rgb(255, 99, 132)', background: 'rgba(255, 99, 132, 0.5)' },
    'Electrical Engineering': { border: 'rgb(153, 102, 255)', background: 'rgba(153, 102, 255, 0.5)' }
  };

  const chartData = {
    labels: Object.values(data)[0].map(item => item.month),
    datasets: Object.entries(data).map(([department, values]) => ({
      label: department,
      data: values.map(item => item.amount),
      borderColor: colors[department].border,
      backgroundColor: colors[department].background,
      tension: 0.4,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Amount Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const totalAmount = Object.values(data).reduce(
    (sum, departmentData) => sum + departmentData.reduce((deptSum, item) => deptSum + item.amount, 0),
    0
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Amount Overview</h2>
        <p className="text-gray-600">
          Total Amount: ${totalAmount.toLocaleString()}
        </p>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
};