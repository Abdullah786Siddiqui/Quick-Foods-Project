const { Schema, model } = require("mongoose");


const deliveryRiderLocationSchema = new Schema(
  {
    delivery_rider_id: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryRider", // Delivery model ka reference
      required: true,
      unique: true,
    },

    city_id: {
      type: Schema.Types.ObjectId,
      ref: "City",
      default: null,
    },

    province_id: {
      type: Schema.Types.ObjectId,
      ref: "Province",
      default: null,
    },

    address: {
      type: String,
      default: null,
      trim: true,
    },

    locality: {
      type: String,
      default: null,
      trim: true,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = model(
  "DeliveryRiderLocation",
  deliveryRiderLocationSchema
);
