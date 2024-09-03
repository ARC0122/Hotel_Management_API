module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      RoomID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RoomNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 10],
            msg: "RoomNo should be between 1 and 10 characters",
          },
        },
      },
      RoomType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: "RoomType should be between 1 and 50 characters",
          },
        },
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Price must be an integer",
          },
          min: {
            args: [0],
            msg: "Price cannot be negative",
          },
        },
      },
      Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      HotelID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "HotelID cannot be empty",
          },
          isInt: {
            msg: "HotelID must be an integer",
          },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,

        validate: {
          isInt: {
            msg: "createdBy must be an integer",
          },
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,

        validate: {
          isInt: {
            msg: "updatedBy must be an integer",
          },
        },
      },
    },
    {
      tableName: "rooms",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Room.associate = function (models) {
    Room.belongsTo(models.Hotel, {
      foreignKey: "HotelID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Room.hasMany(models.Booking, {
      foreignKey: "RoomID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Room;
};
