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
      FName: { type: DataTypes.STRING, allowNull: false },
      LName: { type: DataTypes.STRING, allowNull: false },
      Email: { type: DataTypes.STRING, allowNull: false, unique: true },
      Mobile: { type: DataTypes.STRING, allowNull: false },
      Gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
      },
      createdBy: { type: DataTypes.INTEGER, allowNull: true },
      updatedBy: { type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: "users", paranoid: true, timestamps: true }
  );

  // Associations
  User.associate = function (models) {
    User.hasOne(models.Owner);
    User.hasOne(models.Customer);
    User.hasOne(models.Employee);
  };
  return User;
};
