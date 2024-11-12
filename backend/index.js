const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const activityRoutes = require('./routes/activity');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api/activities', activityRoutes)
app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
