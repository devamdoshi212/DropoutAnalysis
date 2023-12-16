const studentModel = require("../models/StudentModel");
const mongoose = require("mongoose");
const stateModel = require("../models/StateModel");
const talukaModel = require("../models/TalukaModel");
const districtModel = require("../models/DistrictModel");
const cityModel = require("../models/CityModel");

//admin
module.exports.FilterStudentinGroup = async (req, res) => {
  try {
    const type = req.params.id;
    // const lastSchoolName = req.query.School_id;
    // const state =
    // const district = req.query.district;
    // const city = req.query.city;
    // const taluka = req.query.taluka;
    // const school = req.query.school;
    // const citytype=req.body.

    const pipeline = [];

    if (req.query.state != "") {
      pipeline.push({
        $match: { State: new mongoose.Types.ObjectId(req.query.state) },
      });
    }

    if (req.query.district != "") {
      pipeline.push({
        $match: { District: new mongoose.Types.ObjectId(req.query.district) },
      });
    }

    if (req.query.city != "") {
      pipeline.push({
        $match: { City: new mongoose.Types.ObjectId(req.query.city) },
      });
    }

    if (req.query.taluka != "") {
      pipeline.push({
        $match: { Taluka: new mongoose.Types.ObjectId(req.query.taluka) },
      });
    }

    if (req.query.school) {
      pipeline.push({
        $match: {
          SchoolID: {
            $expr: {
              $eq: [
                new mongoose.Types.ObjectId(req.query.school),
                { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
              ],
            },
          },
        },
      });
    }
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    const id = `$${type}`;
    pipeline.push({
      $group: {
        _id: id,
        numOfStudent: { $sum: 1 },
      },
    });
    pipeline.push({
      $sort: {
        _id: -1,
      },
    });

    pipeline.push({
      $project: {
        [type]: "$_id", // Rename _id to the 'type' value
        numOfStudent: 1, // Keep the numOfStudent field
        _id: 0, // Exclude the original _id field
      },
    });

    const StudentsData = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      data: {
        StudentsData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//for admin
module.exports.yearWiseData = async (req, res) => {
  try {
    //   const type = req.params.id;
    // // const lastSchoolName = req.query.School_id;
    // const state = req.query.state;
    // const district = req.query.district;
    // const city = req.query.city;
    // const taluka = req.query.taluka;
    const standard = req.query.standard;
    // const citytype=req.body.
    const gender = req.query.gender;
    const pipeline = [];
    // console.log(state);

    if (req.query.state != "") {
      pipeline.push({ $match: { State: state } });
    }

    if (req.query.district != "") {
      pipeline.push({ $match: { District: district } });
    }

    if (req.query.city != "") {
      pipeline.push({ $match: { City: city } });
    }

    if (req.query.taluka != "") {
      pipeline.push({ $match: { Taluka: taluka } });
    }

    if (standard) {
      pipeline.push({ $match: { Standard: standard } });
    }

    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    if (gender == 1) {
      pipeline.push({
        $group: {
          _id: {
            // is_active: "$is_active",
            year: { $year: "$updatedAt" },
            Gender: "$Gender",
          },
          numOfStudent: { $sum: 1 },
        },
      });
    } else {
      pipeline.push({
        $group: {
          _id: {
            is_active: "$is_active",
            year: { $year: "$updatedAt" },
          },
          numOfStudent: { $sum: 1 },
        },
      });
    }

    pipeline.push({
      $sort: {
        "_id.year": 1,
        "_id.is_active": 1,
      },
    });
    if (gender == 1) {
      pipeline.push({
        $project: {
          //   is_active: "$_id.is_active",
          year: "$_id.year",
          gender: "$_id.Gender",
          numOfStudent: 1,
          _id: 0, // Exclude the _id field
        },
      });
    } else {
      pipeline.push({
        $project: {
          is_active: "$_id.is_active",
          year: "$_id.year",
          //   gender: "$_id.Gender",
          numOfStudent: 1,
          _id: 0, // Exclude the _id field
        },
      });
    }

    const StudentsData = await studentModel.aggregate(pipeline);

    const result = {};
    StudentsData.forEach((student) => {
      const { numOfStudent, is_active, year } = student;

      // If the year is not already a property in the result object, create it
      if (!result[year]) {
        result[year] = {
          is_active_1: 0,
          is_active_2: 0,
          // Add more properties for other is_active values if needed
        };
      }

      // Increment the count based on is_active value
      result[year][`is_active_${is_active}`] += numOfStudent;
    });

    const resultArray = Object.keys(result).map((year) => ({
      year,
      ...result[year],
    }));

    res.status(200).json({
      status: "success",
      data: {
        resultArray,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports.FilterStudentinGroupByTwo = async (req, res) => {
  try {
    const type1 = req.query.type1;
    const type2 = req.query.type2;
    // const lastSchoolName = req.query.School_id;
    // const state = req.query.state;
    // const district = req.query.district;
    // const city = req.query.city;
    // const taluka = req.query.taluka;
    // const school = req.query.school;
    // const citytype=req.body.

    const pipeline = [];

    if (req.query.state != "") {
      pipeline.push({
        $match: { State: new mongoose.Types.ObjectId(req.query.state) },
      });
    }

    if (req.query.district != "") {
      pipeline.push({
        $match: { District: new mongoose.Types.ObjectId(req.query.district) },
      });
    }

    if (req.query.city != "") {
      pipeline.push({
        $match: { City: new mongoose.Types.ObjectId(req.query.city) },
      });
    }

    if (req.query.taluka != "") {
      pipeline.push({
        $match: { Taluka: new mongoose.Types.ObjectId(req.query.taluka) },
      });
    }

    if (req.query.school != "") {
      pipeline.push({
        $match: {
          SchoolID: {
            $expr: {
              $eq: [
                new mongoose.Types.ObjectId(req.query.school),
                { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
              ],
            },
          },
        },
      });
    }
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    const id1 = `$${type1}`;
    const id2 = `$${type2}`;
    pipeline.push({
      $group: {
        _id: {
          type1: id1,
          type2: id2,
        },
        numOfStudent: { $sum: 1 },
      },
    });
    pipeline.push({
      $sort: {
        _id: -1,
      },
    });

    pipeline.push({
      $project: {
        [type1]: "$_id.type1", // Rename _id to the 'type' value
        [type2]: "$_id.type2", // Rename _id to the 'type' value
        numOfStudent: 1, // Keep the numOfStudent field
        _id: 0, // Exclude the original _id field
      },
    });

    const StudentsData = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      data: {
        StudentsData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// //admin
// module.exports.FilterStudentinGroup = async (req, res) => {
//   try {
//     //   const type = req.params.id;
//     // const lastSchoolName = req.query.School_id;
//     // const state =
//     // const district = req.query.district;
//     // const city = req.query.city;
//     // const taluka = req.query.taluka;
//     // const school = req.query.school;
//     // const citytype=req.body.

//     const pipeline = [];

//     if (req.query.state != "") {
//       pipeline.push({
//         $match: { State: new mongoose.Types.ObjectId(req.query.state) },
//       });
//     }

//     if (req.query.district != "") {
//       pipeline.push({
//         $match: { District: new mongoose.Types.ObjectId(req.query.district) },
//       });
//     }

//     if (req.query.city != "") {
//       pipeline.push({
//         $match: { City: new mongoose.Types.ObjectId(req.query.city) },
//       });
//     }

//     if (req.query.taluka != "") {
//       pipeline.push({
//         $match: { Taluka: new mongoose.Types.ObjectId(req.query.taluka) },
//       });
//     }

//     if (req.query.school) {
//       pipeline.push({
//         $match: {
//           SchoolID: {
//             $expr: {
//               $eq: [
//                 new mongoose.Types.ObjectId(req.query.school),
//                 { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
//               ],
//             },
//           },
//         },
//       });
//     }
//     pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

//     const id = `$${type}`;
//     pipeline.push({
//       $lookup: {},
//     });
//     pipeline.push({
//       $group: {
//         _id: id,
//         numOfStudent: { $sum: 1 },
//       },
//     });
//     pipeline.push({
//       $sort: {
//         _id: -1,
//       },
//     });

//     pipeline.push({
//       $project: {
//         [type]: "$_id", // Rename _id to the 'type' value
//         numOfStudent: 1, // Keep the numOfStudent field
//         _id: 0, // Exclude the original _id field
//       },
//     });

//     const StudentsData = await studentModel.aggregate(pipeline);

//     res.status(200).json({
//       status: "success",
//       data: {
//         StudentsData,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

module.exports.statewiseDropout = async function (req, res) {
  try {
    let data = await studentModel.aggregate([
      {
        $lookup: {
          from: "states",
          localField: "State",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $group: {
          _id: {
            State: "$state.name",
            is_active: "$is_active",
          },

          numOfStudent: { $sum: 1 },
        },
      },
    ]);

    let stateCounts = {};
    data.forEach((entry) => {
      let stateId = entry._id.State;
      let isActive = entry._id.is_active;

      // If the state is not in the mapping, initialize it
      if (!stateCounts[stateId]) {
        stateCounts[stateId] = {};
      }

      // Update the count for the specific is_active value
      // stateCounts[stateId].push({
      //   is_active: isActive,
      //   count: entry.numOfStudent,
      // });
      stateCounts[stateId][isActive] =
        (stateCounts[stateId][isActive] || 0) + entry.numOfStudent;
    });

    // Convert the mapping object to an array
    let resultArray = Object.entries(stateCounts).map(([state, counts]) => ({
      State: state,
      Counts: counts,
    }));

    res.status(200).json({
      status: "success",
      data: resultArray,
      // datas:data.
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "fail",
      message: err.msg,
    });
  }
};

//admin
module.exports.mediumWise = async (req, res) => {
  try {
    const pipeline = [];

    if (req.query.state != "") {
      pipeline.push({
        $match: { State: new mongoose.Types.ObjectId(req.query.state) },
      });
    }

    if (req.query.district != "") {
      pipeline.push({
        $match: { District: new mongoose.Types.ObjectId(req.query.district) },
      });
    }

    if (req.query.city != "") {
      pipeline.push({
        $match: { City: new mongoose.Types.ObjectId(req.query.city) },
      });
    }

    if (req.query.taluka != "") {
      pipeline.push({
        $match: { Taluka: new mongoose.Types.ObjectId(req.query.taluka) },
      });
    }

    pipeline.push({
      $lookup: {
        from: "states",
        localField: "State",
        foreignField: "_id",
        as: "state",
      },
    });

    pipeline.push({
      $lookup: {
        from: "schools",
        localField: "SchoolID",
        foreignField: "_id",
        as: "School",
      },
    });

    pipeline.push({
      $lookup: {
        from: "schooltypes",
        localField: "School.Medium",
        foreignField: "_id",
        as: "Schooltype",
      },
    });

    pipeline.push({
      $unwind: "$Schooltype",
    });

    pipeline.push({
      $lookup: {
        from: "districts",
        localField: "District",
        foreignField: "_id",
        as: "District",
      },
    });
    pipeline.push({
      $unwind: "$District",
    });

    pipeline.push({
      $lookup: {
        from: "talukas",
        localField: "Taluka",
        foreignField: "_id",
        as: "Taluka",
      },
    });
    pipeline.push({
      $unwind: "$Taluka",
    });

    pipeline.push({
      $lookup: {
        from: "cities",
        localField: "City",
        foreignField: "_id",
        as: "City",
      },
    });

    pipeline.push({
      $unwind: "$City",
    });

    if (req.query.school) {
      pipeline.push({
        $match: {
          SchoolID: {
            $expr: {
              $eq: [
                new mongoose.Types.ObjectId(req.query.school),
                { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
              ],
            },
          },
        },
      });
    }
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    // const id = `$${type}`;
    pipeline.push({
      $group: {
        _id: "$Schooltype.name",
        numOfStudent: { $sum: 1 },
      },
    });
    pipeline.push({
      $sort: {
        _id: -1,
      },
    });

    pipeline.push({
      $project: {
        schoolType: "$_id", // Rename _id to the 'type' value
        numOfStudent: 1, // Keep the numOfStudent field
        _id: 0, // Exclude the original _id field
      },
    });
    pipeline.push({
      $sort: {
        _id: 1,
      },
    });
    const StudentsData = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      data: {
        StudentsData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//admin
module.exports.areaWise = async (req, res) => {
  try {
    const pipeline = [];

    if (req.query.state != "") {
      pipeline.push({
        $match: { State: new mongoose.Types.ObjectId(req.query.state) },
      });
    }

    if (req.query.district != "") {
      pipeline.push({
        $match: { District: new mongoose.Types.ObjectId(req.query.district) },
      });
    }

    if (req.query.city != "") {
      pipeline.push({
        $match: { City: new mongoose.Types.ObjectId(req.query.city) },
      });
    }

    if (req.query.taluka != "") {
      pipeline.push({
        $match: { Taluka: new mongoose.Types.ObjectId(req.query.taluka) },
      });
    }

    pipeline.push({
      $lookup: {
        from: "states",
        localField: "State",
        foreignField: "_id",
        as: "state",
      },
    });

    pipeline.push({
      $unwind: "$state",
    });

    pipeline.push({
      $lookup: {
        from: "schools",
        localField: "SchoolID",
        foreignField: "_id",
        as: "School",
      },
    });

    pipeline.push({
      $unwind: "$School",
    });

    pipeline.push({
      $lookup: {
        from: "schooltypes",
        localField: "School.Medium",
        foreignField: "_id",
        as: "Schooltype",
      },
    });

    pipeline.push({
      $unwind: "$Schooltype",
    });

    pipeline.push({
      $lookup: {
        from: "districts",
        localField: "District",
        foreignField: "_id",
        as: "District",
      },
    });
    pipeline.push({
      $unwind: "$District",
    });

    pipeline.push({
      $lookup: {
        from: "talukas",
        localField: "Taluka",
        foreignField: "_id",
        as: "Taluka",
      },
    });
    pipeline.push({
      $unwind: "$Taluka",
    });

    pipeline.push({
      $lookup: {
        from: "cities",
        localField: "City",
        foreignField: "_id",
        as: "city",
      },
    });

    pipeline.push({
      $unwind: "$city",
    });

    if (req.query.school) {
      pipeline.push({
        $match: {
          SchoolID: {
            $expr: {
              $eq: [
                new mongoose.Types.ObjectId(req.query.school),
                { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
              ],
            },
          },
        },
      });
    }
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    // const id = `$${type}`;
    pipeline.push({
      $group: {
        _id: "$city.cityType",
        numOfStudent: { $sum: 1 },
      },
    });
    pipeline.push({
      $sort: {
        _id: -1,
      },
    });

    pipeline.push({
      $project: {
        areaType: "$_id", // Rename _id to the 'type' value
        numOfStudent: 1, // Keep the numOfStudent field
        _id: 0, // Exclude the original _id field
      },
    });

    pipeline.push({
      $sort: {
        _id: 1,
      },
    });
    const StudentsData = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      data: {
        StudentsData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports.stateWiseCount = async function (req, res) {
  try {
    let district = await districtModel.aggregate([
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "State",
        },
      },
      {
        $unwind: "$State",
      },
      {
        $group: {
          _id: "$State.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          state: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    let taluka = await talukaModel.aggregate([
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "State",
        },
      },
      {
        $unwind: "$State",
      },
      {
        $group: {
          _id: "$State.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          state: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    let cities = await cityModel.aggregate([
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "State",
        },
      },
      {
        $unwind: "$State",
      },
      {
        $group: {
          _id: "$State.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          state: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.json({
      district: district,
      taluka: taluka,
      cities: cities,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
