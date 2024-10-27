// src/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#F48319' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EV Dashboard
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button> {/* Link to Dashboard */}
          <Button color="inherit" component={Link} to="/datatable">EV Table</Button> {/* Link to DataTable */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
