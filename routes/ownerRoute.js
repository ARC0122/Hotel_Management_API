const Owner = require("../controllers/ownerController");
const express = require("express");
const router = express.Router();

router.route("/").post(Owner.createOwner).get(Owner.getAllOwner);

router
  .route("/:id")
  .patch(Owner.updateOwner)
  
  .get(Owner.getOwnerByID)
  .delete(Owner.deleteOwner);

module.exports = router;
