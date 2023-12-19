const schoolModel = require("../models/SchoolModel");
const stateModel = require("../models/StateModel");
const districtModel = require("../models/DistrictModel");
const talukaModel = require("../models/TalukaModel");
const cityModel = require("../models/CityModel");
const studentModel = require("../models/StudentModel");
const { default: mongoose } = require("mongoose");

async function dashboardCount(req, res) {
  try {
    const filter = { state: new mongoose.Types.ObjectId(req.query.state) };
    const schools = await schoolModel.find({
      State: new mongoose.Types.ObjectId(req.query.state),
    });
    const states = await stateModel.countDocuments();
    const districts = await districtModel.countDocuments(filter);
    const taluka = await talukaModel.countDocuments(filter);
    const city = await cityModel.countDocuments(filter);
    const students = await studentModel.find({
      State: new mongoose.Types.ObjectId(req.query.state),
    });
    const malestudents = students.filter((ele) => {
      return ele.Gender == "male";
    });
    const otherstudents = students.filter((ele) => {
      return ele.Gender == "other";
    });
    const femalestudents = students.filter((ele) => {
      return ele.Gender == "female";
    });
    const inactivestudents = students.filter((ele) => {
      return ele.is_active == 0;
    });
    const dropwithreason = students.filter((ele) => {
      return ele.is_active == 1;
    });
    const dropwithoutreason = students.filter((ele) => {
      return ele.is_active == 2;
    });
    const activestudents = students.filter((ele) => {
      return ele.is_active == 3;
    });
    const govtschools = schools.filter((ele) => {
      return ele.Type == 0;
    });
    const semigovtschools = schools.filter((ele) => {
      return ele.Type == 2;
    });
    const privateschools = schools.filter((ele) => {
      return ele.Type == 1;
    });
    const internationalschools = schools.filter((ele) => {
      return ele.Type == 3;
    });

    res.json({
      schools: schools.length,
      states: states,
      districts: districts,
      taluka: taluka,
      city: city,
      students: students.length,
      malestudents: malestudents.length,

      otherstudents: otherstudents.length,
      femalestudents: femalestudents.length,
      inactivestudents: inactivestudents.length,
      dropwithreason: dropwithreason.length,
      dropwithoutreason: dropwithoutreason.length,
      activestudents: activestudents.length,
      govtschools: govtschools,
      semigovtschools: semigovtschools,
      privateschools: privateschools,
      internationalschools: internationalschools,

      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      data: err,
      rcode: -9,
    });
  }
}

module.exports = {
  dashboardCount,
};
