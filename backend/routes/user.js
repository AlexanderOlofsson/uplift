const express = require('express');
const router = express.Router();
const dbFountain = require('../db');

// CREATE - Add a new user
router.post('/create', async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const result = await dbFountain.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );


        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

module.exports = router;
