const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const middlewares = require("../middlewares/authJWT");

router.get("/", [], controller.all);
router.post("/add", [], controller.add);
router.get("/:id", [middlewares.authenticateToken], controller.details);
router.put("/:id/update", [middlewares.authenticateToken], controller.update);
router.delete(
  "/:id/delete",
  [middlewares.authenticateToken],
  controller.delete
);
router.get("/:key/search", [middlewares.authenticateToken], controller.search);

module.exports = router;
