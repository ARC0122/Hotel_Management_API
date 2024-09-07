// customer services

const { Customer } = require("../models/index");
const BaseServices = require("./baseServices");

const CustomerServices = new BaseServices(Customer, "CustomerID", ["UserID"]);

module.exports = CustomerServices;

// class CustomerServices {
//   getAllCustomer = async (query) => {
//     try {
//       console.log(query);
//       const { page, pageSize, sortedBy, sortOrder } = { ...query };

//       //pagination
//       const { offset, limit } = pagination(page, pageSize);

//       //sorting
//       const order = sorting(sortedBy, sortOrder);

//       //search
//       const searchFields = ["UserID"];
//       const where = {
//         ...Search(query, searchFields),
//       };

//       const customers = await Customer.findAll({
//         offset: offset,
//         limit: limit,
//         order: order,
//         where: where,
//       });
//       return customers;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   createCustomer = async (data) => {
//     const { UserID } = data;
//     const customer = {
//       UserID,
//     };
//     try {
//       const newCustomer = await Customer.create(customer);
//       return newCustomer;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   getCustomerByID = async (id) => {
//     try {
//       const customer = await Customer.findOne({
//         where: Sequelize.literal(`BINARY CustomerID = '${id}'`),
//       });
//       if (!customer) {
//         return "customer not found";
//       }
//       return customer;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   updateCustomer = async (id, data) => {
//     try {
//       const customer = await Customer.findOne({
//         where: Sequelize.literal(`BINARY CustomerID = '${id}'`),
//       });
//       if (customer) {
//         const updatedCustomerCount = await Customer.update(
//           { ...data },
//           { where: { CustomerID: id } }
//         );
//         if (updatedCustomerCount) {
//           const updatedCustomer = await Customer.findByPk(id);
//           return updatedCustomer;
//         }
//       } else {
//         return "customer not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   deleteCustomer = async (id) => {
//     try {
//       const customer = await Customer.findOne({
//         where: Sequelize.literal(`BINARY CustomerID = '${id}'`),
//       });
//       if (customer) {
//         const customer = await Customer.destroy({ where: { CustomerID: id } });
//         return customer;
//       } else {
//         return "customer not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };
// }

// module.exports = new CustomerServices();
