const Model = require("../models/product");
const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

exports.all = (req, res) => {
  Model.find({})
    .populate("category") //Get by [ids]
    .exec((err, doc) => {
      if (err) {
        return next(err);
      } else {
        res.send(doc);
      }
    });
};

exports.add = function (req, res) {
  upload.single("file")(req, res, () => {
    const body = { ...req.body };
    // body.name = slugify(req.body.name, { lower: true });
    const item =
      // req.file === undefined
      //   ? new Model({ ...body })
      //   :
      new Model({
        ...body,
        imageName: req.file.filename,
        pictures: req.file.path,
      });
    item.save(function (err2) {
      if (err2) {
        return next(err2);
      }
      res.send(200);
    });
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

exports.search = async function (req, res) {
  let result = await Model.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.status(200).send(result);
};
