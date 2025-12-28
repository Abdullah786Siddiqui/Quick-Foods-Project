const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    // province_id → provinces.id (ON DELETE CASCADE)
    provinceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true,
      index: true
    },

    // city_name
    cityName: {
      type: String,
      required: true,
      trim: true
    },

    // enum status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("City", citySchema);
