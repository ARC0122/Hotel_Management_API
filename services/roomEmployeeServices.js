// roomEmployee services

const { DataTypes } = require("sequelize");
const sequelize = require("../models/index").sequelize;

const RoomEmployee = require("../models/roomEmployeeModel")(
  sequelize,
  DataTypes
);

class RoomEmployeeServices {
  getAllRoomEmployee = async () => {
    try {
      const roomEmployees = await RoomEmployee.findAll();
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
