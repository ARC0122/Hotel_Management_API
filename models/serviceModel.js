module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      ServiceID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Price must be a decimal number",
          },
          min: {
            args: [0],
            msg: "Price cannot be negative",
          },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "createdBy must be an integer",
          },
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "updatedBy must be an integer",
          },
        },
      },
    },
    {
      tableName: "services",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Service.associate = function (models) {
    Service.hasMany(models.Employee, {
      foreignKey: "ServiceID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Service;
};
