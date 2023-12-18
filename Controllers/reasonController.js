const ReasonModel = require("./../models/ReasonModel");
async function addReason(req, res) {
  let resources = [];
  req.files.forEach((ele) => {
    resources.push({ name: ele.originalname, file: ele.filename });
  });
  let links = req.body.links;
  let reason = new ReasonModel({ links, resources, reason: req.body.reason });
  await reason.save();
  res.json({ rcode: 200 });
}

async function getReason(req, res) {
  let data = await ReasonModel.find(req.query);
  res.json({ rcode: 200, data: data });
}
module.exports = {
  getReason,
  addReason,
};
