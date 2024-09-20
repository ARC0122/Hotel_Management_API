const RoomServices = require("../services/roomServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class RoomController {
  createRoom = async (req, res, next) => {
    try {
      const result = await RoomServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getRoomByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await RoomServices.getEntryByID(id);
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

  getAllRoom = async (req, res, next) => {
    try {
      const result = await RoomServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateRoom = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await RoomServices.updateEntry(id, data);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteRoom = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await RoomServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new RoomController();
