"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("rooms", {
      RoomID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RoomNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      RoomType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: 0,
      },
      HotelID: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
          model: "hotels",
          key: "HotelID",
        },
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
    await queryInterface.dropTable("rooms");
  },
};
