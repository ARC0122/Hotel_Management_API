const Customer = require("../controllers/customerController");
const express = require("express");
const router = express.Router();

router.route("/").post(Customer.createCustomer).get(Customer.getAllCustomer);

router
  .route("/:id")
  .patch(Customer.updateCustomer)
  .get(Customer.getCustomerByID)
  .delete(Customer.deleteCustomer);

module.exports = router;
