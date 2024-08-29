module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      EmployeeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: {
        type: DataTypes.INTEGER,
      },
      HotelID: {
        type: DataTypes.INTEGER,
      },
      ServiceID: {
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
      tableName: "employees",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Employee.associate = function (models) {
    Employee.belongsTo(models.User, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Employee.belongsTo(models.Hotel, {
      foreignKey: "HotelID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Employee.belongsTo(models.Service, {
      foreignKey: "ServiceID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Employee.hasMany(models.RoomEmployee);
  };
  return Employee;
};
