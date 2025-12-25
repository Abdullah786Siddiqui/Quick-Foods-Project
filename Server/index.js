require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userAuthRoutes = require('./Routes/User/userAuthRoutes');
const userRoutes = require('./Routes/User/userRoutes');
const adminAuthRoutes = require('./Routes/Admin/adminAuthRoutes');
const restaurantAuthRoutes = require('./Routes/Restaurant/restaurantAuthRoutes');

const connectDB = require('./config/db');
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
// User Routes
app.use('/api/auth', userAuthRoutes);
app.use('/api/user', userRoutes);

// Admin Routes
app.use('/api/auth', adminAuthRoutes);

// Restaurant Routes
app.use('/api/auth', restaurantAuthRoutes);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // connect to database
  connectDB();
  console.log(`Quick Food app listening on port ${port}`);
});
