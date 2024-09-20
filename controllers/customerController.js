const CustomerServices = require("../services/customerServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class CustomerController {
  createCustomer = async (req, res, next) => {
    try {
      const result = await CustomerServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getCustomerByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await CustomerServices.getEntryByID(id);
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

  getAllCustomer = async (req, res, next) => {
    try {
      const result = await CustomerServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateCustomer = async (req, res, next) => {
    try {
      const result = await CustomerServices.updateEntry(
        req.params.id,
        req.body
      );
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteCustomer = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await CustomerServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new CustomerController();
