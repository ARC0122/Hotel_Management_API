//user services

const { User } = require("../models/index");
const BaseServices = require("./baseServices");

const UserServices = new BaseServices(User, "UserID", [
  "FName",
  "LName",
  "Email",
  "Mobile",
  "Gender",
]);

module.exports = UserServices;
// class UserServices {
//   createUser = async (data) => {
//     console.log(User);
//     const { FName, LName, Email, Mobile, Gender } = data;
//     const user = {
//       FName,
//       LName,
//       Email,
//       Mobile,
//       Gender,
//     };
//     try {
//       const newUser = await User.create(user);
//       return newUser;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   getAllUser = async (query) => {
//     try {
//       const { page, pageSize, sortedBy, sortOrder } = { ...query };

//       //pagination
//       const { offset, limit } = pagination(page, pageSize);

//       //sorting
//       const order = sorting(sortedBy, sortOrder);

//       //search
//       const searchFields = ["FName", "LName", "Email", "Mobile", "Gender"];
//       const where = {
//         ...Search(query, searchFields),
//       };
//       // console.log("where", where);
//       const users = await User.findAll({
//         offset: offset,
//         limit: limit,
//         order: order,
//         where: where,
//       });

//       return users;
//     } catch (err) {
//       throw new Error(`ErrorService: ${err.message}`);
//     }
//   };

//   getUserByID = async (id) => {
//     try {
//       const user = await User.findOne({
//         where: Sequelize.literal(`BINARY UserID = '${id}'`),
//       });
//       if (!user) {
//         return "User not found";
//       }
//       return user;
//     } catch (err) {
//       throw new Error(`ErrorService: ${err.message}`);
//     }
//   };

//   updateUser = async (id, data) => {
//     try {
//       const user = await User.findOne({
//         where: Sequelize.literal(`BINARY UserID = '${id}'`), // Simulates findByPk with strict comparison
//       });
//       if (user) {
//         const updatedUserCount = await User.update(
//           { ...data },
//           { where: { UserID: id } }
//         );
//         if (updatedUserCount) {
//           const updatedUser = await User.findByPk(id);
//           return updatedUser;
//         }
//       } else {
//         return "user not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   deleteUser = async (id) => {
//     try {
//       const user = await User.findOne({
//         where: Sequelize.literal(`BINARY UserID = '${id}'`), // Simulates findByPk with strict comparison
//       });
//       if (user) {
//         const user = await User.destroy({ where: { UserID: id } });
//         return user;
//       } else {
//         return "user not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };
// }

// module.exports = new UserServices();
