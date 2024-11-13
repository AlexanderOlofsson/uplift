const express = require('express');
const router = express.Router();
const dbFountain = require('../db');


const handleError = (res, message, error) => {
  console.error(message, error);
  res.status(500).json({ message });
};

// Hämtar mentor för en specifik user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await dbFountain.query(
      `SELECT u.username AS mentor_name
       FROM mentors m
       JOIN users u ON m.mentor_id = u.uid  -- Rätt fält för användarens primärnyckel
       WHERE m.user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No mentor found for this user' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    handleError(res, 'Error fetching mentor', error);
  }
});

// Hämtar "pending" aktiviteter/activity som väntar på godkännande av mentorn
router.get('/activities/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  try {
    const result = await dbFountain.query(
      `SELECT da.id AS daily_activity_id, 
              da.date, 
              da.category, 
              a.description, 
              da.user_id, 
              u.username AS user_name
       FROM dailyactivities da
       JOIN activities a ON da.activity_id = a.id
       JOIN users u ON da.user_id = u.uid  -- Korrigerad till uid
       WHERE da.completed = TRUE 
         AND da.status = 'pending'
         AND EXISTS (
           SELECT 1 FROM mentors m 
           WHERE m.mentor_id = $1 AND m.user_id = da.user_id
         )`,
      [mentorId]
    );

    res.json(result.rows.length > 0 ? result.rows : { message: 'No pending activities for this mentor' });
  } catch (error) {
    handleError(res, 'Error fetching activities for approval', error);
  }
});

// Godkänna en specifik aktivitet/activity
router.post('/approve', async (req, res) => {
  const { dailyActivityId, mentorId } = req.body;

  if (!dailyActivityId || !mentorId) {
    return res.status(400).json({ message: 'DailyActivityId and MentorId are required' });
  }

  try {
    const result = await dbFountain.query(
      `UPDATE dailyactivities
       SET status = 'complete'
       WHERE id = $1
         AND EXISTS (
           SELECT 1 FROM mentors
           WHERE mentor_id = $2
           AND user_id = (SELECT user_id FROM dailyactivities WHERE id = $1)
         )
       RETURNING *`,
      [dailyActivityId, mentorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Activity not found or unauthorized mentor' });
    }

    res.status(200).json({ message: 'Activity approved by mentor', activity: result.rows[0] });
  } catch (error) {
    handleError(res, 'Error approving activity', error);
  }
});

// Godkänn alla aktiviteter/activity i en viss kategori för en user kopplade till en mentor
router.post('/approve/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const result = await dbFountain.query(
      `UPDATE dailyactivities
       SET status = 'complete'
       WHERE id IN (
         SELECT da.id FROM dailyactivities da
         JOIN activities a ON da.activity_id = a.id
         WHERE a.category = $1 AND da.user_id IN (
           SELECT user_id FROM mentors WHERE mentor_id = $2
         )
       )
       RETURNING *`,
      [category, mentorId]
    );

    res.json(result.rows.length > 0 ? { message: `${category} activities approved`, activities: result.rows } : { message: 'No activities found for approval' });
  } catch (error) {
    handleError(res, 'Error approving activities', error);
  }
});

// Avslå/reject en specifik aktivitet/activity
router.post('/reject', async (req, res) => {
  const { dailyActivityId, mentorId } = req.body;

  if (!dailyActivityId || !mentorId) {
    return res.status(400).json({ message: 'DailyActivityId and MentorId are required' });
  }

  try {
    const result = await dbFountain.query(
      `UPDATE dailyactivities
       SET status = 'failed'
       WHERE id = $1
         AND EXISTS (
           SELECT 1 FROM mentors
           WHERE mentor_id = $2
           AND user_id = (SELECT user_id FROM dailyactivities WHERE id = $1)
         )
       RETURNING *`,
      [dailyActivityId, mentorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Activity not found or unauthorized mentor' });
    }

    res.status(200).json({ message: 'Activity rejected by mentor', activity: result.rows[0] });
  } catch (error) {
    handleError(res, 'Error rejecting activity', error);
  }
});

module.exports = router;
