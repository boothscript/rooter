const express = require("express");

const routesRepo = require("../Repos/routes");
const indexTemplate = require("../views/routes/index");

const router = express.Router();

router.post("/routes/add", async (req, res) => {
  await routesRepo.create({
    name: req.body.routeName,
    sites: req.body.siteList,
    date: new Date()
  });
  res.send("done");
});

router.get("/routes", async (req, res) => {
  const routes = await routesRepo.getAll();
  res.send(indexTemplate({ routes }));
});

module.exports = router;
