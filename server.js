const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Setup MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'period_tracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.json());

// API endpoint to handle period tracking
app.post('/api/track-period', (req, res) => {
    const { start_date, cycle_length, period_length } = req.body;

    // Insert period data into MySQL (or update if necessary)
    const query = 'INSERT INTO periods (start_date, cycle_length, period_length) VALUES (?, ?, ?)';
    db.query(query, [start_date, cycle_length, period_length], (err, result) => {
        if (err) {
            return res.json({ success: false, message: err.message });
        }
        
        // Calculate the next period start date based on the cycle length
        let next_period_start = new Date(start_date);
        next_period_start.setDate(next_period_start.getDate() + parseInt(cycle_length));

        res.json({
            success: true,
            next_period_start: next_period_start.toDateString(),
            period_length: period_length,
            cycle_length: cycle_length
        });
    });
});

app.listen(port, () => {
    console.log(Server running on http://localhost:${port});
});