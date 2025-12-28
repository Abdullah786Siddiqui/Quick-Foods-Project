const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userLocationSchema = new Schema(
  {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        address: { type: String, required: true },
        cityId: { type: Schema.Types.ObjectId, ref: "City", default: null },
        country: { type: String, default: "Pakistan" },
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
        isPrimary: { type: Boolean, default: true }
  },
  { timestamps: true }
);


module.exports = model("UserLocation", userLocationSchema);
