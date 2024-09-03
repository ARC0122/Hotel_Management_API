const OwnerServices = require("../services/ownerServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class OwnerController {
  createOwner = async (req, res) => {
    try {
      const result = await OwnerServices.createOwner(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getOwnerByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await OwnerServices.getOwnerByID(id);
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

  getAllOwner = async (req, res) => {
    try {
      const result = await OwnerServices.getAllOwner(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
        ${err.message}`);
    }
  };

  updateOwner = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await OwnerServices.updateOwner(id, data);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
        ${err.message}`);
    }
  };

  deleteOwner = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await OwnerServices.deleteOwner(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new OwnerController();
