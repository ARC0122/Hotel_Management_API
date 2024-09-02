const User = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(User.createUser).get(User.getAllUser);

router
  .route("/:id")
  .patch(User.updateUser)
  .get(User.getUserByID)
  .delete(User.deleteUser);

module.exports = router;
