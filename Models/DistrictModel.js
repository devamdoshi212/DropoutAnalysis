const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    state: { type: mongoose.Schema.Types.ObjectId, ref: "states" },
    district: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("districts", DistrictSchema);
