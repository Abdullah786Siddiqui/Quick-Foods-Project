const User = require("../../Models/user_model");

    exports.fetchAllUsers = async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }