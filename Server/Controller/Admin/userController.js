const User = require("../../Models/user_model");

exports.fetchAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;   // current page
        const limit = parseInt(req.query.limit) || 10; // records per page
        const skip = (page - 1) * limit;

        // total users count
        const totalUsers = await User.countDocuments();

        // paginated users
        const users = await User.find()
            .select("-password")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // latest first

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
        res.status(500).json({ message: error.message });
    }
};
