// src/Charts.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Box, Grid, Typography, Paper } from '@mui/material';
import BarChart from '../DataComponents/BarChart';
import LineChart from '../DataComponents/LineChart';
import PieChart from '../DataComponents/PieChart';


const Charts = ({vehicleData}) => {

  const modelYears = vehicleData.map(item => item["Model Year"]);
  const makes = vehicleData.map(item => item["Make"]);
  const electricRanges = vehicleData.map(item => parseInt(item["Electric Range"], 10));
  const vehicleTypes = vehicleData.map(item => item["Electric Vehicle Type"]);

  const countOccurrences = (arr) => {
    return arr.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  };

  const modelYearCounts = countOccurrences(modelYears);
  const makeCounts = countOccurrences(makes);
  const vehicleTypeCounts = countOccurrences(vehicleTypes); // Count occurrences of each vehicle type


  return (
    <Box sx={{ padding: '20px' }}>
    <Typography variant="h4" align="center" gutterBottom>
      Electric Vehicle Dashboard
    </Typography>
    <Grid container spacing={3} alignItems="stretch">
      {/* Bar Chart */}
      <Grid item xs={12}>
        <Paper sx={{ padding: '16px', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" align="center">Year-wise Vehicle Count</Typography>
          <BarChart data={modelYearCounts} />
        </Paper>
      </Grid>
      <Grid container item spacing={3} xs={12}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Typography variant="h6" align="center">Year-wise Vehicle Count</Typography>
            <PieChart data={makeCounts} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Typography variant="h6" align="center">Growth of Electric Vehicles by Model Year</Typography>
            <LineChart data={modelYearCounts} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  </Box>
  );
};

export default Charts;
