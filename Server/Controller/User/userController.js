const User = require("../../Models/user_model");
const jwt = require("jsonwebtoken");

exports.me = async (req, res) => {
 res.send("Users Details endpoint");
};

