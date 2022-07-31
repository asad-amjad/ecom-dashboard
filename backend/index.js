require("./db/config");
const express = require("express");
const cors = require("cors");
const User = require("./db/User");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log();
  let user = await User.findOne(req.body).select("-password");
  if (req.body.email && req.body.password) {
    if (user) {
      res.send(user);
    } else {
      res.send("User Not found");
    }
  } else {
    res.send("Need both fields to login");
  }
});

app.listen(5000);
