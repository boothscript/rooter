const express = require("express");

const sitesRouter = require("./routes/sites");

const app = express();

app.use(sitesRouter);

app.listen(3000, () => {
  console.log("listening");
});
