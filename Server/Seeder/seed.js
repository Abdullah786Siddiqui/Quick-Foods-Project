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
const DeliveryRider = require("../Models/deliveryRider_model");
const Restaurant = require("../Models/restaurant_model");
const RestaurantLocation = require('../Models/restautant_location_model')
const RestaurantTiming = require('../Models/restaurant_timing_model')
const DeliveryRiderLocation = require('../Models/deliveryRider_location_model')
const Category = require("../Models/category_model");
const MenuItem = require("../Models/menuItem_model");


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
    await DeliveryRider.deleteMany({});
    await Restaurant.deleteMany({});
    await RestaurantLocation.deleteMany({});
    await RestaurantTiming.deleteMany({});
    await DeliveryRiderLocation.deleteMany({});
    await Category.deleteMany({});
    await MenuItem.deleteMany({});



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
      { username: "Admin", email: "admin@gmail.com", password: hashedPassword }
    ]);
    console.log("Admin seeded.");

    // Seed Deliveries
    const DeliveryRiders = await DeliveryRider.insertMany([
      {
        name: "Ali",
        email: "ali@example.com",
        cnic: "12345-6789012-3",
        phone_number: "03001112233",
        dob: new Date("1995-01-01"),
        vehical: "bike",
        status: "active",
        gender: "male",
        password: hashedPassword,
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
        password: hashedPassword,
      },
      {
        name: "Usman",
        email: "usman@example.com",
        cnic: "35201-1234567-9",
        phone_number: "03007778899",
        dob: new Date("1993-09-20"),
        vehical: "bike",
        status: "inactive",
        gender: "male",
        password: hashedPassword,
      },
    ]);

    console.log("✅ DeliveryPartners seeded");

    // Seed Delivery Locations (ONE TO ONE)
    await DeliveryRiderLocation.insertMany([
      {
        delivery_rider_id: DeliveryRiders[0]._id,
        city_id: null,
        province_id: null,
        address: "Street 10, Gulshan-e-Iqbal",
        locality: "Gulshan",
        latitude: 24.9200,
        longitude: 67.0900,
      },
      {
        delivery_rider_id: DeliveryRiders[1]._id,
        city_id: null,
        province_id: null,
        address: "Block B, Johar Town",
        locality: "Johar Town",
        latitude: 31.4697,
        longitude: 74.2728,
      },
      {
        delivery_rider_id: DeliveryRiders[2]._id,
        city_id: null,
        province_id: null,
        address: "Satellite Town",
        locality: "Rawalpindi",
        latitude: 33.6430,
        longitude: 73.0650,
      },
    ]);

    console.log("Delivery Rider  locations seeded");



    // 9️⃣ Seed Restaurants
    const restaurants = await Restaurant.insertMany([
      {
        username: "FoodKing",
        email: "foodking@example.com",
        phone: "03001234567",
        status: "active",
        rating: 4.3,
        password: hashedPassword
      },
      {
        username: "BurgerHouse",
        email: "burgerhouse@example.com",
        status: "active",
        rating: 3.3,
        phone: "03001112233",
        password: hashedPassword
      },
      {
        username: "KababHouse",
        email: "kababhouse@example.com",
        status: "active",
        rating: 2.3,
        phone: "03001112933",
        password: hashedPassword
      }
    ]);
    console.log("Restaurants seeded.");

    const RestaurantLocations = await RestaurantLocation.insertMany([
      {
        restaurant_id: restaurants[0]._id, // FoodKing
        city_id: cities[1]._id,            // Lahore
        province_id: provinces[1]._id,     // Punjab
        is_main: true,
        address: "123 Main Street",
        locality: "Downtown",
        branch_email: "mainbranch@foodking.com",
        branch_phone_number: "03001234567",
        latitude: 31.5204,
        longitude: 74.3587
      },
      {
        restaurant_id: restaurants[0]._id, // FoodKing
        city_id: cities[0]._id,            // Karachi
        province_id: provinces[0]._id,     // Sindh
        is_main: false,
        address: "456 Market Road",
        locality: "Clifton",
        branch_email: "branch2@foodking.com",
        branch_phone_number: "03007654321",
        latitude: 25.0150,
        longitude: 67.0650
      },
      {
        restaurant_id: restaurants[1]._id, // BurgerHouse
        city_id: cities[1]._id,            // Lahore
        province_id: provinces[1]._id,     // Punjab
        is_main: true,
        address: "789 Burger Street",
        locality: "Gulberg",
        branch_email: "mainbranch@burgerhouse.com",
        branch_phone_number: "03001112233",
        latitude: 31.5210,
        longitude: 74.3590
      },
      {
        restaurant_id: restaurants[2]._id, // KababHouse ✅
        city_id: cities[1]._id,            // Lahore
        province_id: provinces[1]._id,     // Punjab
        is_main: true,
        address: "789 Kabab Street",
        locality: "Johar",
        branch_email: "mainbranch@kababhouse.com",
        branch_phone_number: "03001912233",
        latitude: 31.5210,
        longitude: 74.3590
      },
      {
        restaurant_id: restaurants[0]._id, // FoodKing
        city_id: cities[3]._id,
        province_id: provinces[3]._id,
        is_main: false,
        address: "456 Bahadur Road",
        locality: "Defense",
        branch_email: "branch3@foodking.com",
        branch_phone_number: "03607654321",
        latitude: 25.0150,
        longitude: 67.0650
      },
    ]);


    console.log("RestaurantLocations seeded.");
    await RestaurantTiming.insertMany([
      {
        restaurant_location_id: RestaurantLocations[0]._id, // FoodKing Lahore
        week_day: "Monday to Sunday",
        opening_time: "09:00:00",
        closing_time: "22:00:00"
      },
      {
        restaurant_location_id: RestaurantLocations[1]._id, // FoodKing Karachi
        week_day: "Monday to Sunday",
        opening_time: "08:00:00",
        closing_time: "21:00:00"
      },
      {
        restaurant_location_id: RestaurantLocations[2]._id, // BurgerHouse Lahore
        week_day: "Monday to Sunday",
        opening_time: "08:00:00",
        closing_time: "21:00:00"
      },
      {
        restaurant_location_id: RestaurantLocations[3]._id, // KababHouse Lahore
        week_day: "Monday to Sunday",
        opening_time: "10:00:00",
        closing_time: "23:00:00"
      },
      {
        restaurant_location_id: RestaurantLocations[4]._id, // FoodKing Karachi
        week_day: "Monday to Sunday",
        opening_time: "08:00:00",
        closing_time: "21:00:00"
      },
    ]);



    console.log("RestaurantTiming seeded.");

     const categories = await Category.insertMany([
      { category_name: "Burgers", category_image: "burger.png" },
      { category_name: "Pizza", category_image: "pizza.png" },
      { category_name: "Desserts", category_image: "dessert.png" }
    ]);
    console.log("Categories seeded.");

    await MenuItem.insertMany([
      {
        restaurant_id: restaurants[0]._id,
        category_id: categories[0]._id,
        item_name: "Cheese Burger",
        image_url: "cheeseburger.png",
        description: "Delicious cheese burger with fresh lettuce and tomato",
        price: 350,
        rating: 4.5,
      },
      {
        restaurant_id: restaurants[0]._id,
        category_id: categories[1]._id,
        item_name: "Margherita Pizza",
        image_url: "margherita.png",
        description: "Classic margherita pizza with mozzarella cheese",
        price: 800,
        rating: 4.2,
      },
      {
        restaurant_id: restaurants[1]._id,
        category_id: categories[0]._id,
        item_name: "Chicken Burger",
        image_url: "chickenburger.png",
        description: "Juicy chicken burger with mayo sauce",
        price: 300,
        rating: 4.0,
      },
      {
        restaurant_id: restaurants[2]._id,
        category_id: categories[2]._id,
        item_name: "Chocolate Cake",
        image_url: "chocolatecake.png",
        description: "Rich chocolate cake with dark chocolate icing",
        price: 450,
        rating: 4.8,
      }
    ]);
    console.log("MenuItems seeded.");



    console.log("✅ All seeding complete!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
