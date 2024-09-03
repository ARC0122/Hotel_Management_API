const HotelServices = require("../services/hotelServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class HotelController {
  createHotel = async (req, res) => {
    try {
      const result = await HotelServices.createHotel(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getHotelByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await HotelServices.getHotelByID(id);
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

  getAllHotel = async (req, res) => {
    try {
      const result = await HotelServices.getAllHotel(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`);
    }
  };

  updateHotel = async (req, res) => {
    try {
      const result = await HotelServices.updateHotel(req.params.id, req.body);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteHotel = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await HotelServices.deleteHotel(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new HotelController();
