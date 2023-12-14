const mongoose = require("mongoose");

const TalukaSchema = new mongoose.Schema(
  {
    state: { type: mongoose.Schema.Types.ObjectId, ref: "states" },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "districts",
    },
    taluka: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("talukas", TalukaSchema);
