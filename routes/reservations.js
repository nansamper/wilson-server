var express = require("express");
var router = express.Router();

const reservationController = require("../controllers/reservation.controller");

router.route("/").get(reservationController.getReservations);
router.route("/").post(reservationController.newReservation);
router.route("/return").post(reservationController.endReservation);

module.exports = router;
