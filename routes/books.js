var express = require("express");
var router = express.Router();

const bookController = require("../controllers/book.controller");

router.route("/").get(bookController.getBooks);
router.route("/available").get(bookController.getAvailables);

module.exports = router;
