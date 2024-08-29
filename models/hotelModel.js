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
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OwnerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    Hotel.hasMany(models.Room);
  };

  return Hotel;
};
