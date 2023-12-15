const StudentModel = require("../models/StudentModel");
const xlsx = require("xlsx");
const mongoose = require("mongoose");
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

async function getStudents(req, res) {
  try {
    let data = await StudentModel.find(req.query)
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
    const change = { is_active: status };
    if (status == 1 || status == 2) {
      change.SchoolID = { $push: 0 };
    }
    if (status == 1) {
      change.Reasons = req.body.reason;
    }
    console.log(change);
    let data = await StudentModel.updateMany(
      { _id: id },
      {
        $set: change,
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

async function addStudentsFromExcel(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Process the file using xlsx library
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save data to the database
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const result = await StudentModel.create(element);
      console.log(result);
    }

    // Return a success response
    return res.json({ message: "Student data added successfully", rcode: 200 });
  } catch (err) {
    console.log(err);
    res.json({ err: err.msg, rcode: -9 });
  }
}

async function getSchoolWiseStudents(req, res) {
  try {
    const lastSchoolId = new mongoose.Types.ObjectId(req.query.schoolId);
    const status = req.query.status;
    // console.log(lastSchoolId, status);
    let data = await StudentModel.find({
      $expr: {
        $eq: [
          lastSchoolId,
          { $arrayElemAt: ["$SchoolID", -1] }, // Get the last element of the School_name array
        ],
      },
      is_active: status,
    })
      .populate("State")
      .populate("District")
      .populate("Taluka")
      .populate("City")
      .populate({
        path: "SchoolID",
        populate: {
          path: "Medium",
        },
      });
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
  getStudents,
  addStudents,
  deactivateStudent,
  promoteStudent,
  addStudentsFromExcel,
  getSchoolWiseStudents,
};
