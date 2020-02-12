class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const error = (err, res) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  const { statusCode, message } = err;
  console.log("ERROR Message: ", err.message);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};
module.exports = {
  ErrorHandler,
  error
};
