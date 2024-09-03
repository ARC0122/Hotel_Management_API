const getPaginationOptions = (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize, 10);

  return { offset, limit };
};

module.exports = { getPaginationOptions };
