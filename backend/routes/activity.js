const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

const JWT_key = process.env.JWT_KEY;

// verify JWT token and extract userId
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from header

  if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

  jwt.verify(token, JWT_key, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = user.userId;
    next();
  });
};

// Get activities for specific user - using token
router.get('/daily-activities', authenticateToken, async (req, res) => {
  try {
    // Get the daily activities for this user
    const result = await db.query(`
      SELECT a.* FROM DailyActivities d
      JOIN Activities a ON d.activity_id = a.id
      WHERE d.user_id = $1 AND d.date = CURRENT_DATE
    `, [req.userId]);

    // Organize activities by category
    const tasks = {
      Physical: result.rows.find(activity => activity.category === 'Physical'),
      Mental: result.rows.find(activity => activity.category === 'Mental'),
      Social: result.rows.find(activity => activity.category === 'Social')
    };

    res.json(tasks); // Send back to frontend
  } catch (error) {
    console.error('Error fetching daily activities:', error);
    res.status(500).json({ error: 'Failed to fetch daily activities' });
  }
});

module.exports = router;
