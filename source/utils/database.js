const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("HotelSystem", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
