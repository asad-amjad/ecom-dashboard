const Model = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const config = require("../config/auth.config");

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
      password: bcrypt.hashSync(password, salt),
    });
    newUser.save((err, userDetails) => {
      if (err) return res.json(err);
      return res.status(200).send({
        accessToken: jwt.sign({ userDetails }, config.JWT_SECRET, {
          expiresIn: config.JWT_EXPIRES_IN, // 24 hours
        }),
        userDetails: userDetails,
      });
    });
  });
};

exports.login = function (req, res, next) {
  const { email, password } = req.body;
  Model.findOne({
    email: email,
  }).exec((err, userDetails) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (!userDetails) {
      return res.status(404).json({ message: "User Not found." });
    }

    // check password;
    if (!bcrypt.compareSync(password, userDetails.password)) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    res.status(200).send({
      accessToken: jwt.sign({ userDetails }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN, // 24 hours
      }),
      userDetails: userDetails,
    });
  });
};
