const Room = require("../controllers/roomController");
const express = require("express");
const router = express.Router();

router.route("/").post(Room.createRoom).get(Room.getAllRoom);

router
  .route("/:id")
  .patch(Room.updateRoom)
  .get(Room.getRoomByID)
  .delete(Room.deleteRoom);

module.exports = router;
