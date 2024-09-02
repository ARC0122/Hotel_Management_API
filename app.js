const express = require("express");
const db = require("./models/index");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
db.sequelize.sync({ force: false });
// db.sequelize.sync({ alter: true });

app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
