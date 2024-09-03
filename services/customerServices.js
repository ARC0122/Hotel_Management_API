// customer services

const { DataTypes } = require("sequelize");
const sequelize = require("../models/index").sequelize;

const Customer = require("../models/customerModel")(sequelize, DataTypes);

class CustomerServices {
  getAllCustomer = async () => {
    try {
      const customers = await Customer.findAll();
      return customers;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createCustomer = async (data) => {
    const { UserID, HotelID, FacilityID } = data;
    const customer = {
      UserID,
      HotelID,
      FacilityID,
    };
    try {
      const newCustomer = await Customer.create(customer);
      return newCustomer;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getCustomerByID = async (id) => {
    try {
      const customer = await Customer.findByPk(id);
      return customer;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateCustomer = async (id, data) => {
    try {
      const customer = await Customer.findByPk(id);
      if (customer) {
        const updatedCustomerCount = await Customer.update(
          { ...data },
          { where: { CustomerID: id } }
        );
        if (updatedCustomerCount) {
          const updatedCustomer = await Customer.findByPk(id);
          return updatedCustomer;
        }
      } else {
        return "customer not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteCustomer = async (id) => {
    try {
      const customer = await Customer.findByPk(id);
      if (customer) {
        const customer = await Customer.destroy({ where: { CustomerID: id } });
        return customer;
      } else {
        return "customer not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new CustomerServices();
