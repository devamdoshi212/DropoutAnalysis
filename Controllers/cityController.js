const cityModel = require("../models/CityModel");
const StateModel = require("../models/StateModel");
const DistrictModel = require("../models/DistrictModel");
const TalukaModel = require("../models/TalukaModel");

async function getCities(req, res) {
  try {
    let data = await cityModel.find(req.query);
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
    let data = await cityModel.create(req.body);
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

async function addStates(req, res) {
  try {
    let data = await StateModel.create(req.body);
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

async function getStates(req, res) {
  try {
    let data = await StateModel.find(req.query);
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

async function addDistricts(req, res) {
  try {
    let data = await DistrictModel.create(req.body);
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

async function getDistricts(req, res) {
  try {
    let data = await DistrictModel.find(req.query);
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

async function addTalukas(req, res) {
  try {
    let data = await TalukaModel.create(req.body);
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

async function getTalukas(req, res) {
  try {
    let data = await TalukaModel.find(req.query);
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
  getCities,
  addCities,
  addStates,
  getStates,
  addDistricts,
  getDistricts,
  addTalukas,
  getTalukas,
};
