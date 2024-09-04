// customer services

// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const Customer = require("../models/customerModel")(sequelize, DataTypes);
const { Customer, Sequelize } = require("../models/index");
const { pagination, sorting } = require("../utils/helper");

class CustomerServices {
  getAllCustomer = async (query) => {
    try {
      console.log(query);
      const { page, pageSize, sortedBy, sortOrder } = { ...query };

      //pagination
      const { offset, limit } = pagination(page, pageSize);

      //sorting
      const order = sorting(sortedBy, sortOrder);

      const customers = await Customer.findAll({
        offset: offset,
        limit: limit,
        order: order,
      });
      return customers;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createCustomer = async (data) => {
    const { UserID } = data;
    const customer = {
      UserID,
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
      const customer = await Customer.findOne({
        where: Sequelize.literal(`BINARY CustomerID = '${id}'`),
      });
      if (!customer) {
        return "customer not found";
      }
      return customer;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateCustomer = async (id, data) => {
    try {
      const customer = await Customer.findOne({
        where: Sequelize.literal(`BINARY CustomerID = '${id}'`),
      });
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
      const customer = await Customer.findOne({
        where: Sequelize.literal(`BINARY CustomerID = '${id}'`),
      });
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
