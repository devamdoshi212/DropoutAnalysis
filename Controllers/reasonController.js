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
module.exports = {
  addReason,
};
