const Hotel = require("../controllers/hotelController");
const express = require("express");
const router = express.Router();

router.route("/").post(Hotel.createHotel).get(Hotel.getAllHotel);

router
  .route("/:id")
  .patch(Hotel.updateHotel)
  .get(Hotel.getHotelByID)
  .delete(Hotel.deleteHotel);

module.exports = router;
