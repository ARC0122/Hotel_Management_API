const RoomEmployeeServices = require("../services/roomEmployeeServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class RoomEmployeeController {
  createRoomEmployee = async (req, res, next) => {
    try {
      const result = await RoomEmployeeServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getRoomEmployeeByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await RoomEmployeeServices.getEntryByID(id);
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

  getAllRoomEmployee = async (req, res, next) => {
    try {
      const result = await RoomEmployeeServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateRoomEmployee = async (req, res, next) => {
    try {
      const result = await RoomEmployeeServices.updateEntry(
        req.params.id,
        req.body
      );
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteRoomEmployee = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await RoomEmployeeServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new RoomEmployeeController();
