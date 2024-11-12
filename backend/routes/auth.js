const express = require('express');
const router = express.Router();
const dbFountain = require('../db');
// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');
// https://www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');
const { assignDailyActivitiesForUser } = require('../scheduler');

const JWT_KEY = process.env.JWT_KEY;

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await dbFountain.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'That username does not exist. Or something in my code is wrong, lol.' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password.' });
        }

        // Check if the user already has activities for today
        const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
        const activitiesResult = await dbFountain.query(
            `SELECT * FROM DailyActivities WHERE user_id = $1 AND date = $2`,
            [user.uid, today]
        );

        if (activitiesResult.rows.length === 0) {
            // Assign activities if it's the user's first login of the day
            await assignDailyActivitiesForUser(user.uid);
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user.uid }, JWT_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful.', token }); // Send the token back to client
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { firstName, lastName, birthDate, username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add the new user into the db
        const result = await dbFountain.query(
            'INSERT INTO users (first_name, last_name, birth_date, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstName, lastName, birthDate, username, email, hashedPassword]
        );

        // Status created user data
        res.status(201).json({ message: 'Account created.', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create account. Dont hate the game, hate the server.' });
    }
});

module.exports = router;
