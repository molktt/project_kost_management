const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/penyewaController");

router.get("/", ctrl.getPenyewa);
router.post("/", ctrl.createPenyewa);
router.put("/:id", ctrl.updatePenyewa);
router.delete("/:id", ctrl.deletePenyewa);

module.exports = router;