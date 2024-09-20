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

    try {
      const newEntry = await this.Model.create(entry);
      return newEntry;
    } catch (err) {
      throw new Error(` ${err.message}`);
    }
  };

  getAllEntry = async (query) => {
    try {
      const { pageNo, pageSize, sortedBy, sortOrder } = { ...query };

      //pagination
      const { offset, limit, page } = pagination(pageNo, pageSize);

      //sorting
      const order = sorting(sortedBy, sortOrder);

      //search
      const searchFields = this.fields;
      const where = {
        ...Search(query, searchFields),
      };

      const { rows: entries, count } = await this.Model.findAndCountAll({
        offset: offset,
        limit: limit,
        order: order,
        where: where,
      });

      return { length: count, pageNo: page, limit, entries };
    } catch (err) {
      throw new Error(`${err.message}`);
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
      throw new Error(`${err.message}`);
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
      throw new Error(`${err.message}`);
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
      throw new Error(` ${err.message}`);
    }
  };
}

module.exports = BaseServices;
