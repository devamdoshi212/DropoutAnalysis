const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentController");
const multer = require("multer");
const StudentModel = require("../models/StudentModel");
const { default: mongoose } = require("mongoose");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getStudent", StudentController.getStudents);
router.post("/addStudent", StudentController.addStudents);
router.patch("/deactivateStudent", StudentController.deactivateStudent);
router.patch("/promteStudent", StudentController.promoteStudent);
router.get("/getSchoolWiseStudents", StudentController.getSchoolWiseStudents);
router.get("/getChooseWiseStudents", StudentController.getChooseWiseStudents);
router.get("/update", StudentController.update);
router.get("/updateResult", StudentController.updateResult);
router.get("/getPrediction", async (req, res) => {
  const lastSchoolId = new mongoose.Types.ObjectId(req.query.schoolId);

  try {
    let data = await StudentModel.find({
      $expr: {
        $eq: [
          lastSchoolId,
          { $arrayElemAt: ["$SchoolID", -1] }, // Get the last element of the School_name array
        ],
      },
      is_active: 3,
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
      })
      .lean();
    for (let index = 0; index < data.length; index++) {
      let ele = data[index];
      // console.log(ele._id);

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
      let response = await result.json();
      response.probability = response.probability.sort(
        (a, b) => b.probability - a.probability
      );
      console.log(response);
      if (response.message == "Studying") {
        // Student.Reasons = response.probability[1].reason;

        ele.predictReason = response.probability[1].reason;
        ele.predictPercentage = response.probability[1].probability;
      } else {
        // Student.Reasons = response.probability[0].reason;

        ele.predictReason = response.probability[0].reason;
        ele.predictPercentage = response.probability[0].probability;
      }
    }
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
});
//add student from excel sheet
router.post(
  "/addStudentExcel",
  upload.single("excelfile"),
  StudentController.addStudentsFromExcel
);

module.exports = router;
