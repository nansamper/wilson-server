const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  user: {
    type: String,
  },
  book: {
    type: String,
  },
  status: {
    type: String,
  },
});

const reservation = model("reservations", reservationSchema);
module.exports = reservation;
