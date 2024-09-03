//owner services

const { DataTypes } = require("sequelize");
// const sequelize = require("../utils/database");
const sequelize = require("../models/index").sequelize;

const Owner = require("../models/ownerModel")(sequelize, DataTypes);
const User = require("../models/userModel")(sequelize, DataTypes);

class OwnerServices {
  getAllOwner = async () => {
    try {
      const owners = await Owner.findAll();
      return owners;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createOwner = async (data) => {
    const { UserID } = data;
    const owner = {
      UserID,
    };
    try {
      const newOwner = await Owner.create(owner);
      return newOwner;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getOwnerByID = async (id) => {
    try {
      const owner = await Owner.findByPk(id);
      return owner;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateOwner = async (id, data) => {
    try {
      const owner = await Owner.findByPk(id);
      if (owner) {
        const updatedOwnerCount = await Owner.update(
          { ...data },
          { where: { OwnerID: id } }
        );
        if (updatedOwnerCount) {
          const updatedOwner = await Owner.findByPk(id);
          return updatedOwner;
        }
      } else {
        return "owner not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteOwner = async (id) => {
    try {
      const owner = await Owner.findByPk(id);
      if (owner) {
        const owner = await Owner.destroy({ where: { OwnerID: id } });
        return owner;
      } else {
        return "owner not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new OwnerServices();
