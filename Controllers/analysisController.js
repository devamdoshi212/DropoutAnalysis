const studentModel = require("../models/StudentModel");
const mongoose = require("mongoose");
const stateModel = require("../models/StateModel");
const talukaModel = require("../models/TalukaModel");
const districtModel = require("../models/DistrictModel");
const cityModel = require("../models/CityModel");
const schooltypeModel = require("../models/SchoolType");

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
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

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

    // pipeline.push({
    //   $lookup: {},
    // });

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

    pipeline.shift();
    // pipeline.unshift({ $match: { is_active: 3 } });
    const total = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",

      data: { total, StudentsData },
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

    if (standard) {
      pipeline.push({ $match: { Standard: standard } });
    }

    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    if (gender == 1) {
      pipeline.push({
        $group: {
          _id: {
            // is_active: "$is_active",
            year: { $year: "$date" },
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
            year: { $year: "$date" },
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

    // if (req.query.school != "") {
    //   pipeline.push({
    //     $match: {
    //       SchoolID: {
    //         $expr: {
    //           $eq: [
    //             new mongoose.Types.ObjectId(req.query.school),
    //             { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
    //           ],
    //         },
    //       },
    //     },
    //   });
    // }

    if (req.query.standard != "") {
      pipeline.push({
        $match: { Standard: parseInt(req.query.standard) },
      });
    }

    pipeline.push({ $match: { is_active: { $in: [1] } } });

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
      {
        $sort: {
          "_id.State": 1,
        },
      },
    ]);

    let stateCounts = {};
    data.forEach((entry) => {
      let stateId = entry._id.State;
      let isActive = entry._id.is_active;

      // If the state is not in the mapping, initialize it
      if (!stateCounts[stateId]) {
        stateCounts[stateId] = { 0: 0, 1: 0, 2: 0, 3: 0 };
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
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

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

    // pipeline.push({
    //   $lookup: {
    //     from: "states",
    //     localField: "State",
    //     foreignField: "_id",
    //     as: "state",
    //   },
    // });

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

    // pipeline.push({
    //   $lookup: {
    //     from: "districts",
    //     localField: "District",
    //     foreignField: "_id",
    //     as: "District",
    //   },
    // });
    // pipeline.push({
    //   $unwind: "$District",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "talukas",
    //     localField: "Taluka",
    //     foreignField: "_id",
    //     as: "Taluka",
    //   },
    // });
    // pipeline.push({
    //   $unwind: "$Taluka",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "cities",
    //     localField: "City",
    //     foreignField: "_id",
    //     as: "City",
    //   },
    // });

    // pipeline.push({
    //   $unwind: "$City",
    // });

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
    pipeline.unshift();
    const total = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      data: {
        StudentsData,
        total,
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

    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

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

    // pipeline.push({
    //   $lookup: {
    //     from: "states",
    //     localField: "State",
    //     foreignField: "_id",
    //     as: "state",
    //   },
    // });

    // pipeline.push({
    //   $unwind: "$state",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "schools",
    //     localField: "SchoolID",
    //     foreignField: "_id",
    //     as: "School",
    //   },
    // });

    // pipeline.push({
    //   $unwind: "$School",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "schooltypes",
    //     localField: "School.Medium",
    //     foreignField: "_id",
    //     as: "Schooltype",
    //   },
    // });

    // pipeline.push({
    //   $unwind: "$Schooltype",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "districts",
    //     localField: "District",
    //     foreignField: "_id",
    //     as: "District",
    //   },
    // });
    // pipeline.push({
    //   $unwind: "$District",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "talukas",
    //     localField: "Taluka",
    //     foreignField: "_id",
    //     as: "Taluka",
    //   },
    // });
    // pipeline.push({
    //   $unwind: "$Taluka",
    // });

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

    pipeline.shift();
    const total = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      data: {
        total,
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

    const result = {};

    // Iterate through the district data
    district.forEach(({ count, state }) => {
      if (!result[state]) {
        result[state] = {};
      }
      result[state].districtCount = count;
    });

    // Iterate through the taluka data
    taluka.forEach(({ count, state }) => {
      if (!result[state]) {
        result[state] = {};
      }
      result[state].talukaCount = count;
    });

    // Iterate through the cities data
    cities.forEach(({ count, state }) => {
      if (!result[state]) {
        result[state] = {};
      }
      result[state].cityCount = count;
    });

    console.log(result);

    // Convert the result object into an array of objects
    const resultArray = Object.keys(result).map((state) => ({
      state,
      ...result[state],
    }));

    resultArray.sort((a, b) => a.state.localeCompare(b.state));

    // console.log(resultArray);

    res.json({
      // district: district,
      // taluka: taluka,
      // cities: cities,
      resultArray: resultArray,
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

module.exports.countryComparative = async (req, res) => {
  try {
    const type = req.params.id;
    // const lastSchoolName = req.query.School_id;
    // const state =
    // const district = req.query.district;
    // const city = req.query.city;
    // const taluka = req.query.taluka;
    // const school = req.query.school;
    // const citytype=req.body.

    let pipeline = [];

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

    pipeline.push({
      $sort: {
        _id: 1,
      },
    });

    // const id = `$${type}`;
    pipeline.push({
      $group: {
        _id: { $year: "$date" },
        numOfStudent: { $sum: 1 },
      },
    });
    // pipeline.push({
    //   $sort: {
    //     _id: -1,
    //   },
    // });

    // pipeline.push({
    //   $project: {
    //     [type]: "$_id", // Rename _id to the 'type' value
    //     numOfStudent: 1, // Keep the numOfStudent field
    //     _id: 0, // Exclude the original _id field
    //   },
    // });
    const pipe = [
      { $match: { is_active: { $in: [2, 1] } } },
      {
        $group: {
          _id: { $year: "$date" },
          numOfStudent: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    const countrydrop = await studentModel.aggregate(pipe);
    pipe.shift();
    const countrytotal = await studentModel.aggregate(pipe);
    const selecteddrop = await studentModel.aggregate(pipeline);
    console.log(pipeline);

    pipeline = pipeline.slice(0, -3).concat(pipeline.slice(-2));
    console.log(pipeline);

    const selectedtotal = await studentModel.aggregate(pipeline);

    const years = [
      ...new Set([
        ...countrydrop.map((item) => item._id),
        ...countrytotal.map((item) => item._id),
        ...selecteddrop.map((item) => item._id),
        ...selectedtotal.map((item) => item._id),
      ]),
    ];

    // Create an array of objects for each year
    const resultArray = years.map((year) => {
      const countryDrop = countrydrop.find((item) => item._id === year);
      const countryTotal = countrytotal.find((item) => item._id === year);

      const selectedDrop = selecteddrop.find((item) => item._id === year);
      const selectedTotal = selectedtotal.find((item) => item._id === year);

      return {
        year,
        countryDrop: countryDrop ? countryDrop.numOfStudent : 0,
        countryTotal: countryTotal ? countryTotal.numOfStudent : 0,
        selectedDrop: selectedDrop ? selectedDrop.numOfStudent : 0,
        selectedTotal: selectedTotal ? selectedTotal.numOfStudent : 0,
      };
    });

    console.log(resultArray);

    res.status(200).json([
      {
        status: "success",
        resultArray: resultArray,
        // countryDrop: countryDrop,
        // countryTotal: countryTotal,
        // selectedDrop: studentsDrop,
        // selectedTotal: studentsTotal,
        // results2: totalDrop.length,
        // data: {
        //   studentsDrop,
        // },
      },
    ]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
      rcode: -9,
    });
  }
};

module.exports.top5State = async function (req, res) {
  try {
    const pipe = [
      { $match: { is_active: { $in: [2, 1] } } },
      {
        $lookup: {
          from: "states",
          localField: "State",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $unwind: "$state",
      },
      {
        $group: {
          _id: "$state.name",
          numOfStudent: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    2;

    const dropout = await studentModel.aggregate(pipe);
    pipe.shift();
    const total = await studentModel.aggregate(pipe);

    const states = [
      ...new Set([
        ...total.map((item) => item._id),
        ...dropout.map((item) => item._id),
      ]),
    ];

    // Create a mapping for both "total" and "dropout" counts by city
    let stateWiseCounts = states.map((city) => {
      const Total = total.find((item) => item._id === city);
      const Dropout = dropout.find((item) => item._id === city);

      return {
        city,
        total: Total ? Total.numOfStudent : 0,
        dropout: Dropout ? Dropout.numOfStudent : 0,
      };
    });

    stateWiseCounts = states.map((city) => {
      const Total = total.find((item) => item._id === city);
      const Dropout = dropout.find((item) => item._id === city);

      const totalCount = Total ? Total.numOfStudent : 0;
      const dropoutCount = Dropout ? Dropout.numOfStudent : 0;

      const dropoutRate = parseFloat(
        ((dropoutCount / totalCount) * 100 || 0).toFixed(2)
      );

      return {
        city,
        total: totalCount,
        dropout: dropoutCount,
        rate: dropoutRate,
      };
    });

    stateWiseCounts = stateWiseCounts.sort((a, b) => b.rate - a.rate);

    res.status(200).json([
      {
        stateWiseCounts: stateWiseCounts,
        // data: data,
        // total: total,
        // dropout: dropout,
        rcode: 200,
      },
    ]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
      rcode: -9,
    });
  }
};

module.exports.top5District = async function (req, res) {
  try {
    const pipe = [
      { $match: { is_active: { $in: [2, 1] } } },
      {
        $lookup: {
          from: "districts",
          localField: "District",
          foreignField: "_id",
          as: "district",
        },
      },
      {
        $unwind: "$district",
      },
      {
        $group: {
          _id: "$district.district",
          numOfStudent: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];

    const dropout = await studentModel.aggregate(pipe);
    pipe.shift();
    const total = await studentModel.aggregate(pipe);

    const district = [
      ...new Set([
        ...total.map((item) => item._id),
        ...dropout.map((item) => item._id),
      ]),
    ];

    // Create a mapping for both "total" and "dropout" counts by city
    let districtWiseCounts = district.map((city) => {
      const Total = total.find((item) => item._id === city);
      const Dropout = dropout.find((item) => item._id === city);

      return {
        city,
        total: Total ? Total.numOfStudent : 0,
        dropout: Dropout ? Dropout.numOfStudent : 0,
      };
    });

    districtWiseCounts = district.map((city) => {
      const Total = total.find((item) => item._id === city);
      const Dropout = dropout.find((item) => item._id === city);

      const totalCount = Total ? Total.numOfStudent : 0;
      const dropoutCount = Dropout ? Dropout.numOfStudent : 0;

      const dropoutRate = parseFloat(
        ((dropoutCount / totalCount) * 100 || 0).toFixed(2)
      );

      return {
        city,
        total: totalCount,
        dropout: dropoutCount,
        rate: dropoutRate,
      };
    });

    districtWiseCounts = districtWiseCounts.sort((a, b) => b.rate - a.rate);

    res.status(200).json([
      {
        districtWiseCounts: districtWiseCounts,
        // data: data,
        // total: total,
        // dropout: dropout,
        rcode: 200,
      },
    ]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
      rcode: -9,
    });
  }
};

module.exports.top5Taluka = async function (req, res) {
  try {
    const pipe = [
      { $match: { is_active: { $in: [2, 1] } } },
      {
        $lookup: {
          from: "talukas",
          localField: "Taluka",
          foreignField: "_id",
          as: "taluka",
        },
      },
      {
        $unwind: "$taluka",
      },
      {
        $group: {
          _id: "$taluka.taluka",
          numOfStudent: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    2;

    const dropout = await studentModel.aggregate(pipe);
    pipe.shift();
    const total = await studentModel.aggregate(pipe);

    res.status(200).json([
      {
        // stateWiseCounts: stateWiseCounts,
        data: data,
        // total: total,
        // dropout: dropout,
        rcode: 200,
      },
    ]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
      rcode: -9,
    });
  }
};

module.exports.areaAndReasonWise = async (req, res) => {
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

    // pipeline.push({
    //   $lookup: {
    //     from: "states",
    //     localField: "State",
    //     foreignField: "_id",
    //     as: "state",
    //   },
    // });

    // pipeline.push({
    //   $unwind: "$state",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "schools",
    //     localField: "SchoolID",
    //     foreignField: "_id",
    //     as: "School",
    //   },
    // });

    // pipeline.push({
    //   $unwind: "$School",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "schooltypes",
    //     localField: "School.Medium",
    //     foreignField: "_id",
    //     as: "Schooltype",
    //   },
    // });

    // pipeline.push({
    //   $unwind: "$Schooltype",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "districts",
    //     localField: "District",
    //     foreignField: "_id",
    //     as: "District",
    //   },
    // });
    // pipeline.push({
    //   $unwind: "$District",
    // });

    // pipeline.push({
    //   $lookup: {
    //     from: "talukas",
    //     localField: "Taluka",
    //     foreignField: "_id",
    //     as: "Taluka",
    //   },
    // });
    // pipeline.push({
    //   $unwind: "$Taluka",
    // });
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

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

    // const id = `$${type}`;
    pipeline.push({
      $group: {
        _id: {
          areaType: "$city.cityType",
          Reasons: "$Reasons",
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
        areaType: "$_id.areaType", // Rename _id to the 'type' value
        reason: "$_id.Reasons",
        numOfStudent: 1, // Keep the numOfStudent field
        _id: 0, // Exclude the original _id field
      },
    });

    const StudentsData = await studentModel.aggregate(pipeline);

    const reasonWiseCounts = StudentsData.reduce((result, item) => {
      const reason = item.reason || "No Reason";
      const areaType = item.areaType || "Unknown";

      result[reason] = result[reason] || {
        reason,
        areaTypeCounts: { 0: 0, 1: 0 },
      };
      result[reason].areaTypeCounts[areaType]++;
      return result;
    }, {});

    // Convert the grouped data object into an array
    const resultArray = Object.values(reasonWiseCounts);

    res.status(200).json({
      status: "success",
      resultArray: resultArray,
      // data: StudentsData,
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

//admin
module.exports.DistrictWiseData = async (req, res) => {
  try {
    // const lastSchoolName = req.query.School_id;
    // const state =
    // const district = req.query.district;
    // const city = req.query.city;
    // const taluka = req.query.taluka;
    // const school = req.query.school;
    // const citytype=req.body.

    const pipeline = [];
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    if (req.query.state != "") {
      pipeline.push({
        $match: { State: new mongoose.Types.ObjectId(req.query.state) },
      });
    }
    if (req.query.reason != "") {
      pipeline.push({
        $match: { Reasons: req.query.reason },
      });
    }
    if (req.query.caste != "") {
      pipeline.push({
        $match: { Caste: req.query.caste },
      });
    }

    if (req.query.year != "") {
      console.log(req.query.year);

      pipeline.push({
        $match: {
          date: {
            $gte: new Date(req.query.year, 0, 1), // Start of the year
            $lt: new Date(req.query.year, 12, 1), // Start of the next year
          },
        },
      });
    }

    if (req.query.gender != "") {
      pipeline.push({
        $match: { Gender: req.query.gender },
      });
    }

    if (req.query.standard != "") {
      pipeline.push({
        $match: { Standard: parseInt(req.query.standard) },
      });
    }

    pipeline.push({
      $lookup: {
        from: "districts",
        localField: "District",
        foreignField: "_id",
        as: "district",
      },
    });
    pipeline.push({
      $unwind: "$district",
    });

    // const id = `$${type}`;
    pipeline.push({
      $group: {
        _id: "$district.district",
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
        district: "$_id", // Rename _id to the 'type' value
        numOfStudent: 1, // Keep the numOfStudent field
        _id: 0, // Exclude the original _id field
      },
    });

    const StudentsData = await studentModel.aggregate(pipeline);

    pipeline.shift();
    // pipeline.unshift({ $match: { is_active: 3 } });
    const total = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",

      data: { total, StudentsData },
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
module.exports.groupBySchool = async (req, res) => {
  try {
    // const type = req.params.id;
    // const lastSchoolName = req.query.School_id;
    // const state =
    // const district = req.query.district;
    // const city = req.query.city;
    // const taluka = req.query.taluka;
    // const school = req.query.school;
    // const citytype=req.body.

    const pipeline = [];
    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

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
        from: "schools",
        localField: "SchoolID",
        foreignField: "_id",
        as: "Schools",
      },
    });
    pipeline.push({
      $lookup: {
        from: "schooltypes",
        localField: "Schools.Medium",
        foreignField: "_id",
        as: "Medium",
      },
    });
    pipeline.push({
      $lookup: {
        from: "states",
        localField: "Schools.State",
        foreignField: "_id",
        as: "State",
      },
    });
    pipeline.push({
      $lookup: {
        from: "talukas",
        localField: "Schools.Taluka",
        foreignField: "_id",
        as: "Taluka",
      },
    });
    pipeline.push({
      $lookup: {
        from: "districts",
        localField: "Schools.District",
        foreignField: "_id",
        as: "District",
      },
    });
    pipeline.push({
      $lookup: {
        from: "cities",
        localField: "Schools.City",
        foreignField: "_id",
        as: "City",
      },
    });

    // if (req.query.school) {
    //   pipeline.push({
    //     $match: {
    //       SchoolID: {
    //         $expr: {
    //           $eq: [
    //             new mongoose.Types.ObjectId(req.query.school),
    //             { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
    //           ],
    //         },
    //       },
    //     },
    //   });
    // }

    // const id = `$${type}`;

    pipeline.push({
      $addFields: {
        secondLastSchool: { $arrayElemAt: ["$Schools", -1] },
      },
    });

    pipeline.push({
      $group: {
        _id: "$secondLastSchool",
        // students: { $push: "$$ROOT" },
        students: { $sum: 1 },
      },
    });
    pipeline.push({
      $sort: {
        _id: -1,
      },
    });

    pipeline.push({
      $project: {
        school: "$_id", // Rename _id to the 'type' value
        students: 1, // Keep the numOfStudent field
        _id: 0, // Exclude the original _id field
      },
    });

    const data = await studentModel.aggregate(pipeline);
    // console.log("Test $addFields:", data);
    // console.log(data);
    // data = data[0].school();
    for (let i = 0; i < data.length; i++) {
      const ele = data[i];
      let district = ele.school.District;
      let taluka = ele.school.Taluka;
      let city = ele.school.City;
      let medium = ele.school.Medium;
      let state = ele.school.State;
      const st = await stateModel.findOne({ _id: state });
      ele.school.State = st.name;
      const dist = await districtModel.findOne({ _id: district });
      ele.school.District = dist.district;
      const talu = await talukaModel.findOne({ _id: taluka });
      ele.school.Taluka = talu.taluka;
      const cit = await cityModel.findOne({ _id: city });
      ele.school.City = cit.city;
      const med = await schooltypeModel.findOne({ _id: medium });
      ele.school.Medium = med.name;

      console.log(st);
    }

    // pipeline.shift();
    // // pipeline.unshift({ $match: { is_active: 3 } });
    // const total = await studentModel.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      r: data.length,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports.reasonYearTrend = async function (req, res) {
  try {
    let pipeline = [];
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

    pipeline.push({ $match: { is_active: { $in: [1] } } });

    pipeline.push({
      $group: {
        _id: {
          // is_active: "$is_active",
          year: { $year: "$date" },
          reason: "$Reasons",
        },
        numOfStudent: { $sum: 1 },
      },
    });

    pipeline.push({
      $project: {
        _id: 0,
        numOfStudent: 1,
        year: "$_id.year",
        reason: "$_id.reason",
      },
    });

    let data = await studentModel.aggregate(pipeline);

    // const result = {};

    // data.forEach((item) => {
    //   const { year, numOfStudent, reason } = item;

    //   if (!result[year]) {
    //     result[year] = [];
    //   }

    //   result[year].push({
    //     reason,
    //     numOfStudent,
    //   });
    // });

    // const resultArray = Object.entries(result).map(([year, reasons]) => ({
    //   year: parseInt(year),
    //   count: reasons,
    // }));

    // const result = {};

    // data.forEach((item) => {
    //   const { year, numOfStudent, reason } = item;

    //   if (!result[reason]) {
    //     result[reason] = [];
    //   }

    //   result[reason].push({
    //     year,
    //     numOfStudent,
    //   });
    // });

    // const resultArray = Object.entries(result).map(([reason, years]) => ({
    //   reason,
    //   years,
    // }));

    // console.log(JSON.stringify(resultArray, null, 2));

    // console.log();
    // console.log(resultArray);

    res.json({
      data: data,
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

module.exports.ReasonAndAreaWise = async (req, res) => {
  try {
    // const type1 = req.query.type1;
    // const type2 = req.query.type2;

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

    if (req.query.standard != "") {
      pipeline.push({
        $match: { Standard: parseInt(req.query.standard) },
      });
    }

    // if (req.query.school != "") {
    //   pipeline.push({
    //     $match: {
    //       SchoolID: {
    //         $expr: {
    //           $eq: [
    //             new mongoose.Types.ObjectId(req.query.school),
    //             { $arrayElemAt: ["$SchoolID", -2] }, // Get the last element of the School_name array
    //           ],
    //         },
    //       },
    //     },
    //   });
    // }
    pipeline.push({ $match: { is_active: { $in: [5] } } });

    // const id1 = `$${type1}`;
    // const id2 = `$${type2}`;

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
    pipeline.push({
      $group: {
        _id: {
          reason: "$Reasons",
          cityType: "$city.cityType",
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
        reason: "$_id.reason", // Rename _id to the 'type' value
        citytype: "$_id.cityType", // Rename _id to the 'type' value
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
