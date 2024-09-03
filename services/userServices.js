//user services
// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const User = require("../models/userModel")(sequelize, DataTypes);
const { User } = require("../models/index");
const { getPaginationOptions } = require("../utils/helper");

class UserServices {
  createUser = async (data) => {
    console.log(User);
    const { FName, LName, Email, Mobile, Gender } = data;
    const user = {
      FName,
      LName,
      Email,
      Mobile,
      Gender,
    };
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getAllUser = async (query) => {
    try {
      console.log(query);
      const { page = 1, pageSize = 10 } = { ...query };

      //pagination
      const { offset, limit } = getPaginationOptions(page, pageSize);

      const users = await User.findAll({ offset: offset, limit: limit });

      return users;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getUserByID = async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateUser = async (id, data) => {
    try {
      const user = await User.findByPk(id);
      if (user) {
        const updatedUserCount = await User.update(
          { ...data },
          { where: { UserID: id } }
        );
        if (updatedUserCount) {
          const updatedUser = await User.findByPk(id);
          return updatedUser;
        }
      } else {
        return "user not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteUser = async (id) => {
    try {
      const user = await User.findByPk(id);
      if (user) {
        const user = await User.destroy({ where: { UserID: id } });
        return user;
      } else {
        return "user not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new UserServices();
