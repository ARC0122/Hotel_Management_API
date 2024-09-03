module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define(
    "Owner",
    {
      OwnerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserID cannot be empty" },
          isInt: { msg: "UserID must be an integer" },
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
      tableName: "owners",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Owner.associate = function (models) {
    Owner.belongsTo(models.User, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Owner.hasMany(models.Hotel, {
      foreignKey: "OwnerID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Owner;
};
