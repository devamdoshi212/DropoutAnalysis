const mongoose = require("mongoose");
const reasonSchema = new mongoose.Schema({
  reason: String,
  title: String,
  keyword: String,
  standard: Number,
  category: String,
  pdf: [{ name: String, file: String }],
  video: [{ name: String, file: String }],
  pptx: [{ name: String, file: String }],

  // resources: [{ name: String, file: String }],
  // links: [String],
});
module.exports = mongoose.model("reasons", reasonSchema);
