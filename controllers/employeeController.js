const EmployeeServices = require("../services/employeeServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class EmployeeController {
  createEmployee = async (req, res, next) => {
    try {
      const result = await EmployeeServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getEmployeeByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await EmployeeServices.getEntryByID(id);
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

  getAllEmployee = async (req, res, next) => {
    try {
      const result = await EmployeeServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateEmployee = async (req, res, next) => {
    try {
      const result = await EmployeeServices.updateEntry(
        req.params.id,
        req.body
      );
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteEmployee = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await EmployeeServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new EmployeeController();
