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

const resetStreakIfNoTaskCompleted = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const usersResult = await db.query('SELECT user_id FROM statistics');
    const users = usersResult.rows;

    for (const user of users) {
      // check if user did complete anything today
      const completedTasksResult = await db.query(
        `
        SELECT COUNT(*) AS completed_count
        FROM dailyactivities
        WHERE user_id = $1 AND completed_date = $2
        `,
        [user.user_id, today]
      );

      const completedCount = parseInt(completedTasksResult.rows[0].completed_count, 10);

      if (completedCount === 0) {
        // reset streak
        await db.query(
          `
          UPDATE statistics
          SET streak_days = 0, updated_at = NOW()
          WHERE user_id = $1
          `,
          [user.user_id]
        );
        console.log(`Streak reset to 0 for user ${user.user_id}`);
      }
    }
  } catch (error) {
    console.error('Could not reset streak:', error);
  }
};



// Function runs every midnight (CEST) for assigning activities, resetting tasks, and updating streaks
cron.schedule(
  '0 0 * * *',
  async () => {
    console.log('Running midnight tasks...');
    await assignDailyActivities();
    await resetCompletedTasks();
    await resetStreakIfNoTaskCompleted();
  },
  {
    timezone: 'Europe/Stockholm',
  }
);

module.exports = { assignDailyActivities, assignDailyActivitiesForUser };
