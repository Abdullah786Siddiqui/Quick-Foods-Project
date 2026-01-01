const DeliveryRider = require("../../Models/deliveryRider_model");


exports.fetchAllDeliveryPartners = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.search?.trim() || "";

        // Search condition
        const searchCondition = searchQuery
            ? {
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { email: { $regex: searchQuery, $options: "i" } },
                    { phone_number: { $regex: searchQuery, $options: "i" } }
                ]
            }
            : {};

        // Count total / Active / Inactive users matching search
        const totalDeliveryRider = await DeliveryRider.countDocuments(searchCondition);
        const activeDeliveryRider = await DeliveryRider.countDocuments({
            ...searchCondition,
            status: "active",
        });
        const inactiveDeliveryRider = await DeliveryRider.countDocuments({
            ...searchCondition,
            status: "inactive",
        });


        // Fetch users with pagination
        const DeliveryRiders = await DeliveryRider.find(searchCondition)
            .select("-password")
            .populate({
                path: "location",
                populate: [
                    { path: "city_id", select: "name" },
                    { path: "province_id", select: "name" },
                ],
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean({ virtuals: true })

        res.status(200).json({
            deliveryRiders: DeliveryRiders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalDeliveryRider / limit),
                limit
            },
            stats: {
                totalDeliveryRider,
                activeDeliveryRider,
                inactiveDeliveryRider,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};