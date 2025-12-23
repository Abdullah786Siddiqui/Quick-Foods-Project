const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    phone: {
        type: String
    },
    avatar: {
        type: String
    }


}, { timestamps: true }
)

module.exports = model("User", userSchema);