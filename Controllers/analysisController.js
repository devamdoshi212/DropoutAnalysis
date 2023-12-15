const studentModel = require("../models/StudentModel");

//admin
module.exports.FilterStudentinGroup = async (req, res) => {
  try {
    const type = req.params.id;
    // const lastSchoolName = req.query.School_id;
    const state = req.query.state;
    const district = req.query.district;
    const city = req.query.city;
    const taluka = req.query.taluka;
    const school = req.query.school;
    // const citytype=req.body.

    const pipeline = [];

    if (state) {
      pipeline.push({ $match: { State: state } });
    }

    if (district) {
      pipeline.push({ $match: { District: district } });
    }

    if (city) {
      pipeline.push({ $match: { City: city } });
    }

    if (taluka) {
      pipeline.push({ $match: { Taluka: taluka } });
    }

    if (school) {
      pipeline.push({
        $match: {
          SchoolID: {
            $expr: {
              $eq: [
                lastSchoolId,
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
    // const lastSchoolName = req.query.School_id;
    const state = req.query.state;
    const district = req.query.district;
    const city = req.query.city;
    const taluka = req.query.taluka;
    // const citytype=req.body.

    const pipeline = [];

    if (state) {
      pipeline.push({ $match: { State: state } });
    }

    if (district) {
      pipeline.push({ $match: { District: district } });
    }

    if (city) {
      pipeline.push({ $match: { City: city } });
    }

    if (taluka) {
      pipeline.push({ $match: { Taluka: taluka } });
    }

    pipeline.push({ $match: { is_active: { $in: [2, 1] } } });

    pipeline.push({
      $group: {
        _id: {
          is_active: "$is_active",
          year: { $year: "$updatedAt" },
        },
        numOfStudent: { $sum: 1 },
      },
    });

    pipeline.push({
      $sort: {
        "_id.year": 1,
        "_id.is_active": 1,
      },
    });
    pipeline.push({
      $project: {
        is_active: "$_id.is_active",
        year: "$_id.year",
        numOfStudent: 1,
        _id: 0, // Exclude the _id field
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


module.exports.FilterStudentinGroup = async (req, res) => {
    try {
      const type = req.params.id;
      // const lastSchoolName = req.query.School_id;
      const state = req.query.state;
      const district = req.query.district;
      const city = req.query.city;
      const taluka = req.query.taluka;
      const school = req.query.school;
      // const citytype=req.body.
  
      const pipeline = [];
  
      if (state) {
        pipeline.push({ $match: { State: state } });
      }
  
      if (district) {
        pipeline.push({ $match: { District: district } });
      }
  
      if (city) {
        pipeline.push({ $match: { City: city } });
      }
  
      if (taluka) {
        pipeline.push({ $match: { Taluka: taluka } });
      }
  
      if (school) {
        pipeline.push({
          $match: {
            SchoolID: {
              $expr: {
                $eq: [
                  lastSchoolId,
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
  