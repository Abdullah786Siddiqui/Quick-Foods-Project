const { Schema, model } = require("mongoose");

const restaurantTimingSchema = new Schema({
  restaurant_location_id: {
    type: Schema.Types.ObjectId,
    ref: "RestaurantLocation",
    required: true
  },
  week_day: {
    type: String, // Monday, Tuesday, etc.
    required: true
  },
  opening_time: {
    type: String, // Store time as "HH:MM:SS"
    required: true
  },
  closing_time: {
    type: String, // Store time as "HH:MM:SS"
    required: true
  }
}, { timestamps: true });


module.exports =  model("RestaurantTiming", restaurantTimingSchema);
