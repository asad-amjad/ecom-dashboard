const express = require("express");
const router = express.Router();
const controller = require("../controllers/subCategory.controller");

router.get("/", controller.all);
router.post("/add", controller.add);
router.get("/:id", controller.details);
router.delete("/:id/delete", controller.delete);
router.put("/:id/update", controller.update);

module.exports = router;
