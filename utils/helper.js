const { Op } = require("sequelize");

const pagination = (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize, 10);

  return { offset, limit, page };
};

function sorting(sortedBy = "createdAt", sortOrder = "ASC") {
  if (
    typeof sortedBy !== "string" ||
    !["ASC", "DESC"].includes(sortOrder.toUpperCase())
  ) {
    throw new Error("Invalid sorting criteria");
  }

  return [[sortedBy, sortOrder.toUpperCase()]];
}

function Search(query, searchFields) {
  const { search = "" } = query;

  if (!search) {
    const search = { ...query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete search[el]);

    return search;
  }

  const whereConditions = searchFields.map((field) => {
    const condition = { [field]: { [Op.like]: `%${search}%` } };

    return condition;
  });

  return {
    [Op.or]: whereConditions,
  };
}

module.exports = { pagination, sorting, Search };
