const express = require("express");

//env config
require("dotenv").config();

const db = require("./models/index");
const userRoute = require("./routes/userRoute");
const ownerRoute = require("./routes/ownerRoute");
const hotelRoute = require("./routes/hotelRoute");
const facilityRoute = require("./routes/facilityRoute");
const employeeRoute = require("./routes/employeeRoute");
const roomRoute = require("./routes/roomRoute");
const roomEmployeeRoute = require("./routes/roomEmployeeRoute");
const customerRoute = require("./routes/customerRoute");
const bookingRoute = require("./routes/bookingRoute");

const app = express();

app.use(express.json());
// db.sequelize.sync({ force: false });
// db.sequelize.sync({ alter: true });

app.use("/api/users", userRoute);
app.use("/api/owners", ownerRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/facilities", facilityRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/roomEmployees", roomEmployeeRoute);
app.use("/api/customers", customerRoute);
app.use("/api/bookings", bookingRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
