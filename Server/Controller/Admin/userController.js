const User = require("../../Models/user_model");

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
            .sort({ createdAt: -1 });

        res.status(200).json({
            users,
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
