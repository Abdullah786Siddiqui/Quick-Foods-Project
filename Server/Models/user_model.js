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

    // ⚡ Cascade delete: user delete → user locations delete
    userSchema.pre("findOneAndDelete", async function(next) {
    try {
        const filter = this.getQuery();
        const userId = filter._id;
        if (userId) {
        const UserLocation = mongoose.model("UserLocation");
        await UserLocation.deleteMany({ userId });
        }
        next();
    } catch (err) {
        next(err);
    }
    });

    module.exports = model("User", userSchema);
