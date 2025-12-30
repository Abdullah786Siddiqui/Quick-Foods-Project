const Restaurant = require("../../Models/restaurant_model");
const RestaurantLocation = require("../../Models/restautant_location_model");
const City = require("../../Models/city_model");
const Province = require("../../Models/province_model");


exports.fetchAllRestaurant = async (req, res) => {

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search?.trim() || "";

    const searchCondition = searchQuery
      ? {
        $or: [
          { username: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
          { phone: { $regex: searchQuery, $options: "i" } }
        ]
      }
      : {};

    // Count total / Active / Inactive users matching search
    const totalRestaurant = await Restaurant.countDocuments(); // total users in DB
    const activeRestaurant = await Restaurant.countDocuments({ status: "active" });
    const inactiveRestaurant = await Restaurant.countDocuments({ status: "inactive" });

      const restaurants = await Restaurant.find(searchCondition)
   .select("-password")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean()
    .populate({
      path: "locations",
      populate: { path: "timings" }
    });

     res.status(200).json({
            restaurant: restaurants,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalRestaurant / limit),
                limit
            },
            stats:{
                totalRestaurant,
                activeRestaurant,
                inactiveRestaurant,
            }
          });

     
  } catch (error) {
 console.error(error);
        res.status(500).json({ message: error.message });
  }



};