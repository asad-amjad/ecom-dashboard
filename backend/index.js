require("./config/db");
const express = require("express");
const cors = require("cors");
// const User = require("./db/User");
const product = require("./routes/product.route"); // Imports routes for the products
const user = require("./routes/user.route"); // Imports routes for the products

const app = express();
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.use(express.json());
app.use(cors());

app.use("/user", user);
app.use("/product", product);

// app.post("/register", async (req, res) => {
//   const user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;
//   Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//     if (err) {
//       res.send({
//         result: "Something went wrong, Please try after sometime",
//       });
//     }
//     res.send({ result, auth: token });
//   });
// });

// app.post("/login", async (req, res) => {
//   if (req.body.email && req.body.password) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//         if (err) {
//           res.send({
//             result: "Something went wrong, Please try after sometime",
//           });
//         }
//         res.send({ user, auth: token });
//       });
//     } else {
//       res.send("User Not found");
//     }
//   } else {
//     res.send("Need both fields to login");
//   }
// });

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "invalid token found" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "token not found" });
  }
}

app.listen(5000);
