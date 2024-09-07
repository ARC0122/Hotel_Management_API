//owner services

const { Owner } = require("../models/index");
const BaseServices = require("./baseServices");

const OwnerServices = new BaseServices(Owner, "OwnerID", ["UserID"]);

module.exports = OwnerServices;

// class OwnerServices {
//   getAllOwner = async (query) => {
//     try {
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

//       const owners = await Owner.findAll({
//         offset: offset,
//         limit: limit,
//         order: order,
//         where: where,
//       });
//       return owners;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   createOwner = async (data) => {
//     const { UserID } = data;
//     const owner = {
//       UserID,
//     };
//     try {
//       const newOwner = await Owner.create(owner);
//       return newOwner;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   getOwnerByID = async (id) => {
//     try {
//       const owner = await Owner.findOne({
//         where: Sequelize.literal(`BINARY OwnerID = '${id}'`),
//       });
//       if (!owner) {
//         return "Owner not found";
//       }
//       return owner;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   updateOwner = async (id, data) => {
//     try {
//       const owner = await Owner.findOne({
//         where: Sequelize.literal(`BINARY OwnerID = '${id}'`),
//       });
//       if (owner) {
//         const updatedOwnerCount = await Owner.update(
//           { ...data },
//           { where: { OwnerID: id } }
//         );
//         if (updatedOwnerCount) {
//           const updatedOwner = await Owner.findByPk(id);
//           return updatedOwner;
//         }
//       } else {
//         return "owner not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   deleteOwner = async (id) => {
//     try {
//       const owner = await Owner.findOne({
//         where: Sequelize.literal(`BINARY OwnerID = '${id}'`),
//       });
//       if (owner) {
//         const owner = await Owner.destroy({ where: { OwnerID: id } });
//         return owner;
//       } else {
//         return "owner not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };
// }

// module.exports = new OwnerServices();
