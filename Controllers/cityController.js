const cityModel = require("../models/CityModel");

async function getCities(req, res) {
  try {
    let data = await cityModel.find({});
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

async function addCities(req, res) {
  try {
    let data = await cityModel.create(body);
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
  getCities,
  addCities,
};
