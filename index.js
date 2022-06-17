const express = require("express");

const app = express(); //do executable

app.get("/", (req, res) => {
  res.send("app is working..");
});

app.listen(5000)