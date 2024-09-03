"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("bookings", {
      BookingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RoomID: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
          model: "rooms",
          key: "RoomID",
        },
      },
      CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
          model: "customers",
          key: "CustomerID",
        },
      },
      BookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      CheckInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      CheckOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("bookings");
  },
};
