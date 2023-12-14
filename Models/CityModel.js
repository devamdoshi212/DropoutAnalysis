const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    state: { type: mongoose.Schema.Types.ObjectId, ref: "states" },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "districts",
    },
    taluka: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "talukas",
    },
    city: String,
    cityType: String, //0 urban //1 rural
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cities", CitySchema);
