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
        allowNull: false,
        validate: {
          notEmpty: { msg: "RoomID cannot be empty" },
          isInt: { msg: "RoomID must be an integer" },
        },
      },
      CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "CustomerID cannot be empty" },
          isInt: { msg: "CustomerID must be an integer" },
        },
      },
      BookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: { msg: "BookingDate cannot be empty" },
          isDate: { msg: "BookingDate must be a valid date" },
        },
      },
      CheckInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,

        validate: {
          isDate: { msg: "CheckInDate must be a valid date" },
        },
      },
      CheckOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,

        validate: {
          isDate: { msg: "CheckOutDate must be a valid date" },
        },
      },
      TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,

        validate: {
          isDecimal: { msg: "TotalPrice must be a valid decimal number" },
          min: {
            args: [0],
            msg: "TotalPrice must be greater than or equal to 0",
          },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,

        validate: {
          isInt: { msg: "createdBy must be an integer" },
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,

        validate: {
          isInt: { msg: "updatedBy must be an integer" },
        },
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
