// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Box, Typography, Grid } from '@mui/material';

ChartJS.register(ArcElement, Tooltip);

const colorMapping = {
    'TESLA': 'rgba(75, 192, 192, 0.6)',
    'FORD': 'rgba(255, 99, 132, 0.6)',
    'NISSAN': 'rgba(54, 162, 235, 0.6)',
    'KIA': 'rgba(255, 206, 86, 0.6)',
    'BMW': 'rgba(153, 102, 255, 0.6)',
    'CHEVROLET': 'rgba(255, 159, 64, 0.6)',
    'AUDI': 'rgba(199, 199, 199, 0.6)',
    'SMART': 'rgba(83, 102, 255, 0.6)',
    'VOLKSWAGEN': 'rgba(255, 99, 255, 0.6)',
    'TOYOTA': 'rgba(100, 181, 246, 0.6)',
    'RIVIAN': 'rgba(121, 134, 203, 0.6)',
    'JEEP': 'rgba(255, 167, 38, 0.6)',
    'HYUNDAI': 'rgba(239, 83, 80, 0.6)',
    'FIAT': 'rgba(76, 175, 80, 0.6)',
    'PORSCHE': 'rgba(255, 238, 88, 0.6)',
    'CHRYSLER': 'rgba(255, 87, 34, 0.6)',
    'HONDA': 'rgba(63, 81, 181, 0.6)',
    'MITSUBISHI': 'rgba(141, 110, 99, 0.6)',
    'LEXUS': 'rgba(38, 166, 154, 0.6)',
    'VOLVO': 'rgba(102, 187, 106, 0.6)',
    'DODGE': 'rgba(77, 182, 172, 0.6)',
    'MERCEDES-BENZ': 'rgba(255, 64, 129, 0.6)',
    'SUBARU': 'rgba(156, 39, 176, 0.6)',
    'JAGUAR': 'rgba(76, 175, 80, 0.6)',
    'POLESTAR': 'rgba(244, 67, 54, 0.6)',
    'MINI': 'rgba(103, 58, 183, 0.6)',
    'LUCID': 'rgba(255, 193, 7, 0.6)',
    'LAND ROVER': 'rgba(205, 220, 57, 0.6)',
    'CADILLAC': 'rgba(69, 90, 100, 0.6)',
    'ALFA ROMEO': 'rgba(255, 235, 59, 0.6)',
    'FISKER': 'rgba(230, 74, 25, 0.6)',
    'MAZDA': 'rgba(33, 150, 243, 0.6)',
    'LINCOLN': 'rgba(171, 71, 188, 0.6)',
    'GENESIS': 'rgba(126, 87, 194, 0.6)',
    'TH!NK': 'rgba(244, 143, 177, 0.6)',
    'GMC': 'rgba(120, 144, 156, 0.6)',
    'BENTLEY': 'rgba(48, 79, 254, 0.6)',
    'AZURE DYNAMICS': 'rgba(0, 188, 212, 0.6)',
  };
  

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Vehicle Type Distribution',
        data: Object.values(data),
        backgroundColor: Object.keys(data).map(vehicle => colorMapping[vehicle] || 'rgba(200, 200, 200, 0.6)'), // Use mapped colors
        borderColor: Object.keys(data).map(vehicle => colorMapping[vehicle]?.replace('0.6', '1') || 'rgba(200, 200, 200, 1)'),
        // borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the default legend
        boxWidth: 0,
      },
    },
  };

  // Create legend labels with their corresponding colors
  const legendLabels = chartData.labels.map((label, index) => ({
    label,
    color: chartData.datasets[0].backgroundColor[index],
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '12px',
        background: '#ffffff',
      }}
    >
      <Box sx={{ width: '270px', height: '270px', padding:'10px' }}>
        <Pie data={chartData} options={chartOptions} />
      </Box>
      <Box 
        sx={{ 
            marginLeft: '16px', 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, auto)', // Three columns
            gap: '8px',
            maxHeight: '220px',
            overflowY: 'auto',

        }}
      >
        <Grid container spacing={1}>
          {legendLabels.map((item, index) => (
            <Grid item xs={6} key={index}> 
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color || 'transparent', // Ensure a default color
                    borderRadius: '50%', // Make it a circle
                    marginRight: '8px',
                    border: item.color ? '1px solid #000' : '1px solid transparent', // Add border for visibility
                  }}
                />
                <Typography variant="body2" sx={{  color: '#555', fontSize: '0.5rem'}}>
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PieChart;
