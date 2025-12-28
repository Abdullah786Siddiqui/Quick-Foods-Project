const mongoose = require("mongoose"); 
const { Schema, model } = require("mongoose");

const provinceSchema = new Schema(
  {
    provinceName: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

// ⚡ Pre hook: province delete → cities delete (ON DELETE CASCADE)
provinceSchema.pre("findOneAndDelete", async function(next) {
  const provinceId = this.getQuery()._id;
  await mongoose.model("City").deleteMany({ provinceId });
  next();
});

module.exports = mongoose.model("Province", provinceSchema);
