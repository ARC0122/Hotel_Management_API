module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define(
    "Facility",
    {
      FacilityID: {
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

        validate: {
          isInt: {
            msg: "createdBy must be an integer",
          },
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,

        validate: {
          isInt: {
            msg: "updatedBy must be an integer",
          },
        },
      },
    },
    {
      tableName: "facilities",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Facility.associate = function (models) {
    Facility.hasMany(models.Employee, {
      foreignKey: "FacilityID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Facility;
};
