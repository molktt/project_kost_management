const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/kategoriController");  

router.get("/", ctrl.getKategori);
router.post("/", ctrl.createKategori);
router.put("/:id", ctrl.updateKategori);
router.delete("/:id", ctrl.deleteKategori); 

module.exports = router;