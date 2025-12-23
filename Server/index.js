require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./config/db');
const port = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // connect to database
  connectDB();
  console.log(`Quick Food app listening on port ${port}`);
});
