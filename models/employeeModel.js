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
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserID cannot be empty" },
          isInt: { msg: "UserID must be an integer" },
        },
      },
      HotelID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "HotelID cannot be empty" },
          isInt: { msg: "HotelID must be an integer" },
        },
      },
      FacilityID: {
        type: DataTypes.INTEGER,
        allowNull: false,

        validate: {
          isInt: { msg: "FacilityID must be an integer" },
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
    Employee.belongsTo(models.Facility, {
      foreignKey: "FacilityID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Employee.hasMany(models.RoomEmployee, {
      foreignKey: "EmployeeID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Employee;
};
