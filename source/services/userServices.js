const { DataTypes } = require("sequelize");

const sequelize = require("../../utils/database");
// const sequelize = require("../../models/index").sequelize;
const User = require("../../models/userModel")(sequelize, DataTypes);

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
      console.log(err);
    }
  };

  getAllUser = async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      console.log(err);
    }
  };

  getUserByID = async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  };
}

module.exports = new UserServices();
