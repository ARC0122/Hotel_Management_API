// hotel services

const { Hotel } = require("../models/index");
const BaseServices = require("./baseServices");

const HotelServices = new BaseServices(Hotel, "HotelID", [
  "hotelName",
  "city",
  "OwnerID",
]);

module.exports = HotelServices;

// class HotelServices {
//   getAllHotel = async (query) => {
//     try {
//       const { page, pageSize, sortedBy, sortOrder } = { ...query };

//       //pagination
//       const { offset, limit } = pagination(page, pageSize);

//       //sorting
//       const order = sorting(sortedBy, sortOrder);

//       //search
//       const searchFields = ["hotelName", "city", "OwnerID"];
//       const where = {
//         ...Search(query, searchFields),
//       };

//       const hotels = await Hotel.findAll({
//         offset: offset,
//         limit: limit,
//         order: order,
//         where: where,
//       });
//       return hotels;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   createHotel = async (data) => {
//     const { hotelName, city, OwnerID } = data;
//     const hotel = {
//       hotelName,
//       city,
//       OwnerID,
//     };
//     try {
//       const newHotel = await Hotel.create(hotel);
//       return newHotel;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   getHotelByID = async (id) => {
//     try {
//       const hotel = await Hotel.findOne({
//         where: Sequelize.literal(`BINARY HotelID = '${id}'`),
//       });
//       if (!hotel) {
//         return "Hotel not found";
//       }
//       return hotel;
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   updateHotel = async (id, data) => {
//     try {
//       const hotel = await Hotel.findOne({
//         where: Sequelize.literal(`BINARY HotelID = '${id}'`),
//       });
//       if (hotel) {
//         const updatedHotelCount = await Hotel.update(
//           { ...data },
//           { where: { HotelID: id } }
//         );
//         if (updatedHotelCount) {
//           const updatedHotel = await Hotel.findByPk(id);
//           return updatedHotel;
//         }
//       } else {
//         return "hotel not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };

//   deleteHotel = async (id) => {
//     try {
//       const hotel = await Hotel.findOne({
//         where: Sequelize.literal(`BINARY HotelID = '${id}'`),
//       });
//       if (hotel) {
//         const hotel = await Hotel.destroy({ where: { HotelID: id } });
//         return hotel;
//       } else {
//         return "hotel not found";
//       }
//     } catch (err) {
//       throw new Error(`Error: ${err.message}`);
//     }
//   };
// }

// module.exports = new HotelServices();
