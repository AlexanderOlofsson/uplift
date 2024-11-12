// routes/activity.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route för att hämta tasks baserat på kategori
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  
  try {
    const result = await db.query(
      'SELECT * FROM Activities WHERE category = $1 ORDER BY RANDOM() LIMIT 1',
      [category]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No task found for this category' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

module.exports = router;
