// booking services

// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const Booking = require("../models/bookingModel")(sequelize, DataTypes);
const { Booking } = require("../models/index");
const { pagination, sorting } = require("../utils/helper");

class BookingServices {
  getAllBooking = async (query) => {
    try {
      const { page, pageSize, sortedBy, sortOrder } = { ...query };

      //pagination
      const { offset, limit } = pagination(page, pageSize);

      //sorting
      const order = sorting(sortedBy, sortOrder);

      const bookings = await Booking.findAll({
        offset: offset,
        limit: limit,
        order: order,
      });

      return bookings;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createBooking = async (data) => {
    const {
      RoomID,
      CustomerID,
      BookingDate,
      CheckInDate,
      CheckOutDate,
      TotalPrice,
    } = data;
    const booking = {
      RoomID,
      CustomerID,
      BookingDate,
      CheckInDate,
      CheckOutDate,
      TotalPrice,
    };
    try {
      const newBooking = await Booking.create(booking);
      return newBooking;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getBookingByID = async (id) => {
    try {
      const booking = await Booking.findByPk(id);
      return booking;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateBooking = async (id, data) => {
    try {
      const booking = await Booking.findByPk(id);
      if (booking) {
        const updatedBookingCount = await Booking.update(
          { ...data },
          { where: { BookingID: id } }
        );
        if (updatedBookingCount) {
          const updatedBooking = await Booking.findByPk(id);
          return updatedBooking;
        }
      } else {
        return "booking not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteBooking = async (id) => {
    try {
      const booking = await Booking.findByPk(id);
      if (booking) {
        const booking = await Booking.destroy({ where: { BookingID: id } });
        return booking;
      } else {
        return "booking not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new BookingServices();
