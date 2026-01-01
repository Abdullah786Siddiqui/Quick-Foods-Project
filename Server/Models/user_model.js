const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive", "blocked"], default: "active" },
  gender: { type: String, enum: ["male", "female", "other"], default: null },
  phone: { type: String, default: null },
  avatar: { type: String, default: null }
}, { timestamps: true });

userSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    const UserLocation = mongoose.model("UserLocation");
    await UserLocation.deleteMany({ userId: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = model("User", userSchema);
