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
    Owner.hasMany(models.Hotel);
  };

  return Owner;
};
