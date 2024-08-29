module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      BookingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RoomID: {
        type: DataTypes.INTEGER,
      },
      CustomerID: {
        type: DataTypes.INTEGER,
      },
      BookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      CheckInDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      CheckOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "bookings",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Booking.associate = function (models) {
    Booking.belongsTo(models.Customer, {
      foreignKey: "CustomerID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Booking.belongsTo(models.Room, {
      foreignKey: "RoomID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Booking;
};
