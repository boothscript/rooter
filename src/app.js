const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const sitesRouter = require("./routes/sites");
const routesRouter = require("./routes/routes");
const authRoutes = require("./routes/login");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({ keys: ["fhdkjsfhskj"] }));
app.use(sitesRouter);
app.use(routesRouter);
app.use(authRoutes);

app.listen(3000, () => {
  console.log("listening");
});
