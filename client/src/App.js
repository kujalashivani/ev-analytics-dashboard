// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/DashboardPage';
import DataTable from './Pages/DataTable';
import Navbar from './Components/Navbar'; // Import the Navbar component
import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/datatable' element={<DataTable />} />
      </Routes>
    </Router>
  );
}

export default App;
