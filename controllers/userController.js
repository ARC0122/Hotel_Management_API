const UserServices = require("../services/userServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class UserController {
  createUser = async (req, res) => {
    try {
      const result = await UserServices.createEntry(req.body);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getUserByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await UserServices.getEntryByID(id);

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

  getAllUser = async (req, res) => {
    try {
      const result = await UserServices.getAllEntry(req.query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(
        `${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`
      );
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await UserServices.updateEntry(id, data);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await UserServices.deleteEntry(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new UserController();
