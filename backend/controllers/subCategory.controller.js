const Model = require("../models/subCategory");
const Category = require("../models/category");
// const subCategory = require("../models/subCategory");

//@TODO validations + response status
exports.all = async function (req, res) {
  Model.find(req.query, function (err, item) {
    if (err) return next(err);
    res.send(item);
  });
};

exports.add = function (req, res) {
  let body = { ...req.body };
  let new_sub_category = new Model(body);

  //Push data in parent Categoy
  Category.findById(body.category_id, function (err, item) {
    let data = { _id: new_sub_category._id, name: body.name };
    Category.findOneAndUpdate(
      { _id: body.category_id },
      {
        $set: {
          sub_categories:
            item.sub_categories.length > 0
              ? [...item.sub_categories, data]
              : [data],
        },
      }
    )
      .then((result) => {
        new_sub_category.save(function (err, new_sub_category) {
          console.log(err, new_sub_category);
          if (err) {
            return next(err);
          }
          // res.send(200);
          res.status(200).json({ message: "Success", result });
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Parent id not found" });
      });
  });

  // Creating new category
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
