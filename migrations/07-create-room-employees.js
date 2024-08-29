"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("roomEmployees", {
      RoomEmployeeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      EmployeeID: {
        type: DataTypes.INTEGER,
        references: {
          model: "employees",
          key: "EmployeeID",
        },
      },
      RoomID: {
        type: DataTypes.INTEGER,
        references: {
          model: "rooms",
          key: "RoomID",
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("roomEmployees");
  },
};
