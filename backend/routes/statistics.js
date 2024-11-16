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
    // Mark the task as completed
    const updateTaskResult = await db.query(
      `
      UPDATE dailyactivities
      SET completed = TRUE, completed_date = CURRENT_DATE
      WHERE activity_id = $1 AND user_id = $2 AND date = CURRENT_DATE
      RETURNING *
      `,
      [activityId, userId]
    );

    if (updateTaskResult.rowCount === 0) {
      return res.status(404).json({ message: 'Activity not found or already completed.' });
    }

    // Update total and category-specific task counts
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

    // Check if this is the first task completed today
    const today = new Date().toISOString().split('T')[0];
    const completedTodayResult = await db.query(
      `
      SELECT COUNT(*) AS completed_count
      FROM DailyActivities
      WHERE user_id = $1 AND completed = TRUE AND date = $2
      `,
      [userId, today]
    );

    const completedToday = parseInt(completedTodayResult.rows[0].completed_count, 10);

    if (completedToday === 1) {
      // First task completed today, update streak
      await db.query(
        `
        UPDATE statistics
        SET streak_days = streak_days + 1, updated_at = NOW()
        WHERE user_id = $1
        `,
        [userId]
      );
      console.log(`Streak incremented for user ${userId}`);
    }

    res.json({ message: 'Task marked as completed, statistics updated, and streak updated if applicable.' });
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ message: 'Could not complete task.' });
  }
});


// GET - Fetch user statistics (for the chart)
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const stats = await db.query(
      `
      SELECT total_tasks_completed, mental_tasks_completed, physical_tasks_completed, social_tasks_completed
      FROM statistics
      WHERE user_id = $1
      `,
      [userId]
    );

    if (stats.rows.length === 0) {
      return res.status(404).json({ message: 'No stats found for the user.' });
    }

    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Something went wrong buddy fetching statistics:', error);
    res.status(500).json({ message: 'Could not fetch statistics.' });
  }
});


router.get('/streak', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await db.query(
      `
      SELECT streak_days
      FROM statistics
      WHERE user_id = $1;
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No streak found for this user.' });
    }

    res.json({ streak_days: result.rows[0].streak_days });
  } catch (error) {
    console.error('Error fetching streak:', error);
    res.status(500).json({ message: 'Something went wrong when fetch streak.' });
  }
});




module.exports = router;
