// const UserServices = require("../source/services/userServices");

// class UserController {
//   createUser = async (req, res) => {
//     try {
//       const user = req.body;
//       const result = await UserServices.createUser(user);
//       res.status(201).json(result);
//     } catch (err) {
//       res.status(400).json({ error: err });
//     }
//   };

//   getUserByID = async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const result = await UserServices.getUserByID(id);
//       if (result) {
//         res.status(200).json(result);
//         next();
//       } else {
//         res.status(404).json({ msg: "no user found" });
//       }
//     } catch (err) {
//       res.status(400).json({ error: err });
//     }
//   };

//   getAllUser = async (req, res) => {
//     try {
//       const result = await UserServices.getAllUser();
//       res.status(200).json(result);
//     } catch (err) {
//       res.status(400).json({ error: err });
//     }
//   };

//   updateUser = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const data = req.body;
//       const result = await UserServices.updateUser(id, data);
//       res.status(200).json(result);
//     } catch (err) {
//       res.status(400).json({ error: err });
//     }
//   };

//   deleteUser = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const result = await UserServices.deleteUser(id);
//       res.status(200).json(result);
//     } catch (err) {
//       res.status(400).json({ error: err });
//     }
//   };
// }

// module.exports = new UserController();

const UserServices = require("../services/userServices");

const ERROR_CODES = require("../statusCode");
const ERROR_MESSAGES = require("../errorMessage");

class UserController {
  createUser = async (req, res) => {
    try {
      const user = req.body;
      const result = await UserServices.createUser(user);
      res.status(ERROR_CODES.CREATED).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.CREATE_ERROR}:
        ${err.message}`);
    }
  };

  getUserByID = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await UserServices.getUserByID(id);
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
      const query = req.query;
      const result = await UserServices.getAllUser(query);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.GET_ERROR}:
       ${err.message}`);
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await UserServices.updateUser(id, data);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.UPDATE_ERROR}:
       ${err.message}`);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await UserServices.deleteUser(id);
      res.status(ERROR_CODES.OK).json(result);
    } catch (err) {
      throw new Error(`${ERROR_MESSAGES.DELETE_ERROR}: ${err.message}`);
    }
  };
}

module.exports = new UserController();
