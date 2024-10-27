// HorizontalStackedBarChart.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HorizontalStackedBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Battery Electric Vehicle (BEV)" stackId="a" fill="#8884d8" />
        <Bar dataKey="Plug-in Hybrid Electric Vehicle (PHEV)" stackId="a" fill="#82ca9d" />
        {/* You can add more Bar components for other types if necessary */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalStackedBarChart;
