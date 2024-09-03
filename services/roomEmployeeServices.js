// roomEmployee services

// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const RoomEmployee = require("../models/roomEmployeeModel")(
//   sequelize,
//   DataTypes
// );
const { RoomEmployee } = require("../models/index");

class RoomEmployeeServices {
  getAllRoomEmployee = async (query) => {
    try {
      console.log(query);
      const { page = 1, pageSize = 10 } = { ...query };

      //pagination
      const { offset, limit } = getPaginationOptions(page, pageSize);

      const roomEmployees = await RoomEmployee.findAll({
        offset: offset,
        limit: limit,
      });
      return roomEmployees;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createRoomEmployee = async (data) => {
    const { EmployeeID, RoomID } = data;
    const roomEmployee = {
      EmployeeID,
      RoomID,
    };
    try {
      const newRoomEmployee = await RoomEmployee.create(roomEmployee);
      return newRoomEmployee;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getRoomEmployeeByID = async (id) => {
    try {
      const roomEmployee = await RoomEmployee.findByPk(id);
      return roomEmployee;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateRoomEmployee = async (id, data) => {
    try {
      const roomEmployee = await RoomEmployee.findByPk(id);
      if (roomEmployee) {
        const updatedRoomEmployeeCount = await RoomEmployee.update(
          { ...data },
          { where: { RoomEmployeeID: id } }
        );
        if (updatedRoomEmployeeCount) {
          const updatedRoomEmployee = await RoomEmployee.findByPk(id);
          return updatedRoomEmployee;
        }
      } else {
        return "roomEmployee not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteRoomEmployee = async (id) => {
    try {
      const roomEmployee = await RoomEmployee.findByPk(id);
      if (roomEmployee) {
        const roomEmployee = await RoomEmployee.destroy({
          where: { RoomEmployeeID: id },
        });
        return roomEmployee;
      } else {
        return "roomEmployee not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new RoomEmployeeServices();
