//user services
const { DataTypes } = require("sequelize");
// const sequelize = require("../utils/database");
const sequelize = require("../models/index").sequelize;
const User = require("../models/userModel")(sequelize, DataTypes);

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
      const filters = { ...query };

      console.log(query);
      // const users = await User.findAll({ where: filters });
      const users = await User.findAll();

      return users;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
  // async getAllUser(query) {
  //   try {
  //     // Extract filter and sort parameters from the query
  //     const { filter, sortBy, sortOrder = "ASC" } = query;

  //     // Prepare filters
  //     const filters = {};
  //     if (filter) {
  //       // Assuming filter is a stringified JSON object containing field-value pairs
  //       const parsedFilter = JSON.parse(filter);
  //       for (const [key, value] of Object.entries(parsedFilter)) {
  //         // Use Sequelize operators to construct the filter conditions
  //         filters[key] = { [Op.like]: `%${value}%` }; // Example: partial match
  //       }
  //     }

  //     // Prepare sorting
  //     const order = sortBy
  //       ? [[sortBy, sortOrder.toUpperCase()]]
  //       : [["createdAt", "ASC"]];

  //     // Fetch users with filtering and sorting
  //     const users = await User.findAll({
  //       where: filters,
  //       order: order,
  //     });

  //     return users;
  //   } catch (err) {
  //     console.error("Error fetching users:", err.message);
  //     throw new Error(`Error: ${err.message}`);
  //   }
  // }

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
