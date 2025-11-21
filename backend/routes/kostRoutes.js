const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/kostController");

router.get("/", ctrl.getKost);
router.get("/:id", ctrl.getKostById);
router.post("/", ctrl.createKost);
router.put("/:id", ctrl.updateKost);
router.delete("/:id", ctrl.deleteKost);

module.exports = router;