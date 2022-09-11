const express = require("express");
const router = express.Router();
const controller = require("../controllers/subCategory.controller");
const middlewares = require("../middlewares/authJWT");

router.get("/", [middlewares.authenticateToken], controller.all);
router.post("/add", [middlewares.authenticateToken], controller.add);
router.get("/:id", [middlewares.authenticateToken], controller.details);
router.delete(
  "/:id/delete",
  [middlewares.authenticateToken],
  controller.delete
);
router.put("/:id/update", [middlewares.authenticateToken], controller.update);

module.exports = router;
