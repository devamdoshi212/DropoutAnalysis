const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
    },

    Email: {
      type: String,
      trim: true,
    },

    Password: {
      type: String,
      trim: true,
    },

    ContactNumber: {
      type: String,
      trim: true,
    },

    Role: {
      type: Number, //0 Admin , 1 State level  , 2 District level ,  3 Taluka level , 4 city level ,5 School
    },
    State: { type: mongoose.Schema.Types.ObjectId, ref: "states" },
    District: { type: mongoose.Schema.Types.ObjectId, ref: "districts" },
    Taluka: { type: mongoose.Schema.Types.ObjectId, ref: "talukas" },
    City: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
    School: { type: mongoose.Schema.Types.ObjectId, ref: "schools" },
    IsActive: {
      type: Number,
      default: 1,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
