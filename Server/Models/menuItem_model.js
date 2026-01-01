const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    item_name: {
      type: String,
      required: true,
      trim: true
    },

    image_url: {
      type: String,
      default: null
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    rating: {
      type: Number,
      default: null,
      min: 0,
      max: 5
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
);

module.exports = model("MenuItem", menuItemSchema);
