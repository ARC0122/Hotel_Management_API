const Employee = require("../controllers/employeeController");
const express = require("express");
const router = express.Router();

router.route("/").post(Employee.createEmployee).get(Employee.getAllEmployee);

router
  .route("/:id")
  .patch(Employee.updateEmployee)
  .get(Employee.getEmployeeByID)
  .delete(Employee.deleteEmployee);

module.exports = router;
