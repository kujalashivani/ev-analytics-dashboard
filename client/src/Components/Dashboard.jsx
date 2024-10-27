import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import LineChart from '../DataComponents/LineChart';
import BarChart from '../DataComponents/BarChart';
import EVPopulationChart from '../DataComponents/LineChart2';
import PieChart from '../DataComponents/PieChart';
import StackedBarChart from '../DataComponents/StackedBar';

const Dashboard = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch('http://localhost:5000/data') // Point to the Express server
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        setVehicleData(data); // Store the data in state
        setLoading(false); // Set loading to false after data is fetched
        console.log(data, "Vehicle Data"); // Log the data for debugging
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

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

  const prepareStackedData = (vehicleData) => {
    const groupedData = {};
  
    vehicleData.forEach((item) => {
      const modelYear = item["Model Year"];
      const evType = item["Electric Vehicle Type"];
  
      if (!groupedData[modelYear]) {
        groupedData[modelYear] = {};
      }
      groupedData[modelYear][evType] = (groupedData[modelYear][evType] || 0) + 1;
    });
  
    // Convert grouped data to array for chart
    return Object.entries(groupedData).map(([year, types]) => ({
      name: year,
      ...types,
    }));
  };

  const modelYearCounts = countOccurrences(modelYears);
  const makeCounts = countOccurrences(makes);
  const vehicleTypeCounts = countOccurrences(vehicleTypes); // Count occurrences of each vehicle type

  const stackedData = prepareStackedData(vehicleData); // Prepare data for chart

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Electric Vehicle Dashboard
      </Typography>
      {loading ? ( // Conditional rendering for loading state
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <CircularProgress /> {/* Loading spinner */}
          <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading data...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box boxShadow={2} p={2} borderRadius={2} height="450px">
              <Typography variant="h6" gutterBottom>
                Growth of Electric Vehicles by Model Year
              </Typography>
              <StackedBarChart data={stackedData} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box boxShadow={2} p={2} borderRadius={2} height="450px">
              <Typography variant="h6" gutterBottom>
                Year-wise Vehicle Count
              </Typography>
              <BarChart data={modelYearCounts} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box boxShadow={2} p={2} borderRadius={2} height="450px">
              <EVPopulationChart data={vehicleData} /> 
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box boxShadow={2} p={2} borderRadius={2} height="450px">
              <Typography variant="h6" gutterBottom>
                Vehicle Brands Distribution
              </Typography>
              <PieChart data={makeCounts} />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
