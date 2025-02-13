const Reservation = require("../models/reservation.model");

const getReservations = async (req, res) => {
  try {
    let reservations = await Reservation.find().lean();
    res.status(200).json(reservations);
  } catch (ex) {
    console.error(ex);
    res.status(500);
  }
};

const newReservation = async (req, res) => {
  try {
    let { book, startDate, endDate, user } = req.body;

    let activeReservations = await Reservation.findOne({ book: book, status: "active" }).lean();

    if (activeReservations) throw "That book is currently rented";

    let reservation = new Reservation({
      book: book,
      startDate: startDate,
      endDate: endDate,
      user: user,
      status: "active",
    });
    await reservation.save();

    res.status(200).json("Created");
  } catch (ex) {
    console.error(ex);
    res.status(500);
  }
};

const endReservation = async (req, res) => {
  try {
    let { book } = req.body;

    let reservation = await Reservation.findOne({ book: book, status: "active" });

    if (!reservation) throw "No reservations found for that book";

    reservation.status = "returned";
    reservation.endDate = Date.now();

    await reservation.save();

    res.status(200).json("Updated");
  } catch (ex) {
    console.error(ex);
    res.status(500);
  }
};

module.exports = {
  getReservations,
  newReservation,
  endReservation,
};
