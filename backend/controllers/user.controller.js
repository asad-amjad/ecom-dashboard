const Model = require("../models/user");

exports.add = function (req, res) {
  const userDetails = req.body;
  const { password } = req.body;
  Model.findOne({ email: userDetails.email }, (err, userMatch) => {
    if (userMatch) {
      return res.status(409).json({
        message: `A user with Email: ${userDetails.email} already registered`,
      });
    }
    const newUser = new Model({
      email: userDetails.email,
      name: userDetails.name,
      password: password,
    });
    newUser.save((err, userDetail) => {
      if (err) return res.json(err);
      return res.status(200).json({ userDetail });
    });
  });
};

exports.login = function (req, res, next) {
  const { email, password } = req.body;
  Model.findOne({
    email: email,
  }).exec((err, userDetail) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (userDetail) {
      res.status(200).send({ userDetail });
    } else {
      return res.status(404).json({ message: "User Not found." });
    }
  });
};
