const RoomEmployee = require("../controllers/roomEmployeeController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(RoomEmployee.createRoomEmployee)
  .get(RoomEmployee.getAllRoomEmployee);

router
  .route("/:id")
  .patch(RoomEmployee.updateRoomEmployee)
  .get(RoomEmployee.getRoomEmployeeByID)
  .delete(RoomEmployee.deleteRoomEmployee);

module.exports = router;
