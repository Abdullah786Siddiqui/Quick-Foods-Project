const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const DeliveryRiderLocation = require('../Models/deliveryRider_location_model')

const deliveryRiderSchema = new Schema(
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

// Delivery Rider  model
deliveryRiderSchema.virtual("location", {
  ref: "DeliveryRiderLocation",
  localField: "_id",
  foreignField: "delivery_rider_id",
  justOne: true, // 🔥 important
});


deliveryRiderSchema.set("toObject", { virtuals: true });
deliveryRiderSchema.set("toJSON", { virtuals: true });

deliveryRiderSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await mongoose.model("DeliveryRiderLocation").deleteOne({
      delivery_rider_id: this._id,
    });
    next();
  }
);


module.exports = model("DeliveryRider", deliveryRiderSchema);
