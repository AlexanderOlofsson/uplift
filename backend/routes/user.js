const express = require('express');
const router = express.Router();
const dbFountain = require('../db');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const bcrypt = require('bcrypt');

// Middleware to check the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Bad token' });
        req.user = user; // Save user data from token
        next();
    });
};

// CREATE - Add a cool new user
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

// READ - Get the awesome users profile data (fixed birth_date format)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
      const result = await dbFountain.query(
        'SELECT first_name, last_name, TO_CHAR(birth_date, \'YYYY-MM-DD\') AS birth_date, username, email FROM users WHERE uid = $1',
        [req.user.userId]
    );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// UPDATE - Update the amazing users profile data
router.put('/profile', authenticateToken, async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    console.log('Incoming data:', { firstName, lastName, username, email, password });

    let query = `
      UPDATE users
      SET first_name = $1, last_name = $2, username = $3, email = $4
    `;

    const values = [firstName, lastName, username, email];

    if (password) {
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = $5`;
      values.push(hashedPassword);
    }

    query += ` WHERE uid = $${values.length + 1} RETURNING first_name, last_name, TO_CHAR(birth_date, 'YYYY-MM-DD') AS birth_date, username, email`;

    values.push(req.user.userId);

    console.log('Final SQL Query:', query, values);

    const result = await dbFountain.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (error) {
    console.error('Error in profile update:', error);
    res.status(500).json({ message: 'Something went wrong during update' });
  }
});





// DELETE - Sadly, Delete the user
router.delete('/profile', authenticateToken, async (req, res) => {
  try {
      const result = await dbFountain.query('DELETE FROM users WHERE uid = $1 RETURNING *', [req.user.userId]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'User is MIA (DELETE).' });
      }

      res.json({ message: 'Account was deleted.' }); // Confirm deletion
  } catch (error) {
      console.error('Error during account deletion:', error); // Log everything
      res.status(500).json({ message: 'Failed deleting account, maybe the person wants to stay?' });
  }
});


module.exports = router;
