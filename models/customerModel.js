module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      CustomerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    {
      tableName: "customers",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  Customer.associate = function (models) {
    Customer.belongsTo(models.User, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Customer.hasMany(models.Booking, {
      foreignKey: "CustomerID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Customer;
};
