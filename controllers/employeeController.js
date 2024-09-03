const EmployeeServices = require("../services/employeeServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class EmployeeController {
  createEmployee = async (req, res) => {
    try {
      const result = await EmployeeServices.createEmployee(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getEmployeeByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await EmployeeServices.getEmployeeByID(id);
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

  getAllEmployee = async (req, res) => {
    try {
      const result = await EmployeeServices.getAllEmployee(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`);
    }
  };

  updateEmployee = async (req, res) => {
    try {
      const result = await EmployeeServices.updateEmployee(
        req.params.id,
        req.body
      );
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteEmployee = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await EmployeeServices.deleteEmployee(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new EmployeeController();
