const express = require('express');
const router = express.Router();
const db = require('../db'); 


router.get('/random-activities', async (req, res) => {
  try {
    const categories = ['Physical', 'Mental', 'Social'];
    const tasks = {};

    for (let category of categories) {
      const result = await db.query(
        'SELECT * FROM Activities WHERE category = $1 ORDER BY RANDOM() LIMIT 3',
        [category]
      );
      tasks[category] = result.rows;
    }

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching random activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

module.exports = router;
