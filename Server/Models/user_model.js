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
        enum: ["male", "female", "other"],
        default: null
    },
    phone: {
        type: String,
        default: null

    },
    avatar: {
        type: String,
        default: null

    }


}, { timestamps: true }
)

module.exports = model("User", userSchema);