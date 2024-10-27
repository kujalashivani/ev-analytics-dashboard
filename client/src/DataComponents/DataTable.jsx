// src/DataComponents/DataTable.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

const DataTable = ({ vehicleData }) => {
  // Define the optimized columns for the DataGrid
  const columns = [
    { field: 'VIN (1-10)', headerName: 'VIN', width: 150, sortable: true },
    { field: 'Make', headerName: 'Make', width: 120, sortable: true },
    { field: 'Model', headerName: 'Model', width: 120, sortable: true },
    { field: 'Model Year', headerName: 'Year', width: 100, sortable: true },
    { field: 'Electric Range', headerName: 'Range (mi)', width: 120, sortable: true },
    { field: 'Base MSRP', headerName: 'MSRP ($)', width: 120, renderCell: (params) => `$${params.value.toLocaleString()}`, sortable: true },
    { field: 'County', headerName: 'County', width: 150, sortable: true },
    { field: 'City', headerName: 'City', width: 150, sortable: true },
    { field: 'State', headerName: 'State', width: 100, sortable: true },
  ];

  // Create unique rows with VIN as the id
  const rowsWithId = vehicleData.map(row => ({
    id: row['VIN (1-10)'] || `${row['DOL Vehicle ID']}-${Math.random()}`, // Use VIN or generate a unique id
    ...row,
  }));

  return (
    <Paper elevation={3} style={{ width: '100%' }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        sortingOrder={['asc', 'desc']} // Allow sorting
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5', // Light gray for column headers
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f0f0f0', // Light gray on row hover
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;
