// roomEmployee services

const { RoomEmployee } = require("../models/index");
const BaseServices = require("./baseServices");

const RoomEmployeeServices = new BaseServices(RoomEmployee, "RoomEmployeeID", [
  "EmployeeID",
  "RoomID",
]);
module.exports = RoomEmployeeServices;

// class RoomEmployeeServices {
//   getAllRoomEmployee = async (query) => {
//     try {
//       const { page, pageSize, sortedBy, sortOrder } = { ...query };

//       //pagination
//       const { offset, limit } = pagination(page, pageSize);

//       //sorting
//       const order = sorting(sortedBy, sortOrder);

//       //search
//       const searchFields = ["EmployeeID", "RoomID"];
//       const where = {
//         ...Search(query, searchFields),
//       };

//       const roomEmployees = await RoomEmployee.findAll({
//         offset: offset,
//         limit: limit,
//         order: order,
//         where: where,
//       });
//       return roomEmployees;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   createRoomEmployee = async (data) => {
//     const { EmployeeID, RoomID } = data;
//     const roomEmployee = {
//       EmployeeID,
//       RoomID,
//     };
//     try {
//       const newRoomEmployee = await RoomEmployee.create(roomEmployee);
//       return newRoomEmployee;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   getRoomEmployeeByID = async (id) => {
//     try {
//       const roomEmployee = await RoomEmployee.findOne({
//         where: Sequelize.literal(`BINARY RoomEmployeeID = '${id}'`),
//       });
//       if (!roomEmployee) {
//         return "roomEmployee not found";
//       }
//       return roomEmployee;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   updateRoomEmployee = async (id, data) => {
//     try {
//       const roomEmployee = await RoomEmployee.findOne({
//         where: Sequelize.literal(`BINARY RoomEmployeeID = '${id}'`),
//       });
//       if (roomEmployee) {
//         const updatedRoomEmployeeCount = await RoomEmployee.update(
//           { ...data },
//           { where: { RoomEmployeeID: id } }
//         );
//         if (updatedRoomEmployeeCount) {
//           const updatedRoomEmployee = await RoomEmployee.findByPk(id);
//           return updatedRoomEmployee;
//         }
//       } else {
//         return "roomEmployee not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   deleteRoomEmployee = async (id) => {
//     try {
//       const roomEmployee = await RoomEmployee.findOne({
//         where: Sequelize.literal(`BINARY RoomEmployeeID = '${id}'`),
//       });
//       if (roomEmployee) {
//         const roomEmployee = await RoomEmployee.destroy({
//           where: { RoomEmployeeID: id },
//         });
//         return roomEmployee;
//       } else {
//         return "roomEmployee not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };
// }

// module.exports = new RoomEmployeeServices();
