const Restaurant = require("../../Models/restaurant_model");
const RestaurantLocation = require("../../Models/restautant_location_model");
const City = require("../../Models/city_model");
const Province = require("../../Models/province_model");

// Fetch Main Restaurant
exports.fetchMainRestaurant = async (req, res) => {

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

    const restaurants = await Restaurant.find({
      ...searchCondition,
    })
      .select("username email phone status  image")
      .skip(skip)
      .lean()
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate({
        path: "locations",
        match: { is_main: true },
        select: "locality",
        populate: { path: "timings", select: "week_day opening_time closing_time", }
      });

    res.status(200).json({
      restaurant: restaurants,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRestaurant / limit),
        limit
      },
      stats: {
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

// Fetch Branches of Main Restaurant
exports.fetchAllBranchRestaurants = async (req, res) => {
  try {
    const restaurant_id = req.params.id;
    if (!restaurant_id) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const restaurant = await Restaurant.findById(restaurant_id)
      .select("username email phone status image")
      .populate({
        path: "locations",
        match: { is_main: false }, // sirf branches
        select: "branch_email branch_phone_number",
        populate: {
          path: "timings",
          select: "week_day opening_time closing_time"
        }
      })
      .lean();

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Wrap in array to keep frontend loop simple
    const restaurants = [
      {
        _id: restaurant._id,
        username: restaurant.username,
        email: restaurant.email,
        phone: restaurant.phone,
        status: restaurant.status,
        image: restaurant.image,
        locations: restaurant.locations.map(loc => ({
          _id: loc._id,
          branch_email: loc.branch_email,
          branch_phone_number: loc.branch_phone_number,
          timings: loc.timings.map(t => ({
            week_day: t.week_day,
            opening_time: t.opening_time,
            closing_time: t.closing_time
          }))
        }))
      }
    ];

    res.status(200).json({ restaurants });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// exports.fetchDetailsRestaurant = async (req, res) => {
//   try {
//     const restaurant_id = req.params.id;
//     if (!restaurant_id) {
//       return res.status(400).json({ message: "Restaurant ID is required" });
//     }

//     const restaurant = await Restaurant.findById(restaurant_id)
//       .populate({
//         path: "locations",
//         match: { restaurant_id: restaurant_id }, 
//         populate: {
//           path: "timings",
//         }
//       })
//       .lean();

//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }


//     res.status(200).json({ restaurant });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// }


exports.fetcRestaurantDetails = async (req, res) => {
  try {
    const locationId = req.params.id;

    if (!locationId) {
      return res.status(400).json({ message: "Location ID is required" });
    }

    const RestaurantDetails = await RestaurantLocation.findById(locationId)
      .populate("restaurant_id") // Restaurant info
      .populate("city_id")
      .populate("province_id")
      .populate({
        path: "timings",
      })
      .lean();

    if (!RestaurantDetails) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ RestaurantDetails });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
