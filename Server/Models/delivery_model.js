const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    cnic: {
      type: String,
      required: true,
      unique: true,
      maxlength: 15,
    },

    phone_number: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
    },

    dob: {
      type: Date,
      default: null,
    },

    vehical: {
      type: String,
      enum: ["bike", "cycle"],
      default: "bike",
    },

    status: {
      type: String,
      enum: ["inactive", "active", "blocked"],
      default: "inactive",
    },

    rating: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 5,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },

    total_deliveries: {
      type: Number,
      default: 0,
    },

    profile_image: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = model("Delivery", deliverySchema);
