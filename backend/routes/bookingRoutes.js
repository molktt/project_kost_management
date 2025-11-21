const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bookingController");

router.get("/", ctrl.getBooking);
router.post("/", ctrl.createBooking);
router.delete("/:id", ctrl.deleteBooking);

module.exports = router;