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
        const activityResult = await db.query(
          `
          SELECT id FROM Activities WHERE category = $1 ORDER BY RANDOM() LIMIT 1
          `,
          [category]
        );

        if (activityResult.rows.length > 0) {
          const activity = activityResult.rows[0];

          await db.query(
            `
            INSERT INTO DailyActivities (user_id, activity_id, date, category)
            VALUES ($1, $2, CURRENT_DATE, $3)
            ON CONFLICT (user_id, date, category) DO NOTHING
            `,
            [user.uid, activity.id, category]
          );
        }
      }
    }
    console.log('Activities added to user/users.');
  } catch (error) {
    console.error('Something went wrong assigning daily activities:', error);
  }
}

// Assign daily activities to a specific user (new user)
async function assignDailyActivitiesForUser(userId) {
  try {
    const categories = ['Physical', 'Mental', 'Social'];

    for (const category of categories) {
      // Get a random activity from the specific category
      const activityResult = await db.query(
        `
        SELECT id FROM Activities WHERE category = $1 ORDER BY RANDOM() LIMIT 1
        `,
        [category]
      );

      if (activityResult.rows.length > 0) {
        const activity = activityResult.rows[0];

        await db.query(
          `
          INSERT INTO DailyActivities (user_id, activity_id, date, category)
          VALUES ($1, $2, CURRENT_DATE, $3)
          ON CONFLICT (user_id, date, category) DO NOTHING
          `,
          [userId, activity.id, category]
        );
      }
    }
    console.log(`Activities got assigned to user: ${userId}`);
  } catch (error) {
    console.error(`Something wrong happened when assigning for user ${userId}:`, error);
  }
}

// Reset completed tasks to FALSE (need testing)
const resetCompletedTasks = async () => {
  try {
    await db.query(
      `
      UPDATE DailyActivities
      SET completed = FALSE
      WHERE date = CURRENT_DATE
      `
    );
    console.log('All tasks reset.');
  } catch (error) {
    console.error('Could not reset tasks:', error);
  }
};


// Function runs every midnight (CEST) for assigning activities, resetting tasks, and updating streaks
cron.schedule(
  '0 0 * * *',
  async () => {
    console.log('Running midnight tasks...');
    await assignDailyActivities();
    await resetCompletedTasks();
  },
  {
    timezone: 'Europe/Stockholm',
  }
);

module.exports = { assignDailyActivities, assignDailyActivitiesForUser };
