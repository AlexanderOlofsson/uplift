// https://www.npmjs.com/package/node-cron
const cron = require('node-cron');
const db = require('./db');

// Give out activities to all users
async function assignDailyActivities() {
  try {
    const usersResult = await db.query('SELECT uid FROM Users');
    const users = usersResult.rows;
    const categories = ['Physical', 'Mental', 'Social'];

    for (const user of users) {
      for (const category of categories) {
        // Get a random activity from the specific category
        const activityResult = await db.query(`
          SELECT id FROM Activities WHERE category = $1 ORDER BY RANDOM() LIMIT 1
        `, [category]);

        if (activityResult.rows.length > 0) {
          const activity = activityResult.rows[0];

          await db.query(`
            INSERT INTO DailyActivities (user_id, activity_id, date, category)
            VALUES ($1, $2, CURRENT_DATE, $3)
            ON CONFLICT (user_id, date, category) DO NOTHING
          `, [user.uid, activity.id, category]);
        }
      }
    }
    console.log('Dagliga aktiviteter tilldelade per kategori.');
  } catch (error) {
    console.error('Error assigning daily activities:', error);
  }
}

// Assign daily activities to a specific user (new user)
async function assignDailyActivitiesForUser(userId) {
  try {
    const categories = ['Physical', 'Mental', 'Social'];

    for (const category of categories) {
      // Get a random activity from the specific category
      const activityResult = await db.query(`
        SELECT id FROM Activities WHERE category = $1 ORDER BY RANDOM() LIMIT 1
      `, [category]);

      if (activityResult.rows.length > 0) {
        const activity = activityResult.rows[0];

        await db.query(`
          INSERT INTO DailyActivities (user_id, activity_id, date, category)
          VALUES ($1, $2, CURRENT_DATE, $3)
          ON CONFLICT (user_id, date, category) DO NOTHING
        `, [userId, activity.id, category]);
      }
    }
    console.log(`Activities assigned to user: ${userId}`);
  } catch (error) {
    console.error(`Error assigning daily activities for user ${userId}:`, error);
  }
}

// Function runs every midnight (CEST)
cron.schedule('0 0 * * *', () => {
  const currentTime = new Date();
  const CESTOffset = 2;
  currentTime.setHours(currentTime.getHours() + CESTOffset);

  if (currentTime.getHours() === 0) {
    assignDailyActivities();
  }
}, {
  timezone: 'Europe/Stockholm'
});

module.exports = { assignDailyActivities, assignDailyActivitiesForUser };
