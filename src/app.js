require("module-alias/register");
const app = require("express")();
const { areaCode } = require("./helperFuncs");
const { getFestList } = require("./festMicros");

app.get("/fest", async (req, res, next) => {
  try {
    var { city, page } = req.query;
    var code = areaCode(city);

    if (!code) {
      throw new ErrorHandler(404, "ERROR: Request Area is not found");
    }

    var getList = await getFestList(code, page);

    if (!getList) {
      throw new ErrorHandler(404, "ERROR: List is empty");
    }
    res.status(200).send(getList);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
