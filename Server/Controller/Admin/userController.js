const User = require("../../Models/user_model");
const UserLocation = require("../../Models/user_location_model");
const City = require("../../Models/city_model");
const Province = require("../../Models/province_model");


exports.fetchAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.search?.trim() || "";

        // Search condition
        const searchCondition = searchQuery
            ? {
                $or: [
                    { username: { $regex: searchQuery, $options: "i" } },
                    { email: { $regex: searchQuery, $options: "i" } },
                    { phone: { $regex: searchQuery, $options: "i" } }
                ]
            }
            : {};

        // Count total users matching search
        const totalUsers = await User.countDocuments(searchCondition);

        // Fetch users with pagination
        const users = await User.find(searchCondition)
            .select("-password")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean(); // convert to plain JS objects for easier modification

        // Populate locations
        const usersWithLocations = await Promise.all(
            users.map(async (user) => {
                const location = await UserLocation.findOne({ userId: user._id })
                    .populate({
                        path: "cityId",
                        populate: { path: "provinceId", model: "Province" }
                    })
                    .lean();

                return {
                    ...user,
                    location: location
                        ? {
                            address: location.address,
                            city: location.cityId?.cityName || null,
                            province: location.cityId?.provinceId?.provinceName || null,
                            country: location.country,
                            latitude: location.latitude || null,   
                            longitude: location.longitude || null  
                        }
                        : null
                };
            })
        );

        res.status(200).json({
            users: usersWithLocations,
            pagination: {
                totalUsers,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                limit
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

