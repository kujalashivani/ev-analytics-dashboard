// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Dashboard from '../Components/Dashboard';
import { Box } from '@mui/material';

const DashboardPage = () => {
  return (
    <>
     <Box sx={{ padding: '10px', overflowX: 'hidden' }}>
     <Dashboard/>
     </Box>
     
    </>
  );
};

export default DashboardPage;
