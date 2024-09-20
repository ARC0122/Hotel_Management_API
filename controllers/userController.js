const UserServices = require("../services/userServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");
const AppError = require("../utils/AppError");

class UserController {
  createUser = async (req, res, next) => {
    try {
      const result = await UserServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getUserByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await UserServices.getEntryByID(id);

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

  getAllUser = async (req, res, next) => {
    try {
      console.log(req.query);
      const result = await UserServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await UserServices.updateEntry(id, data);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await UserServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new UserController();
