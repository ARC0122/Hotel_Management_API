const Facility = require("../controllers/facilityController");
const express = require("express");
const router = express.Router();

router.route("/").post(Facility.createFacility).get(Facility.getAllFacility);

router
  .route("/:id")
  .patch(Facility.updateFacility)
  .get(Facility.getFacilityByID)
  .delete(Facility.deleteFacility);

module.exports = router;
