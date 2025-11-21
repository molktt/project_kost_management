const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/kamarController");

router.get("/", ctrl.getKamar);
router.post("/", ctrl.createKamar);
router.put("/:id", ctrl.updateKamar);
router.delete("/:id", ctrl.deleteKamar);

module.exports = router;