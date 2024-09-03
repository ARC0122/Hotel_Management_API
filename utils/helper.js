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

module.exports = { pagination, sorting };
