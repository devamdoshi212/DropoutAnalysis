const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    state: { type: mongoose.SchemaTypes.ObjectId, ref: "states" },
    district: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "districts",
    },
    taluka: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "talukas",
    },
    city: String,
    cityType: Number, //0 urban //1 rural
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cities", CitySchema);
