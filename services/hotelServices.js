// hotel services

// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const Hotel = require("../models/hotelModel")(sequelize, DataTypes);
const { Hotel } = require("../models/index");

class HotelServices {
  getAllHotel = async (query) => {
    try {
      console.log(query);
      const { page = 1, pageSize = 10 } = { ...query };

      //pagination
      const { offset, limit } = getPaginationOptions(page, pageSize);

      const hotels = await Hotel.findAll({ offset: offset, limit: limit });
      return hotels;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createHotel = async (data) => {
    const { hotelName, city, OwnerID } = data;
    const hotel = {
      hotelName,
      city,
      OwnerID,
    };
    try {
      const newHotel = await Hotel.create(hotel);
      return newHotel;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getHotelByID = async (id) => {
    try {
      const hotel = await Hotel.findByPk(id);
      return hotel;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateHotel = async (id, data) => {
    try {
      const hotel = await Hotel.findByPk(id);
      if (hotel) {
        const updatedHotelCount = await Hotel.update(
          { ...data },
          { where: { HotelID: id } }
        );
        if (updatedHotelCount) {
          const updatedHotel = await Hotel.findByPk(id);
          return updatedHotel;
        }
      } else {
        return "hotel not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteHotel = async (id) => {
    try {
      const hotel = await Hotel.findByPk(id);
      if (hotel) {
        const hotel = await Hotel.destroy({ where: { HotelID: id } });
        return hotel;
      } else {
        return "hotel not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new HotelServices();
