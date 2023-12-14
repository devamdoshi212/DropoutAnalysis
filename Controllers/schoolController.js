const schoolModel = require("../models/SchoolModel");

async function getSchool(req, res) {
  try {
    let data = await schoolModel.find({});
    res.json({
      data: data,
      rcode: 200,
    });
  } catch (err) {
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
}

async function addSchool(req, res) {
  try {
    let data = new schoolModel(req.body);
    await data.save();
    res.json({
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
}

module.exports = {
  getSchool,
  addSchool,
};
