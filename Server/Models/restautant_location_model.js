const { Schema, model } = require("mongoose");
const RestaurantTiming = require("../Models/restaurant_timing_model");

const restaurantLocationSchema = new Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  city_id: {
    type: Schema.Types.ObjectId,
    ref: "City",
    default: null
  },
  province_id: {
    type: Schema.Types.ObjectId,
    ref: "Province",
    default: null
  },
  address: {
    type: String,
    default: null
  },
  locality: {
    type: String,
    default: null
  },
  branch_email: {
    type: String,
    unique: true,
    required: true
  },
  branch_phone_number: {
    type: String,
    maxlength: 20,
    default: null
  },
 
  latitude: {
    type: Number,
    default: null
  },
  longitude: {
    type: Number,
    default: null
  }
}, { timestamps: true });



// RestaurantLocation model
restaurantLocationSchema.virtual("timings", {
  ref: "RestaurantTiming",
  localField: "_id",
  foreignField: "restaurant_location_id"
});

restaurantLocationSchema.set("toObject", { virtuals: true });
restaurantLocationSchema.set("toJSON", { virtuals: true });
restaurantLocationSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
  await RestaurantTiming.deleteMany({ restaurant_location_id: this._id });
  next();
});



module.exports = model("RestaurantLocation", restaurantLocationSchema);;
