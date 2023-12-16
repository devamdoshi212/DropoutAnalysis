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

//0 inactive , 1 dropout with reason , 2 dropout w/o reason , 3 studying
async function deactivateStudent(req, res) {
  try {
    const status = req.body.status;
    const id = req.body.students;
    const change = { is_active: status };
    let changeQuery = {
      $set: change,
    };
    if (status == 1 || status == 2) {
      changeQuery = {
        $set: change,
        $push: { SchoolID: null },
      };
    }

    //   {
    //     "Gender": "female",
    //     "District": "Anand",
    //     "School_name[0]": 24060101339,
    //     "City_type": "Urban",
    //     "School_medium": "English",
    //     "School_std": 8,
    //     "Family_income": "4-6 Lakh",
    //     "Cast": "ST",
    //     "Disabled": 0
    // }
    if (status == 1) {
      change.Reasons = req.body.reason;
    }
    console.log(change);
    let data = await StudentModel.updateMany({ _id: id }, changeQuery);
    console.log(JSON.stringify(data));
    if (status === 1) {
      let studentarray = await StudentModel.find({ _id: { $in: id } })
        .populate("State")
        .populate("District")
        .populate("Taluka")
        .populate("City")
        .populate({
          path: "SchoolID",
          populate: {
            path: "Medium",
          },
        })
        .lean();

      studentarray.forEach((ele) => {
        fetch("http://127.0.0.1:5000/newData", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Gender: ele.Gender,
            State: ele.State.name,
            District: ele.District.district,
            Taluka: ele.Taluka.taluka,
            City: ele.City.city,
            "School_name[0]": ele.SchoolID[ele.SchoolID.length - 1]._id,
            City_type: ele.City.cityType === 0 ? "Urban" : "Rural",
            School_medium: ele.SchoolID[ele.SchoolID.length - 1].Medium.name,
            School_std: ele.Standard,
            ParentOccupation: ele.ParentOccupation,
            ParentMaritalStatus: ele.ParentMaritalStatus,
            Family_income: ele.FamilyIncome,
            Cast: ele.Caste,
            Disabled: ele.Disablity,
            Reason: ele.Reasons,
          }),
        });
      });
    }

    if (status === 2) {
      let studentarray = await StudentModel.find({ _id: { $in: id } })
        .populate("State")
        .populate("District")
        .populate("Taluka")
        .populate("City")
        .populate({
          path: "SchoolID",
          populate: {
            path: "Medium",
          },
        })
        .lean();

      for (let index = 0; index < studentarray.length; index++) {
        const ele = studentarray[index];
        const result = await fetch("http://127.0.0.1:5000/predictModel", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Gender: ele.Gender,
            State: ele.State.name,
            District: ele.District.district,
            Taluka: ele.Taluka.taluka,
            City: ele.City.city,
            "School_name[0]": ele.SchoolID[ele.SchoolID.length - 1]._id,
            City_type: ele.City.cityType === 0 ? "Urban" : "Rural",
            School_medium: ele.SchoolID[ele.SchoolID.length - 1].Medium.name,
            School_std: ele.Standard,
            ParentOccupation: ele.ParentOccupation,
            ParentMaritalStatus: ele.ParentMaritalStatus,
            Family_income: ele.FamilyIncome,
            Cast: ele.Caste,
            Disabled: ele.Disablity,
          }),
        });
        const response = await result.json();
        console.log(response);
        if (response.message != "NO REASON FOUND") {
          let Student = await StudentModel.findOne({ _id: ele._id });
          Student.Reasons = response.message;
          await Student.save();
        }
      }
    }
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
    let data;
    if (status != 0 && status != 3) {
      data = await StudentModel.find({
        $expr: {
          $eq: [
            lastSchoolId,
            { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
          ],
        },
        is_active: { $in: [1, 2] },
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
    } else {
      data = await StudentModel.find({
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
    }

    res.json({
      results: data.length,
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
  addStudentsFromExcel,
  getSchoolWiseStudents,
};
