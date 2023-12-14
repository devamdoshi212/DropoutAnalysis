const studentModel = require("../Models/StudentModel");

async function getstudent(req, res) {
  let data = await studentModel.find({});
  return data;
}

async function addstudent(req, res) {
  let data = new studentModel(req.body);
  await data.save();
  return data;
}

module.exports = {
  getstudent,
  addstudent,
};
