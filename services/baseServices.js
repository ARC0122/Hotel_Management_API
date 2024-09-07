//base services

const { Sequelize } = require("../models/index");
const { pagination, sorting, Search } = require("../utils/helper");

class BaseServices {
  constructor(Model, PrimaryKey, fields) {
    this.Model = Model;
    this.PrimaryKey = PrimaryKey;
    this.fields = fields;
  }
  createEntry = async (data) => {
    const entry = {};

    this.fields.forEach((field) => {
      if (data[field]) {
        entry[field] = data[field];
      }
    });
    console.log(entry);
    try {
      const newEntry = await this.Model.create(entry);
      return newEntry;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  getAllEntry = async (query) => {
    try {
      const { page, pageSize, sortedBy, sortOrder } = { ...query };

      //pagination
      const { offset, limit } = pagination(page, pageSize);

      //sorting
      const order = sorting(sortedBy, sortOrder);

      //search
      const searchFields = this.fields;
      const where = {
        ...Search(query, searchFields),
      };
      // console.log("where", where);
      const entries = await this.Model.findAll({
        offset: offset,
        limit: limit,
        order: order,
        where: where,
      });

      return entries;
    } catch (err) {
      throw new Error(`ErrorService: ${err.message}`);
    }
  };

  getEntryByID = async (id) => {
    try {
      const entry = await this.Model.findOne({
        where: Sequelize.literal(`BINARY ${this.PrimaryKey} = '${id}'`),
      });
      if (!entry) {
        return `${this.Model.name} not found`;
      }
      return entry;
    } catch (err) {
      throw new Error(`ErrorService: ${err.message}`);
    }
  };

  updateEntry = async (id, data) => {
    try {
      const entry = await this.Model.findOne({
        where: Sequelize.literal(`BINARY ${this.PrimaryKey} = '${id}'`),
      });
      if (entry) {
        const updatedEntryCount = await this.Model.update(
          { ...data },
          { where: { [this.PrimaryKey]: id } }
        );
        if (updatedEntryCount) {
          const updatedEntry = await this.Model.findOne({
            where: Sequelize.literal(`BINARY ${this.PrimaryKey} = '${id}'`),
          });
          return updatedEntry;
        }
      } else {
        return `${this.Model.name} not found`;
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };

  deleteEntry = async (id) => {
    try {
      const entry = await this.Model.findOne({
        where: Sequelize.literal(`BINARY ${this.PrimaryKey} = '${id}'`),
      });
      if (entry) {
        const entry = await this.Model.destroy({
          where: { [this.PrimaryKey]: id },
        });
        return entry;
      } else {
        return `${this.Model.name} not found`;
      }
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  };
}

module.exports = BaseServices;
