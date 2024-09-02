module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      FName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "First name cannot be empty" },
          isAlpha: { msg: "First name must contain only letters" },
        },
      },
      LName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Last name cannot be empty" },
          isAlpha: { msg: "Last name must contain only letters" },
        },
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Must be a valid email address" },
          notEmpty: { msg: "Email cannot be empty" },
        },
      },
      Mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: { msg: "Mobile number must contain only numbers" },
          len: {
            args: [10],
            msg: "Mobile number must be 10 digits",
          },
        },
      },
      Gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["male", "female", "other"]],
            msg: "Gender must be either 'male', 'female', or 'other'",
          },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: { msg: "createdBy must be an integer" },
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: { msg: "updatedBy must be an integer" },
        },
      },
    },
    { tableName: "users", paranoid: true, timestamps: true }
  );

  // Associations
  User.associate = function (models) {
    User.hasOne(models.Owner, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasOne(models.Customer, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasOne(models.Employee, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
