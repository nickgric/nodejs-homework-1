const asyncHandler = async (func) => {
  try {
    return await func;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = asyncHandler;
