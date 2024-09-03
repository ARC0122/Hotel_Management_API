module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define(
    "Hotel",
    {
      HotelID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hotelName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Hotel name cannot be empty" },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "City cannot be empty" },
        },
      },
      OwnerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "OwnerID cannot be empty" },
          isInt: { msg: "OwnerID must be an integer" },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,

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
      tableName: "hotels",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Hotel.associate = function (models) {
    Hotel.belongsTo(models.Owner, {
      foreignKey: "OwnerID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Hotel.hasMany(models.Room, {
      foreignKey: "HotelID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Hotel;
};
