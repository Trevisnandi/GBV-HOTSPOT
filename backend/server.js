const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3006;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createPool({
    host: 'localhost',       // Change to your database host
    user: 'root',            // Replace with your MySQL username
    password: '28modeLLo',    // Replace with your MySQL password
    database: 'gbv_reports'  // Replace with your database name
});

// Create table if it doesn't exist
const initializeDB = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS reports (
                case_id VARCHAR(50) PRIMARY KEY,
                details TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'Under Review'
            )
        `);
        console.log('Database initialized.');
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

initializeDB();

// Generate random case ID
function generateCaseId() {
    return 'CASE-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

// Report an incident
app.post('/report', async (req, res) => {
    const { details } = req.body;

    if (!details) {
        return res.status(400).send({ message: 'Details are required.' });
    }

    const caseId = generateCaseId();

    try {
        await db.query('INSERT INTO reports (case_id, details) VALUES (?, ?)', [caseId, details]);
        res.status(201).send({ caseId });
    } catch (error) {
        console.error('Failed to save report:', error);
        res.status(500).send({ message: 'Failed to save report.' });
    }
});

// Track a case
app.get('/track/:caseId', async (req, res) => {
    const { caseId } = req.params;

    try {
        const [rows] = await db.query('SELECT status FROM reports WHERE case_id = ?', [caseId]);

        if (rows.length === 0) {
            return res.status(404).send({ message: 'Case not found.' });
        }

        res.send({ caseId, status: rows[0].status });
    } catch (error) {
        console.error('Failed to fetch case status:', error);
        res.status(500).send({ message: 'Failed to fetch case status.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});