const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbFountain = new Client({
  connectionString: process.env.PGURI,
});

dbFountain.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

module.exports = dbFountain;
