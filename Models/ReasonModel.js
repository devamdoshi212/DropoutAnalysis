const mongoose = require("mongoose");
const reasonSchema = new mongoose.Schema({
  reason: String,
  category: [String],
  resources: [
    {
      title: String,
      keyword: String,
      standard: Number,
      pdf: [{ name: String, file: String }],
      video: [{ name: String, file: String }],
      pptx: [{ name: String, file: String }],
    },
  ],
});
module.exports = mongoose.model("reasons", reasonSchema);
