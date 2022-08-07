require("./db/config");
const express = require("express");
const cors = require("cors");
const User = require("./db/User");
const product = require("./routes/product.route"); // Imports routes for the products

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/product", product);

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({
        result: "Something went wrong, Please try after sometime",
      });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "Something went wrong, Please try after sometime",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send("User Not found");
    }
  } else {
    res.send("Need both fields to login");
  }
});

// app.post("/add_product", verifyToken, async (req, res) => {
//   let product = new Product(req.body);
//   let result = await product.save();
//   res.send(result);
// });

// app.get("/products", verifyToken, async (req, res) => {
//   const products = await Product.find();

//   if (products.length > 0) {
//     res.send(products);
//   } else {
//     res.send({ result: "Mo products fount" });
//   }
// });

// app.delete("/product/:id", verifyToken, async (req, res) => {
//   const result = await Product.deleteOne({ _id: req.params.id });
//   res.send(result);
// });

// app.get("/product/:id", verifyToken, async (req, res) => {
//   const result = await Product.findOne({ _id: req.params.id });
//   if (result) {
//     res.send(result);
//   } else {
//     res.send({ result: "No record found" });
//   }
// });

// app.put("/update/:id", verifyToken, async (req, res) => {
//   const result = await Product.updateOne(
//     { _id: req.params.id },
//     { $set: req.body }
//   );
//   res.send(result);
// });

// app.get("/search/:key", verifyToken, async (req, res) => {
//   const result = await Product.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//     ],
//   });
//   res.send(result);
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
