const mongoose = require("mongoose");
const reasonSchema = new mongoose.Schema({
  reason: String,
  resources: [{ name: String, file: String }],
  links: [String],
});
module.exports = mongoose.model("reasons", reasonSchema);
