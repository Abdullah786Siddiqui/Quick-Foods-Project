// controllers/userAuthController.js
const User = require("../../../Models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




// // SIGNUP
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Signup successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message , message: "Internal Server Error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const JwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successfuly",
      token: JwtToken,
      name: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  // Since JWT is stateless, logout can be handled on the client side by deleting the token.
  res.status(200).json({ message: "Logout successfully" });
};
