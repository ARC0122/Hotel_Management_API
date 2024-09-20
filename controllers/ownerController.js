const OwnerServices = require("../services/ownerServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class OwnerController {
  createOwner = async (req, res, next) => {
    try {
      const result = await OwnerServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getOwnerByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await OwnerServices.getEntryByID(id);
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

  getAllOwner = async (req, res, next) => {
    try {
      const result = await OwnerServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateOwner = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await OwnerServices.updateEntry(id, data);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteOwner = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await OwnerServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new OwnerController();
