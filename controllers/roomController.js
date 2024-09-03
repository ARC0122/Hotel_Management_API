const RoomServices = require("../services/roomServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class RoomController {
  createRoom = async (req, res) => {
    try {
      const result = await RoomServices.createRoom(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getRoomByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await RoomServices.getRoomByID(id);
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

  getAllRoom = async (req, res) => {
    try {
      const result = await RoomServices.getAllRoom(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`);
    }
  };

  updateRoom = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await RoomServices.updateRoom(id, data);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteRoom = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await RoomServices.deleteRoom(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new RoomController();
