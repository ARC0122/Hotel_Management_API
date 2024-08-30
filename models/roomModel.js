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
        allowNull: true,
      },
      RoomType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: 0,
      },
      HotelID: {
        type: DataTypes.INTEGER,
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
      tableName: "rooms",
      paranoid: true,
      timestamps: true,
    }
  );

  //Associations
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
