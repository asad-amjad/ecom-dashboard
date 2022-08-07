const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router.get("/", controller.all);
router.post("/add", controller.add);
router.get("/:id", controller.details);
router.put("/:id/update", controller.update);
router.delete("/:id/delete", controller.delete);
router.get("/:key/search", controller.search);

module.exports = router;
