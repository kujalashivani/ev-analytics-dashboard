// src/DataComponents/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 40,
        borderRadius: 6,
        barThickness: Math.max(10, 400 / Object.keys(data).length)
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        font: { size: 18, weight: 'bold' },
        color: '#333',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: '#333' },
      },
      y: {
        grid: { color: 'rgba(200, 200, 200, 0.3)' },
        beginAtZero: true,
        ticks: { font: { size: 12 }, color: '#333' },
      },
    },
  };
  console.log(chartData , "Chart Data")

  return (
    <div style={{ height: '300px', padding: '10px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
