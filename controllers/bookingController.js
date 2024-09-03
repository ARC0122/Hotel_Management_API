const BookingServices = require("../services/bookingServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class BookingController {
  createBooking = async (req, res) => {
    try {
      const result = await BookingServices.createBooking(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getBookingByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await BookingServices.getBookingByID(id);
      if (result) {
        res.status(ERROR_CODES.OK).json(result);
      } else {
        res.status(ERROR_CODES.NOT_FOUND).json({
          error: ERROR_MESSAGES.NOT_FOUND,
        });
      }
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:${err.message}`);
    }
  };

  getAllBooking = async (req, res) => {
    try {
      const result = await BookingServices.getAllBooking(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`);
    }
  };

  updateBooking = async (req, res) => {
    try {
      const result = await BookingServices.updateBooking(
        req.params.id,
        req.body
      );
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteBooking = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await BookingServices.deleteBooking(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new BookingController();
