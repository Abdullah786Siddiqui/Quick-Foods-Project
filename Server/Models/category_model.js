const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true
    },

    category_image: {
      type: String,
      default: null
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true // createdAt & updatedAt automatically
  }
);

module.exports = model("Category", categorySchema);
