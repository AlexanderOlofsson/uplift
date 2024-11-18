const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const activityRoutes = require('./routes/activity');
const mentorsRoutes = require('./routes/mentor');
const statisticsRoutes = require('./routes/statistics');
const quotesRouter = require('./routes/quotes')
require('./scheduler');

const BASE_URL = process.env.VITE_BASE_URL || 'http://localhost:3000';
console.log('VITE_BASE_URL:', process.env.VITE_BASE_URL);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/mentor', mentorsRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/quotes', quotesRouter);



app.use(express.static(path.join(path.resolve(), 'dist')));

app.get('*', (req, res) => {
  const apiRoutes = ['/auth', '/users', '/api', '/mentor', '/statistics', '/quotes'];
  if (apiRoutes.some(route => req.originalUrl.startsWith(route))) {
    return res.status(404).send('API route not found');
  }

  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
