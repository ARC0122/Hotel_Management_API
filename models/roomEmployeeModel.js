module.exports = (sequelize, DataTypes) => {
  const RoomEmployee = sequelize.define(
    "RoomEmployee",
    {
      RoomEmployeeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      EmployeeID: {
        type: DataTypes.INTEGER,
      },
      RoomID: {
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
      tableName: "roomEmployees",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  RoomEmployee.associate = function (models) {
    RoomEmployee.belongsTo(models.Employee, {
      foreignKey: "EmployeeID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    RoomEmployee.belongsTo(models.Room, {
      foreignKey: "RoomID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return RoomEmployee;
};
