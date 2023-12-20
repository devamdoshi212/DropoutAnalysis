const ReasonModel = require("./../models/ReasonModel");
const mongoose = require("mongoose");
async function addReason(req, res) {
  // let pdf = [];
  // req.files.forEach((ele) => {
  //   pdf.push({ name: ele.originalname, file: ele.filename });
  // });
  // let links = req.body.links;
  let reason = new ReasonModel(req.body);
  await reason.save();
  res.json({ rcode: 200 });
}

async function getReason(req, res) {
  let data = await ReasonModel.find(req.query);
  res.json({ rcode: 200, data: data });
}

async function addResource(req, res) {
  try {
    // let pdf = [];
    // req.files["pdf"].map((ele) => {
    //   pdf.push({ name: ele.originalname, file: ele.filename });
    // });
    // let video = [];
    // req.files["video"].map((ele) => {
    //   video.push({ name: ele.originalname, file: ele.filename });
    // });
    // let pptx = [];
    // req.files["pptx"].map((ele) => {
    //   pptx.push({ name: ele.originalname, file: ele.filename });
    // });
    let pdf = req.files["pdf"]
      ? req.files["pdf"].map((ele) => ({
          name: ele.originalname,
          file: ele.filename,
        }))
      : [];
    let video = req.files["video"]
      ? req.files["video"].map((ele) => ({
          name: ele.originalname,
          file: ele.filename,
        }))
      : [];
    let pptx = req.files["pptx"]
      ? req.files["pptx"].map((ele) => ({
          name: ele.originalname,
          file: ele.filename,
        }))
      : [];
    // let links = req.body.links;
    let data = await ReasonModel.findOne({
      _id: new mongoose.Types.ObjectId(req.query.id),
    });

    data.resources.push({
      pdf: pdf,
      pptx: pptx,
      video: video,
      standard: req.body.standard,
      keyword: req.body.keyword,
      links: req.body.links,
    });

    await data.save();

    res.json({
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      rcode: -9,
      err: err.msg,
    });
  }
}

async function customeSearch(req, res) {
  try {
    // Using the find method with $regex to perform a case-insensitive search
    const q = req.query.q;
    const result = await ReasonModel.find({
      "resources.keyword": { $regex: new RegExp(q, "i") },
    });

    // return result;
    res.json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    // throw err;
  }
}

module.exports = {
  getReason,
  addReason,
  addResource,
  customeSearch,
};
