// facility services

// const { DataTypes } = require("sequelize");
// const sequelize = require("../models/index").sequelize;
// const Facility = require("../models/facilityModel")(sequelize, DataTypes);
const { Facility, Sequelize } = require("../models/index");
const { pagination, sorting } = require("../utils/helper");

class FacilityServices {
  getAllFacility = async (query) => {
    try {
      console.log(query);
      const { page, pageSize, sortedBy, sortOrder } = { ...query };

      //pagination
      const { offset, limit } = pagination(page, pageSize);

      //sorting
      const order = sorting(sortedBy, sortOrder);

      const facilities = await Facility.findAll({
        offset: offset,
        limit: limit,
        order: order,
      });
      return facilities;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  createFacility = async (data) => {
    const { Name, Description, Price } = data;
    const facility = {
      Name,
      Description,
      Price,
    };
    try {
      const newFacility = await Facility.create(facility);
      return newFacility;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getFacilityByID = async (id) => {
    try {
      const facility = await Facility.findOne({
        where: Sequelize.literal(`BINARY FacilityID = '${id}'`),
      });
      if (!facility) {
        return "facility not found";
      }
      return facility;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  updateFacility = async (id, data) => {
    try {
      const facility = await Facility.findOne({
        where: Sequelize.literal(`BINARY FacilityID = '${id}'`),
      });
      if (facility) {
        const updatedFacilityCount = await Facility.update(
          { ...data },
          { where: { FacilityID: id } }
        );
        if (updatedFacilityCount) {
          const updatedFacility = await Facility.findByPk(id);
          return updatedFacility;
        }
      } else {
        return "facility not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteFacility = async (id) => {
    try {
      const facility = await Facility.findByPk(id);
      if (facility) {
        const facility = await Facility.destroy({ where: { FacilityID: id } });
        return facility;
      } else {
        return "facility not found";
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = new FacilityServices();
