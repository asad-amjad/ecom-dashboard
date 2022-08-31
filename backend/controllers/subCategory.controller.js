const Model = require("../models/subCategory");
const Category = require("../models/category");
const mongoose = require("mongoose");

//@TODO validations + response status
// exports.all = async function (req, res) {
//   Model.find(req.query, function (err, item) {
//     console.log(item);
//     if (err) return next(err);
//     res.send(item);
//   });
// };

exports.all = (req, res) => {
  Model.find({})
    .populate("parent_category") //Get by [ids]
    .exec((err, doc) => {
      if (err) {
        return next(err);
      } else {
        res.send(doc);
      }
    });
};

exports.add = function (req, res) {
  let body = { ...req.body };
  let new_sub_category = new Model(body);

  Category.findOneAndUpdate(
    { _id: body.parent_category },
    {
      $push: {
        sub_categories: mongoose.Types.ObjectId(new_sub_category._id),
      },
    }
  )
    .then((result) => {
      new_sub_category.save(function (err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({ message: "Success" });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Parent id not found" });
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
