const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },

    role: {
      type: String,
      default: "subscriber",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("USER", UserSchema);
