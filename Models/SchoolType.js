const mongoose = require("mongoose");

const SchoolTypeSchema = new mongoose.Schema(
  {
    name: String, //English//Medium/Hindi/
  },
  { timestamps: true }
);

module.exports = mongoose.model("schooltypes", SchoolTypeSchema);
