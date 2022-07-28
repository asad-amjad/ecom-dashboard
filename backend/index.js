require("./db/config");
const express = require("express");
const User = require("./db/User");

const app = express();
app.use(express.json());
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = user.save();
  res.send(result);
});

app.listen(5000);
