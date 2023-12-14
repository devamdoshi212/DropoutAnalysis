const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    SchoolID: Number,
    Name: String,
    Address: {
      type: String,
    },
    ContactNumber: { type: Number },
    Medium: { type: mongoose.SchemaTypes.ObjectId, ref: "schooltypes" }, //English Medium , Gujarati , Hindi , Other....
    Type: Number, //0 - govt , 1-private ,  2 semi govt
    State: { type: mongoose.SchemaTypes.ObjectId, ref: "states" },
    District: { type: mongoose.SchemaTypes.ObjectId, ref: "districts" },
    Taluka: { type: mongoose.SchemaTypes.ObjectId, ref: "talukas" },
    City: { type: mongoose.SchemaTypes.ObjectId, ref: "cities" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schools", SchoolSchema);
