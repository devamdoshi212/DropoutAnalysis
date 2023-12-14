const StudentModel = require("../models/StudentModel");

async function getStudents(req, res) {
  try {
    let data = await StudentModel.find({});
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

async function addStudents(req, res) {
  try {
    console.log(req.body);
    
    let data = await StudentModel.create(req.body);
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
  getStudents,
  addStudents,
};
