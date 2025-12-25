const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Restaurant = require("../../../Models/restaurant_model");





// Restaurant SIGNUP
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingRestaurant = await Restaurant.findOne({ email });
        if (existingRestaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const restaurant = new Restaurant({
            username,
            email,
            password: hashedPassword,
            role: "restaurant",
        });

        await restaurant.save();

        res.status(201).json({
            success: true,
            message: "Restaurant signup successful",
            restaurant: {
                id: restaurant._id,
                username: restaurant.username,
                email: restaurant.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, restaurant.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: restaurant._id,
                email: restaurant.email,
                role: "restaurant",
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            success: true,
            message: "Restaurant login successful",
            token,
            restaurant: {
                id: restaurant._id,
                username: restaurant.username,
                email: restaurant.email,
                role: restaurant.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};
