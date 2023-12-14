const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("states", StateSchema);
