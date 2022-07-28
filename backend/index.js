require("./db/config");
const express = require("express");
const User = require("./db/User");

const app = express();
app.use(express.json());
app.post("/register", (req, res) => {
  res.send(req.body);
});

app.listen(5000);
