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

async function deactivateStudent(req, res) {
  try {
    const status = req.body.status;
    const id = req.body.students;
    let data = await StudentModel.updateMany(
      { _id: id },
      {
        $set: { is_active: status },
      }
    );
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
async function promoteStudent(req, res) {
  try {
    // const status = req.body.status;
    const id = req.body.students;
    let data = await StudentModel.updateMany(
      { _id: id },
      {
        $inc: { Standard: 1 },
      }
    );
    console.log(data);
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
  deactivateStudent,
  promoteStudent,
};
