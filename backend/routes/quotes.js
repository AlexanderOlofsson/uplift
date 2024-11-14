const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - random quote
router.get('/daily-quote', async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT * FROM quotes
      ORDER BY RANDOM()
      LIMIT 1
      `
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bro, there is legit zero quotes.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Something went wrong fetching daily quote:', error);
    res.status(500).json({ message: 'Failed to fetch quotes.' });
  }
});

module.exports = router;
