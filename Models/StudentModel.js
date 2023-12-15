const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    UID: String,
    Name: String,
    DOB: Date,
    Gender: String,
    AadharNumber: Number,
    ParentOccupation: String,
    ParentMaritalStatus: Number, //0 - w/o parent , 1- with papa , 2- with mummy , 3- both
    ContactNumber: { type: Number },
    Address: {
      type: String,
    },
    Caste: String,
    Disablity: Number,
    FamilyIncome: String,
    Standard: Number,
    SchoolID: [{ type: mongoose.Schema.Types.ObjectId, ref: "schools" }],
    State: { type: mongoose.Schema.Types.ObjectId, ref: "states" },
    District: { type: mongoose.Schema.Types.ObjectId, ref: "districts" },
    Taluka: { type: mongoose.Schema.Types.ObjectId, ref: "talukas" },
    City: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },

    is_active: { type: Number, default: 3 }, //0 - inactive  , 1- Dropout with reason , 2 - dropout without reason , 3 - study
    Reasons: String, // hardcoded
  },
  { timestamps: true }
);

module.exports = mongoose.model("students", StudentSchema);
