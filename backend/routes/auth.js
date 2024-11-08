const express = require('express');
const router = express.Router();
const dbFountain = require('../db');
const bcrypt = require('bcrypt');

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

        res.json({ message: 'Login did work.', userId: user.uid });
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

        // Insert the new user into the database
        const result = await dbFountain.query(
            'INSERT INTO users (first_name, last_name, birth_date, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstName, lastName, birthDate, username, email, hashedPassword]
        );

        // Respond with the created user data
        res.status(201).json({ message: 'Account created.', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create account. Blame the server.' });
    }
});

module.exports = router;
