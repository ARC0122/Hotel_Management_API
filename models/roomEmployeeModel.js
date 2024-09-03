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
        allowNull: false,
        validate: {
          notEmpty: { msg: "EmployeeID cannot be empty" },
          isInt: { msg: "EmployeeID must be an integer" },
        },
      },
      RoomID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "RoomID cannot be empty" },
          isInt: { msg: "RoomID must be an integer" },
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
