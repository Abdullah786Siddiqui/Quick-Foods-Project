const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,

        },
         is_main: {
    type: Boolean,
    default: false
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

// Restaurant model
restaurantSchema.virtual("locations", {
  ref: "RestaurantLocation",
  localField: "_id",
  foreignField: "restaurant_id"
});

restaurantSchema.set("toObject", { virtuals: true });
restaurantSchema.set("toJSON", { virtuals: true });


// Cascade delete: Remove associated locations when a restaurant is deleted
restaurantSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
  await RestaurantLocation.deleteMany({ restaurant_id: this._id });
  next();
});




module.exports = model("Restaurant", restaurantSchema);
