const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the EV Population Data API');
});

app.get('/data', (req, res) => {
    const results = [];
    let responseSent = false; // Flag to track if response has been sent

    fs.createReadStream('../data-to-visualize/Electric_Vehicle_Population_Data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (!responseSent) {
                res.json(results); // Send response with CSV data
                responseSent = true;
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            if (!responseSent) {
                res.status(500).json({ error: 'Failed to read CSV file' });
                responseSent = true;
            }
        });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
