const BookingServices = require("../services/bookingServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class BookingController {
  createBooking = async (req, res, next) => {
    try {
      const result = await BookingServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getBookingByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await BookingServices.getEntryByID(id);
      if (result) {
        res.status(res_CODE.OK).json(result);
      } else {
        res.status(res_CODE.NOT_FOUND).json({
          error: res_MESSAGES.NOT_FOUND,
        });
      }
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getAllBooking = async (req, res, next) => {
    try {
      const result = await BookingServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateBooking = async (req, res, next) => {
    try {
      const result = await BookingServices.updateEntry(req.params.id, req.body);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteBooking = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await BookingServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new BookingController();
