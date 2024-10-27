// src/components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = ({ data, title }) => {
  // Prepare data for the line chart
  const chartData = {
    labels: Object.keys(data), // x-axis labels (Model Years)
    datasets: [
      {
        label: 'EV Population Growth',
        data: Object.values(data), // y-axis data (EV counts per year)
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Model Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of EVs',
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
