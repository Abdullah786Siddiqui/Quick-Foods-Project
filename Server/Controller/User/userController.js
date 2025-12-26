const User = require("../../Models/user_model");
const jwt = require("jsonwebtoken");

exports.me = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }

};




// exports.getAllUsers = async (req, res) => {
//     console.log(req.user.role);
    
// //   try {
// //     const users = await User.find().select("-password");

// //     res.status(200).json({
// //       success: true,
// //       users,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Internal Server Error",
// //     });
// //   }
// };


