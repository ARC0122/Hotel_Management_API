// employee services

const { DataTypes } = require("sequelize");
const sequelize = require("../models/index").sequelize;

const Employee = require("../models/employeeModel")(sequelize, DataTypes);

class EmployeeServices {
  getAllEmployee = async () => {
    try {
      const employees = await Employee.findAll();
      return employees;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createEmployee = async (data) => {
    const { UserID, HotelID, FacilityID } = data;
    const employee = {
      UserID,
      HotelID,
      FacilityID,
    };
    try {
      const newEmployee = await Employee.create(employee);
      return newEmployee;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getEmployeeByID = async (id) => {
    try {
      const employee = await Employee.findByPk(id);
      return employee;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateEmployee = async (id, data) => {
    try {
      const employee = await Employee.findByPk(id);
      if (employee) {
        const updatedEmployeeCount = await Employee.update(
          { ...data },
          { where: { EmployeeID: id } }
        );
        if (updatedEmployeeCount) {
          const updatedEmployee = await Employee.findByPk(id);
          return updatedEmployee;
        }
      } else {
        return "employee not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteEmployee = async (id) => {
    try {
      const employee = await Employee.findByPk(id);
      if (employee) {
        const employee = await Employee.destroy({ where: { EmployeeID: id } });
        return employee;
      } else {
        return "employee not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new EmployeeServices();
