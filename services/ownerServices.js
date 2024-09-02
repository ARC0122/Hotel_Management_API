//owner services
const Owner = require("../models/ownerModel")(sequelize, DataTypes);

const User = require("../models/userModel")(sequelize, DataTypes);

class OwnerServices {
  getAllOwner = async () => {
    try {
      const owners = await Owner.findAll({
        include: [
          {
            model: User,
            as: "User",
          },
        ],
      });
      return owners;
    } catch (err) {
      return err;
    }
  };
}

module.exports = new OwnerServices();
