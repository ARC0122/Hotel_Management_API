// room services

// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const Room = require("../models/roomModel")(sequelize, DataTypes);
const { Room } = require("../models/index");

class RoomServices {
  getAllRoom = async (query) => {
    try {
      console.log(query);
      const { page = 1, pageSize = 10 } = { ...query };

      //pagination
      const { offset, limit } = getPaginationOptions(page, pageSize);

      const rooms = await Room.findAll({ offset: offset, limit: limit });
      return rooms;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createRoom = async (data) => {
    const { RoomNo, RoomType, Price, Status, HotelID } = data;
    const room = {
      RoomNo,
      RoomType,
      Price,
      Status,
      HotelID,
    };
    try {
      const newRoom = await Room.create(room);
      return newRoom;
    } catch (err) {
      console.log("Service", err);
      throw new Error(`Error: ${err.message}`);
    }
  };

  getRoomByID = async (id) => {
    try {
      const room = await Room.findByPk(id);
      return room;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateRoom = async (id, data) => {
    try {
      const room = await Room.findByPk(id);
      if (room) {
        const updatedRoomCount = await Room.update(
          { ...data },
          { where: { RoomID: id } }
        );
        if (updatedRoomCount) {
          const updatedRoom = await Room.findByPk(id);
          return updatedRoom;
        }
      } else {
        return "room not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteRoom = async (id) => {
    try {
      const room = await Room.findByPk(id);
      if (room) {
        const room = await Room.destroy({ where: { RoomID: id } });
        return room;
      } else {
        return "room not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new RoomServices();
