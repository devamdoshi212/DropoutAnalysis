const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    SchoolID: Number,
    Name: String,
    Address: {
      type: String,
    },
    ContactNumber: { type: Number },
    Medium: { type: mongoose.Schema.Types.ObjectId, ref: "schooltypes" }, //English Medium , Gujarati , Hindi , Other....
    Type: Number, //0 - govt , 1-private ,  2 semi govt , 3 International
    State: { type: mongoose.Schema.Types.ObjectId, ref: "states" },
    District: { type: mongoose.Schema.Types.ObjectId, ref: "districts" },
    Taluka: { type: mongoose.Schema.Types.ObjectId, ref: "talukas" },
    City: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schools", SchoolSchema);
