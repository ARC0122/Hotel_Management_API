// room services

// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const Room = require("../models/roomModel")(sequelize, DataTypes);
const { Room, Sequelize } = require("../models/index");
const { pagination, sorting, Search } = require("../utils/helper");

class RoomServices {
  getAllRoom = async (query) => {
    try {
      const { page, pageSize, sortedBy, sortOrder } = { ...query };

      //pagination
      const { offset, limit } = pagination(page, pageSize);

      //sorting
      const order = sorting(sortedBy, sortOrder);

      //search
      const searchFields = ["RoomNo", "RoomType", "Price", "Status", "HotelID"];
      const where = {
        ...Search(query, searchFields),
      };

      const rooms = await Room.findAll({
        offset: offset,
        limit: limit,
        order: order,
        where: where,
      });
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
      const room = await Room.findOne({
        where: Sequelize.literal(`BINARY RoomID = '${id}'`),
      });
      if (!room) {
        return "room not found";
      }
      return room;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateRoom = async (id, data) => {
    try {
      const room = await Room.findOne({
        where: Sequelize.literal(`BINARY RoomID = '${id}'`),
      });

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
      const room = await Room.findOne({
        where: Sequelize.literal(`BINARY RoomID = '${id}'`),
      });

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
