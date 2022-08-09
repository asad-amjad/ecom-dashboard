const Model = require("../models/category");

//@TODO validations + response status
exports.all = async function (req, res) {
  console.log("call");
  Model.find(req.query, function (err, item) {
    if (err) return next(err);
    res.send(item);
  });
};

exports.add = function (req, res) {
  let body = { ...req.body };
  let item = new Model(body);
  item.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send(200);
  });
};

exports.details = function (req, res) {
  Model.findById(req.params.id, function (err, item) {
    if (err) return next(err);
    res.send(item);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    res.status(500).send({ message: "your _id is invalid" });
    return;
  }
  Model.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((result) => {
      res.status(200).json({ message: "Success", result });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed" });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    res.status(500).send({ message: "your _id is invalid" });
    return;
  }
  Model.findByIdAndDelete(id).then((result) => {
    res
      .status(200)
      .json({ message: "Success", result })
      .catch((error) => {
        res.status(500).json({ message: "Failed" });
      });
  });
};

// exports.search = async function (req, res) {
//   let result = await Model.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//     ],
//   });
//   res.status(200).send(result);
// };
