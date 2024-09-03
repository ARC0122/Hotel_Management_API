const Booking = require("../controllers/bookingController");
const express = require("express");
const router = express.Router();

router.route("/").post(Booking.createBooking).get(Booking.getAllBooking);

router
  .route("/:id")
  .patch(Booking.updateBooking)
  .get(Booking.getBookingByID)
  .delete(Booking.deleteBooking);

module.exports = router;
