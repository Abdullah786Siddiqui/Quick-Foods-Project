const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,

        },

        image: {
            type: String,
            default: null,
        },

        rating: {
            type: Number,
            default: null,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // createdAt & updatedAt (same as $table->timestamps())
    }
);

module.exports = model("Restaurant", restaurantSchema);
