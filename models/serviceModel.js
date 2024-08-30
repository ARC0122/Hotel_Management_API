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
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2),
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
      tableName: "services",
      paranoid: true,
      timestamps: true,
    }
  );

  //Associations
  Service.associate = function (models) {
    Service.hasMany(models.Employee, {
      foreignKey: "ServiceID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Service;
};
