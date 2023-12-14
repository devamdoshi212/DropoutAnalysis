const cityModel = require("../Models/CityModel");

async function getCities(req, res) {
  let data = await cityModel.find({});
  return data;
}

async function addCities(req, res) {
  let data = await cityModel.create(req.body);
  return data;
}

module.exports = {
  getCities,
  addCities,
};
