const Book = require("../models/book.model");
const Reservation = require("../models/reservation.model");

const getBooks = async (req, res) => {
  try {
    let books = await Book.find().lean();
    res.status(200).json(books);
  } catch (ex) {
    console.error(ex);
    res.status(500);
  }
};

const getAvailables = async (req, res) => {
  try {
    let books = await Book.find().lean();
    let activeReservations = await Reservation.find({ status: "active" }).lean();

    books.forEach((book) => {
      let reservationBook = activeReservations.find((reservation) => reservation.book == book.name);
      if (reservationBook) {
        book.endDate = reservationBook.endDate;
        book.available = false;
      } else {
        book.available = true;
      }
    });

    res.status(200).json(books);
  } catch (ex) {
    console.error(ex);
    res.status(500);
  }
};

module.exports = {
  getBooks,
  getAvailables,
};
