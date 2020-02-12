require("dotenv").config();
const app = require("./src/app");
const { error, ErrorHandler } = require("./src/errorHandler");
const port = 3004;

global.ErrorHandler = ErrorHandler;

global.basePath = __dirname;

app.use((req, res) => {
  throw new ErrorHandler(404, "API NOT FOUND");
});

app.use((err, req, res, next) => {
  error(err, res);
});

// start the server
app.listen(port, () => {
  console.log(`Server Running at http://127.0.0.1:${port}`);
});
module.exports = app;
