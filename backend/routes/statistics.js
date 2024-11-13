const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

// Check token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing buddy.' });
    }

    jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Bad token.' });
        }
        req.user = user;
        next();
    });
};

// PUT - Mark task as completed and update statistics
router.put('/complete-task', authenticateToken, async (req, res) => {
  const { activityId, category } = req.body;
  const userId = req.user.userId;

  try {
    const updateTaskResult = await db.query(
      `
      UPDATE DailyActivities
      SET completed = TRUE
      WHERE activity_id = $1 AND user_id = $2 AND date = CURRENT_DATE
      RETURNING *
      `,
      [activityId, userId]
    );

    if (updateTaskResult.rowCount === 0) {
      return res.status(404).json({ message: 'Activity not found or already completed.' });
    }

    let updateQuery = `
      UPDATE statistics
      SET total_tasks_completed = total_tasks_completed + 1, updated_at = NOW()
    `;

    if (category === 'Mental') {
      updateQuery += ', mental_tasks_completed = mental_tasks_completed + 1';
    } else if (category === 'Physical') {
      updateQuery += ', physical_tasks_completed = physical_tasks_completed + 1';
    } else if (category === 'Social') {
      updateQuery += ', social_tasks_completed = social_tasks_completed + 1';
    }

    updateQuery += ' WHERE user_id = $1';

    await db.query(updateQuery, [userId]);

    res.json({ message: 'Task marked as completed and statistics updated.' });
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ message: 'Could not complete task.' });
  }
});



module.exports = router;
