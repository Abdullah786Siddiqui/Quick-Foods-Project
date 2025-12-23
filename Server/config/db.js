const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/quick_foods_db`);
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = connectDB