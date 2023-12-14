const mongoose = require("mongoose");

const TalukaSchema = new mongoose.Schema(
  {
    state: { type: mongoose.SchemaTypes.ObjectId, ref: "states" },
    district: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "districts",
    },
    taluka: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("talukas", TalukaSchema);
