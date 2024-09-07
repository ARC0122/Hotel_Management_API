const CustomerServices = require("../services/customerServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class CustomerController {
  createCustomer = async (req, res) => {
    try {
      const result = await CustomerServices.createEntry(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getCustomerByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await CustomerServices.getEntryByID(id);
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

  getAllCustomer = async (req, res) => {
    try {
      const result = await CustomerServices.getAllEntry(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`);
    }
  };

  updateCustomer = async (req, res) => {
    try {
      const result = await CustomerServices.updateEntry(
        req.params.id,
        req.body
      );
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteCustomer = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await CustomerServices.deleteEntry(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new CustomerController();
