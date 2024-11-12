const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); 
const activity = require('./routes/activity'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/api/activities', activity); 


app.get('/api/random-tasks', async (req, res) => {
  try {
    const categories = ['Physical', 'Mental', 'Social'];
    const tasks = {};

    for (const category of categories) {
      const result = await db.query(
        `SELECT * FROM Activities WHERE category = $1 ORDER BY RANDOM() LIMIT 1`,
        [category]
      );
      tasks[category] = result.rows[0]; 
    }

    res.json(tasks); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});


app.get('/', (req, res) => {
  res.send('Welcome to the Uplift API');
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });