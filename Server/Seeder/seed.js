const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');

const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("../config/db"); 
const Province = require("../Models/province_model");
const City = require("../Models/city_model");
const User = require("../Models/user_model");
const UserLocation = require("../Models/user_location_model");
const Admin = require("../Models/admin_model");
const Delivery = require("../Models/delivery_model");
const Restaurant = require("../Models/restaurant_model");

const seed = async () => {
  try {
    // 1️⃣ Connect to DB
    await connectDB();

    // 2️⃣ Clear collections
    await Province.deleteMany({});
    await City.deleteMany({});
    await User.deleteMany({});
    await UserLocation.deleteMany({});
    await Admin.deleteMany({});
    await Delivery.deleteMany({});
    await Restaurant.deleteMany({});

    // 3️⃣ Seed Provinces
    const provinces = await Province.insertMany([
      { provinceName: "Sindh" },
      { provinceName: "Punjab" },
      { provinceName: "Balochistan" },
      { provinceName: "KPK" }
    ]);
    console.log("Provinces seeded.");

    // 4️⃣ Seed Cities
    const cities = await City.insertMany([
      { provinceId: provinces[0]._id, cityName: "Karachi" },
      { provinceId: provinces[1]._id, cityName: "Lahore" },
      { provinceId: provinces[2]._id, cityName: "Quetta" },
      { provinceId: provinces[3]._id, cityName: "Peshawar" }
    ]);
    console.log("Cities seeded.");

    // 5️⃣ Seed Users
    const hashedPassword = await bcrypt.hash("123", 10);

    const users = await User.insertMany([
      {
        username: "Abdullah Siddiqui",
        email: "abdullahsidzz333@gmail.com",
        password: hashedPassword,
        gender: "male",
        phone: "03001234567"
      },
      {
        username: "Kashif",
        email: "kashif@gmail.com",
        password: hashedPassword,
        gender: "male",
        phone: "03007654321"
      }
    ]);
    console.log("Users seeded.");

    // 6️⃣ Seed UserLocations
    await UserLocation.insertMany([
      {
        userId: users[0]._id,
        address: "Suujani sector L-1 plot L-8",
        cityId: cities[0]._id,
        isPrimary: true,
        latitude: 25.0102241,
        longitude: 67.0628654
      },
      {
        userId: users[1]._id,
        address: "Gulshan-e-Iqbal Block 3",
        cityId: cities[0]._id,
        isPrimary: true,
        latitude: 25.015000,
        longitude: 67.065000
      }
    ]);
    console.log("UserLocations seeded.");

    // 7️⃣ Seed Admins
    await Admin.insertMany([
      { username: "Admin1", email: "admin1@example.com", password: hashedPassword },
      { username: "Admin2", email: "admin2@example.com", password: hashedPassword }
    ]);
    console.log("Admins seeded.");

    // 8️⃣ Seed Deliveries
    await Delivery.insertMany([
      {
        name: "Ali",
        email: "ali@example.com",
        cnic: "12345-6789012-3",
        phone_number: "03001112233",
        dob: new Date("1995-01-01"),
        vehical: "bike",
        status: "active",
        gender: "male",
        password: hashedPassword
      },
      {
        name: "Ahmed",
        email: "ahmed@example.com",
        cnic: "98765-4321098-7",
        phone_number: "03004445566",
        dob: new Date("1998-05-12"),
        vehical: "cycle",
        status: "active",
        gender: "male",
        password: hashedPassword
      }
    ]);
    console.log("Deliveries seeded.");

    // 9️⃣ Seed Restaurants
    await Restaurant.insertMany([
      {
        username: "FoodKing",
        email: "foodking@example.com",
        status: "active",
        password: hashedPassword
      },
      {
        username: "BurgerHouse",
        email: "burgerhouse@example.com",
        status: "active",
        password: hashedPassword
      }
    ]);
    console.log("Restaurants seeded.");

    console.log("✅ All seeding complete!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
