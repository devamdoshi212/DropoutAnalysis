const SchoolModel = require("../models/SchoolModel");
const schoolModel = require("../models/SchoolModel");
const SchoolTypeModel = require("./../models/SchoolType");

async function getSchool(req, res) {
  try {
    let data = await schoolModel
      .find({})
      .populate("Medium")
      .populate("State")
      .populate("District")
      .populate("Taluka")
      .populate("City");
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
    const lastSchool = await SchoolModel.findOne()
      .sort({ createdAt: -1 })
      .exec();
    const newSchool_id = lastSchool ? lastSchool.SchoolID + 1 : 100000;

    let data = new schoolModel(req.body);
    data.SchoolID = newSchool_id;
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

async function addSchoolType(req, res) {
  try {
    let data = new SchoolTypeModel(req.body);
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
async function getSchoolType(req, res) {
  try {
    let data = await SchoolTypeModel.find({});

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

module.exports = {
  addSchool,
  getSchool,
  addSchoolType,
  getSchoolType,
};
