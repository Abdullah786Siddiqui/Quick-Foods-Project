const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
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

    profile_image: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // same as $table->timestamps()
  }
);

module.exports = model("Admin", adminSchema);
