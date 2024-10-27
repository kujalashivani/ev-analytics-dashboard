// EVPopulationChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography, Box } from '@mui/material';

const EVPopulationChart = ({ data }) => {
  // Count EVs per model year
  const yearCounts = data.reduce((acc, item) => {
    const year = item["Model Year"];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Calculate average electric range per model year
  const yearRanges = data.reduce((acc, item) => {
    const year = item["Model Year"];
    const range = parseInt(item["Electric Range"], 10);
    if (year in acc) {
      acc[year].sum += range;
      acc[year].count += 1;
    } else {
      acc[year] = { sum: range, count: 1 };
    }
    return acc;
  }, {});

  const averageRanges = Object.keys(yearRanges).map(year => ({
    year,
    avgRange: yearRanges[year].sum / yearRanges[year].count,
  }));

  // Prepare data for line charts
  const years = Object.keys(yearCounts);
  const counts = Object.values(yearCounts);
  const avgRanges = averageRanges.map(item => item.avgRange);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'EV Count per Year',
        data: counts,
        backgroundColor: 'rgba(63, 81, 181, 0.3)', // Increase opacity for clear fill
        borderColor: 'rgba(63, 81, 181, 1)',
        borderWidth: 2,
        fill: 'origin', // Ensure area fill from line to x-axis
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(63, 81, 181, 1)',
        tension: 0.4, // Smooth out the line
      },
      {
        label: 'Average Electric Range per Year',
        data: avgRanges,
        backgroundColor: 'rgba(76, 175, 80, 0.3)', // Increase opacity for clear fill
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 2,
        fill: 'origin', // Ensure area fill from line to x-axis
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(76, 175, 80, 1)',
        tension: 0.4, // Smooth out the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count / Range',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Model Year',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        EV Population and Average Range by Model Year
      </Typography>
      <Box height={400}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default EVPopulationChart;
