const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/pembayaranController");

router.get("/", ctrl.getPembayaran);
router.post("/", ctrl.createPembayaran);
router.put("/:id", ctrl.updatePembayaran);
router.delete("/:id", ctrl.deletePembayaran);

module.exports = router;