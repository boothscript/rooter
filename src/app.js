const express = require("express");
const bodyParser = require("body-parser");
const sitesRouter = require("./routes/sites");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(sitesRouter);

app.listen(3000, () => {
  console.log("listening");
});
