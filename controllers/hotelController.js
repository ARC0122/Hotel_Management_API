const HotelServices = require("../services/hotelServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class HotelController {
  createHotel = async (req, res, next) => {
    try {
      const result = await HotelServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getHotelByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await HotelServices.getEntryByID(id);
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

  getAllHotel = async (req, res, next) => {
    try {
      const result = await HotelServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateHotel = async (req, res, next) => {
    try {
      const result = await HotelServices.updateEntry(req.params.id, req.body);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteHotel = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await HotelServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new HotelController();
