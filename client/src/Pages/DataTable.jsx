// src/Pages/DataTablePage.js
import React, { useState, useEffect } from "react";
import DataTable from "../DataComponents/DataTable";
import { Box, Typography, TextField } from "@mui/material"; // Import TextField from MUI

const DataTablePage = () => {
    const [vehicleData, setVehicleData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

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
                console.log(data, "Vehicle Data"); // Log the data for debugging
            })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    // Filter vehicle data based on the search query
    const filteredData = vehicleData.filter(vehicle =>
        vehicle["Make"].toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle["Model"].toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle["VIN (1-10)"].toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box 
            sx={{ 
                height: '100%', 
                padding: 2,
                display: 'flex', 
                justifyContent: 'center', 
                backgroundColor: '#f5f5f5' 
            }}
        >
            <Box sx={{ width: '100%' }}>
                {/* Flex container for Title and Search Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ padding: 2, fontWeight: 'bold' }}> EV Population Data </Typography>
                    
                    {/* Search Bar */}
                    <TextField
                        variant="outlined"
                        placeholder="Search by Make, Model, or VIN"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: '300px', padding:0 }}
                        size="small" // Optional width adjustment
                    />
                </Box>

                {filteredData.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray', padding: 2 }}>
                        No Data Available
                    </Typography>
                ) : (
                    <DataTable vehicleData={filteredData} />
                )}
            </Box>
        </Box>
    );
}

export default DataTablePage;
