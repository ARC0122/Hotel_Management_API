const RoomEmployeeServices = require("../services/roomEmployeeServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class RoomEmployeeController {
  createRoomEmployee = async (req, res) => {
    try {
      const result = await RoomEmployeeServices.createRoomEmployee(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getRoomEmployeeByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await RoomEmployeeServices.getRoomEmployeeByID(id);
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

  getAllRoomEmployee = async (req, res) => {
    try {
      const result = await RoomEmployeeServices.getAllRoomEmployee(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`);
    }
  };

  updateRoomEmployee = async (req, res) => {
    try {
      const result = await RoomEmployeeServices.updateRoomEmployee(
        req.params.id,
        req.body
      );
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteRoomEmployee = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await RoomEmployeeServices.deleteRoomEmployee(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new RoomEmployeeController();
