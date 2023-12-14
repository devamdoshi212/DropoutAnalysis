const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    state: { type: mongoose.SchemaTypes.ObjectId, ref: "states" },
    district: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("districts", DistrictSchema);
