const { Op } = require("sequelize");

const pagination = (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize, 10);

  return { offset, limit };
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
    return {};
  }

  const whereConditions = searchFields.map((field) => {
    const condition = { [field]: { [Op.like]: `%${search}%` } };

    // Log the field and condition for debugging
    console.log(`${field} ${JSON.stringify(condition[field])}`);

    return condition;
  });

  return {
    [Op.or]: whereConditions,
  };
}

module.exports = { pagination, sorting, Search };
